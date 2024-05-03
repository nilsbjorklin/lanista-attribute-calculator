import React, { useMemo, useState } from 'react';
import Header from './header/header.js';
import Profiles from './header/profiles';
import Races from './header/races';
import Weapons from './header/weapons';
import Content from './content/content.js';
import ContentHeader from './content/contentHeader.js';
import ContentData from './content/contentData.js';
import './container.css';
import { storageGet } from './localstorage/localStorage.js';
import { useTheme } from './localstorage/ActiveProfileContext.js';
import RaceData from './data/races.json'

const baseStats = ['health', 'strength', 'endurance', 'initiative', 'dodge'];

export default function Container({ desktop }) {
    console.log('Render Container');
    const { activeProfileId, setActiveProfileId } = useTheme();

    const [usedAttributes, setUsedAttributes] = useState(storageGet(activeProfileId, 'usedAttributes'));
    const [usedStats, setUsedStats] = useState('');

    const [attributes, setAttributes] = useState(storageGet(activeProfileId, 'attributes'));
    const [stats, setStats] = useState('');

    const [requirements, setRequirements] = useState(storageGet(activeProfileId, 'requirements'));

    const [equipment, setEquipment] = useState(storageGet(activeProfileId, 'equipment'));

    const [race, setRace] = useState(storageGet(activeProfileId, 'race'));
    const [modifiers, setModifiers] = useState('');

    useMemo(() => {
        console.log('[race]');
        let newModifier = {};
        Object.keys(RaceData[race].stats).forEach(stat => newModifier[stat] = RaceData[race].stats[stat]);
        setModifiers(newModifier);
        return race;
    }, [race])

    useMemo(() => {
        console.log('[usedAttributes]');
        console.log(baseStats.concat(usedAttributes.filter(attribute => attribute !== '2h')));
        setUsedStats(baseStats.concat(usedAttributes.filter(attribute => attribute !== '2h')))

        return usedAttributes;
    }, [usedAttributes])

    useMemo(() => {
        console.log('[usedStats]');
        console.log(usedStats);
        return usedStats;
    }, [usedStats])

    useMemo(() => {
        console.log('[attributes]');
        let newStats = {};
        Object.keys(attributes).map(stat => newStats[stat] = calculateStats(attributes[stat]));
        setStats(newStats);

        return attributes;
    }, [attributes])

    useMemo(() => {
        console.log('[requirements]');

        return requirements;
    }, [requirements])

    function calculateStats(attributesForStat) {
        let stats = [];
        let previousValue = 0;
        attributesForStat.map(value => {
            previousValue += value;
            stats.push(previousValue)
        })
        return stats;
    }

    return (
        <div className='container'>
            <Header key='header'>
                <Profiles
                    key='profiles'
                    desktop={desktop} />
                <Races
                    key='races'
                    desktop={desktop}
                    race={race}
                    requirements={requirements}
                    setRace={setRace}
                    setAttributes={setAttributes}
                    modifiers={modifiers} />
                <Weapons
                    key='weapons'
                    usedAttributes={usedAttributes}
                    setUsedAttributes={setUsedAttributes} />
            </Header>
            <Content key='content'>
                <ContentHeader
                    key='content-header'
                    desktop={desktop}
                    usedStats={usedStats}
                    modifiers={modifiers} />
                <ContentData
                    key='content-data'
                    desktop={desktop}
                    usedStats={usedStats}
                    modifiers={modifiers}
                    attributes={attributes}
                    stats={stats}
                    requirements={requirements}
                    equipment={equipment}
                    setAttributes={setAttributes}
                    setRequirements={setRequirements}
                />
            </Content>
        </div>
    );
}