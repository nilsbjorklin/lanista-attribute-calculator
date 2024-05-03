import * as React from 'react';
import DropdownButton from './components/dropdownButton';
import Race from '../data/race.json';

const autoSelectRaceText = 'Välj ras och Fyll i värden';
const autoFillText = 'Fyll i värden';
const clearFormText = 'Rensa';

export default function Races({
    desktop,
    race,
    requirements,
    setRace,
    setAttributes,
    modifiers }) {

    let raceSelections = [];
    Object.keys(Race).forEach((id) => {
        raceSelections.push({
            name: Race[id],
            id: id,
            action: () => race.set(id)
        })
    })

    let raceButtons = <span className='raceButtons'>
        <DropdownButton buttonId='raceSelector' buttonText={Race[race]} items={raceSelections} changeToSelected={true} />
        {renderRaceOptions()}
    </span>

    function renderRaceOptions() {
        if (desktop) {
            return [
                <button key='auto-select-race' className='dropbtn' onClick={() => autoSelectRace()}>{autoSelectRaceText}</button>,
                <button key='auto-fill' className='dropbtn' onClick={() => autoFill()}>{autoFillText}</button>,
                <button key='clear-form' className='dropbtn' onClick={() => clearForm()}>{clearFormText}</button>
            ];
        }
        let raceOptions = [
            {
                name: 'Välj ras och Fyll i värden',
                id: 'auto-select-race',
                action: () => autoSelectRace()
            }, {
                name: 'Fyll i värden',
                id: 'auto-fill',
                action: () => autoFill()
            }, {
                name: 'Rensa värden',
                id: 'clear-form',
                action: () => clearForm()
            }
        ];
        return <DropdownButton buttonId='raceOptions' buttonText='Alternativ' items={raceOptions} />;
    }

    function autoSelectRace() {
        //TODO
    }

    function autoFill() {
        //TODO
    }

    function clearForm() {
        //TODO
    }

    return raceButtons;
}