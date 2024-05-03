import React, { useEffect, useMemo, useState } from 'react';
import DropdownButton from './components/dropdownButton';
import SelectNameModal from './components/selectNameModal';
import { uniqueId } from '../supportFunctions';
import { useTheme } from '../localstorage/ActiveProfileContext.js';
import { cloneProfile, getProfileList, putProfileList, removeProfile } from '../localstorage/localStorage.js';

const addProfileText = 'Lägg till ny profil';
const renameProfileText = 'Byt namn på profil';
const cloneProfileText = 'Skapa kopia av profil';
const deleteProfileText = 'Radera profil';

export default function Profiles({ desktop }) {
    const { activeProfileId, setActiveProfileId } = useTheme();

    console.log('Render Profiles');
    const [modal, setModal] = useState(true);
    const [action, setAction] = useState('');
    const [modalType, setModalType] = useState('');

    console.log('------------------------------------');
    console.log(activeProfileId);
    console.log(getProfileList());
    console.log(getProfileList()[activeProfileId]);
    console.log('------------------------------------');
    const [profileList, setProfileList] = useState(getProfileList());

    useMemo(() => {
        console.log('[activeProfileId]');
        return activeProfileId;
    }, [activeProfileId])

    useMemo(() => {
        console.log('[profileList]');
        console.log(profileList);
        putProfileList(profileList)
        return profileList;
    }, [profileList])

    function addProfile(name) {
        console.log('addProfile');
        const id = uniqueId();
        profileList[id] = name;
        setProfileList(profileList);
        setActiveProfileId(id);
    }

    function renameCurrentProfile(name) {
        console.log('renameCurrentProfile');
        setProfileList((prev)=> {
            prev[activeProfileId] = name;
            console.log(prev);
            return structuredClone(prev);
        })
    }
    

    function cloneCurrentProfile(name){
        console.log('cloneCurrentProfile');
        setActiveProfileId(cloneProfile(name));
        setProfileList(getProfileList());
    }

    function deleteCurrentProfile() {
        if (window.confirm(`Är du säker att du vill ta bort profilen '${profileList[activeProfileId]}'?`)) {
            setActiveProfileId(removeProfile());
            setProfileList(getProfileList());
        }
    }

    const nameRef = React.useRef(null);
    
    let profileButtons = (
        <span className='profileButtons'>
            <SelectNameModal
                openModal={modal}
                closeModal={() => {
                    setModalType('');
                    setModal(false);
                }}
                nameRef={nameRef}
                setAction={setAction}
                modalType={modalType}
                validateName={validateName}
            />
            <DropdownButton
            buttonId='profileSelector'
            buttonText={profileList[activeProfileId]}
            items={
                Object.keys(profileList)
                .map((profileId)=> {return { id: profileId, name: profileList[profileId], action: () => setActiveProfileId(profileId) }})
            }
            changeToSelected={true} />
            {renderProfileOptions()}
        </span>
    );

    function validateName(value) {
        let validationResults = [];
        if (value.length < 3) {
            validationResults.push('Profilnamn måste vara minst 3 tecken')
        }
        if (value.length > 20) {
            validationResults.push('Profilnamn får max ha 20 tecken')
        }
        if (Object.keys(profileList).map(profileId => profileList[profileId]).includes(value)) {
            validationResults.push('Profil existerar redan')
        }
        if (value.length !== 0 && !value.match(/^([A-Za-z0-9 -])+$/)) {
            validationResults.push('Endast bokstäver, siffror, mellanslag och -')
        }
        return validationResults;
    }

    useEffect(() => setModal(Boolean(modalType) && !modal), [modalType]);

    useEffect(() => {
        switch (action) {
            case 'add':
                addProfile(nameRef.current.value);
                break;
            case 'rename':
                renameCurrentProfile(nameRef.current.value);
                break;
            case 'clone':
                cloneCurrentProfile(nameRef.current.value)
                break;
        }
    }, [action]);

    function renderProfileOptions() {
        if (desktop) {
            return [
                <button key='add' className='dropbtn' onClick={() => setModalType('add')}>{addProfileText}</button>,
                <button key='rename' className='dropbtn' onClick={() => setModalType('rename')}>{renameProfileText}</button>,
                <button key='clone' className='dropbtn' onClick={() => setModalType('clone')}>{cloneProfileText}</button>,
                <button key='delete' className='dropbtn' onClick={() => deleteCurrentProfile()}>{deleteProfileText}</button>
            ];
        }
        let profileOptions = [
            {
                name: addProfileText,
                id: 'add-profile',
                action: () => setModalType('add')
            }, {
                name: renameProfileText,
                id: 'rename-profile',
                action: () => setModalType('rename')
            }, {
                name: cloneProfileText,
                id: 'clone-profile',
                action: () => setModalType('clone')
            }, {
                name: deleteProfileText,
                id: 'delete-profile',
                action: () => deleteCurrentProfile()
            }
        ];

        return <DropdownButton buttonId='profilesOptions' buttonText='Profiler' items={profileOptions} />;

    }

    return profileButtons;
}
