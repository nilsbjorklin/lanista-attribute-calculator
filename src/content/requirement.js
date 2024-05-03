export default function Requirement({
    desktop,
    index,
    statValues,
    usedStats,
    requirements,
    equipment,
    setRequirements }) {

    const level = index + 1;

    const levelRequirements = {'manual':{}, 'equipment':{}};
    if (requirements[level] || equipment[level]) {
        console.log('equipment[level]');
        console.log(equipment[level]);
        usedStats.forEach(stat => {
            levelRequirements.manual[stat] = requirements[level][stat] ?? 0;
            levelRequirements.equipment[stat] = equipmentRequirements(equipment[level], stat);
        })
        console.log(levelRequirements);
    }

    function equipmentRequirements(equipment, stat) {
        let result = 0;
        Object.keys(equipment).forEach(category => {
            Object.keys(equipment[category]).forEach(itemName => {
                let statRequirement = equipment[category][itemName]?.requirements?.[stat] * ((stat === 'strength' && itemName === 'offhand') ? 2 : 1);
                statRequirement && (result = Math.max(statRequirement, result))
            })
        });
        return result;
    }

    function updateRequirement(level, stat, value) {
        console.log('updateRequirement');
        requirements[level][stat] = Number(value);
        setRequirements(structuredClone(requirements));
    }

    function ManualRow({ children }) {
        return (
            <div key={`manual-${level}`} className='row'>
                {children}
            </div>
        );
    }

    function ManualLabel() {
        return <div key={`manual-${level}-label`} className='content-data-target'>Krav</div>
    }

    function ManualValue({ stat }) {
        return (
            <div
                key={`manual-${level}-${stat}`}
                className={'content-data-target' + (levelRequirements.manual[stat] > statValues[stat] ? ' incomplete' : '')}>
                <input
                    className='content-data-target-input'
                    value={levelRequirements.manual[stat]}
                    onChange={e => updateRequirement(level, stat, e.target.value)} />
            </div>
        );
    }

    function EquipmentRow({ children }) {
        return (
            <div key={`equipment-${level}`} className='row'>
                {children}
            </div>
        );
    }

    function EquipmentLabel() {
        return <div key={`equipment-${level}-label`} className='content-data-target'>Utrustning</div>;
    }

    function EquipmentValue({ stat }) {
        return (
            <div key={`equipment-${level}-${stat}`} className={'content-data-target' + (levelRequirements.equipment[stat] > statValues[stat] ? ' incomplete' : '')}>
                {levelRequirements.equipment[stat]}
            </div>
        )
    }

    if (requirements[level]) {
        return ([
            <ManualRow key={'manual-row-' + index}>
                {desktop && <ManualLabel />}
                {usedStats.map(stat => <ManualValue stat={stat} />)}
            </ManualRow>,

            <EquipmentRow key={'equipment-row-' + index}>
                {desktop && <EquipmentLabel />}
                {usedStats.map(stat => <EquipmentValue stat={stat} />)}
            </EquipmentRow>
        ])
    } else {
        return null;
    }
}