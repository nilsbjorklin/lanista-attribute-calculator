export default function Attribute({ desktop,
    index,
    statValues,
    usedStats,
    attributes,
    setAttributes }) {

    let level = index + 1;

    function updateAttribute(stat, index, value) {
        console.log('updateAttribute');
        let maxValue = index === 0 ? 150 : 20;
        value = Math.min(maxValue, value);
        if(!attributes[stat]){
            attributes[stat] = Array(45).fill(0);
        }
        attributes[stat][index] = value;
        setAttributes(structuredClone(attributes));
    }

    let pointsSpent = usedStats.map(stat => attributes?.[stat]?.[index] ?? 0).reduce((a, b) => a + b, 0);

    function AttributeRow({ children }) {
        return (
            <div key={`attributes-${level}`} className='row'>
                {children}
            </div>
        );
    }

    function AttributeLabel() {
        let pointsLeft = (index === 0 ? 150 : 20) - pointsSpent;
        let classes = 'content-data-point' + (pointsLeft < 0 ? ' negative' : (pointsLeft > 0 ? ' positive' : ''));
        return <div key={`attribute-label-${index + 1}`} className={classes}>{pointsLeft}</div>
    }

    function AttributeValue({ stat }) {
        return (
            <div key={`attribute-${level}-${stat}`} className='content-data-point'>
                <input
                    className='content-data-point-input'
                    type='number'
                    defaultValue={attributes?.[stat]?.[index] ?? 0}
                    onChange={e => updateAttribute(stat, index, e.target.value)} />
            </div>
        );
    }

    function StatsRow({ children }) {
        return (
            <div key={`stats-${level}`} className='row'>
                {children}
            </div>
        );
    }

    function StatsLabel() {
        return <div key={`level-label-${level}`} className='content-data-result'>{`Grad ${level}`}</div>;
    }

    function StatsValue({ stat }) {
        return (
            <div key={`stat-${level}-${stat}`} className='content-data-result'>
                {statValues[stat]}
            </div>)
    }

    return ([
        <AttributeRow key={'attribute-row-' + index}>
            {desktop && <AttributeLabel />}
            {usedStats.map(stat => <AttributeValue stat={stat} />)}
        </AttributeRow>,
        <StatsRow key={'stats-row-' + index}>
            {desktop && <StatsLabel />}
            {usedStats.map(stat => <StatsValue stat={stat} />)}
        </StatsRow>
    ])
}