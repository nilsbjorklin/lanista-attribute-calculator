import WeaponTypes from '../data/weaponTypes.json'

export default function Weapons({ usedAttributes, setUsedAttributes }) {
    console.log('Render Weapons');

    let weaponOptions = [];
    Object.keys(WeaponTypes).forEach(weapon => {
        weaponOptions.push(
            <button
                key={weapon}
                id={weapon}
                className={'dropbtn' + (usedAttributes.includes(weapon) ? ' selected' : '')}
                onClick={() => toggleWeaponType(weapon)}>
                {WeaponTypes[weapon]}
            </button>
        )
    })

    weaponOptions.push(
        <button
            key='2h'
            id='2h'
            className={'dropbtn' + (usedAttributes.includes('2h') ? ' selected' : '')}
            onClick={() => toggleWeaponType('2h')}>
            Tvåhand
        </button>
    )

    function toggleWeaponType(weaponType) {
        document.getElementById(weaponType).classList.toggle("selected");
        if (usedAttributes.includes(weaponType)) {
            setUsedAttributes([...usedAttributes.filter(e => e !== weaponType)]);
        } else {
            usedAttributes.push(weaponType);

            if (weaponType === '2h') {
                setUsedAttributes([...usedAttributes.filter(e => e !== 'shield')])
            } else if (weaponType === 'shield') {
                setUsedAttributes([...usedAttributes.filter(e => e !== '2h')])
            } else {
                setUsedAttributes([...usedAttributes]);
            }
        }
    }

    return (
        <span className='weaponButtons'>
            {weaponOptions}
        </span>
    );
}