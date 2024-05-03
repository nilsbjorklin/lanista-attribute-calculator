import Requirement from './requirement.js';
import Attribute from './attribute.js';

export default function ContentData({ desktop,
    usedStats,
    modifiers,
    attributes,
    stats,
    requirements,
    equipment,
    setAttributes,
    setRequirements }) {
    console.log('Render ContentData');

    let rows = [];
    console.log(usedStats);

    for (let index = 0; index < 45; index++) {
        let statValues = {};
        usedStats.forEach(stat => {
            statValues[stat] = ((stats?.[stat]?.[index] ?? 0) * modifiers[stat]).toFixed(1)
        });
        rows.push(
            <Attribute
                key={`attribute-${index}`}
                desktop={desktop}
                index={index}
                statValues={statValues}
                usedStats={usedStats}
                attributes={attributes}
                setAttributes={setAttributes} />,
            <Requirement
                key={`requirement-${index}`}
                desktop={desktop}
                index={index}
                statValues={statValues}
                usedStats={usedStats}
                requirements={requirements}
                equipment={equipment}
                setRequirements={setRequirements} />
        )
    }

    return <div className='content-data'>
        {rows}
    </div>

}