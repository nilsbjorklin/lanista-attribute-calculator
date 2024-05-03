import Stats from '../data/stats.json';
import StatsShort from '../data/statsShort.json';

export default function ContentHeader({ desktop, usedStats, modifiers }) {
    console.log('Render ContentHeader');
    return (
        <div key='content-header' className='content-header'>
            <div key='attributes' className='row'>
                {desktop && <div key='attributes-label' className='content-header-field'><strong>Egenskaper</strong></div>}
                {usedStats.map(stat => <div key={'attributes-label-' + stat} className='content-header-field'>{desktop ? Stats[stat] : StatsShort[stat]}</div>)}
            </div>
            <div key='bonuses' className='row'>
                {desktop && <div key='bonus-label' className='content-header-field'><strong>Bonus</strong></div>}
                {usedStats.map((stat, index) => <div key={'bonus-label-' + index} className='content-header-field'>{Math.round(modifiers[stat] * 100)}%</div>)}
            </div>
        </div>
    );
}