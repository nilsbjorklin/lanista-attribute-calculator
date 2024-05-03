import React, { useEffect, useState } from 'react';
import Container from './container';

import { ActiveProfileContext } from './localstorage/ActiveProfileContext';

//const baseStats = ['health', 'strength', 'endurance', 'initiative', 'dodge'];

export default function ProfileHandler() {
    const [desktop, setDesktop] = useState(true);
    useEffect(() => {
        console.log('init');
        window.addEventListener('resize', () => setDesktop(window.innerWidth > 600));
    }, [])

    /*

    useEffect(() => {
        if (statsLoaded.current) {
            console.log('attributes.any');
            attributes.keys().forEach(stat => stats.setArray(stat, calculateStats(attributes.get(stat))));
        }
    }, [attributes.any])

    function calculateStats(attributesForStat) {
        let stats = [];
        let previousValue = 0;
        attributesForStat.map(value => {
            previousValue += value;
            stats.push(previousValue)
        })
        return stats;
    }

    useMemo(() => {
        if (statsLoaded.current) {
            console.log('race.value');
            let raceValue = race.value ?? 'human';
            let mod = {};
            Object.keys(RaceData[raceValue].stats).forEach(stat => mod[stat] = RaceData[raceValue].stats[stat]);
            modifiers.set(mod);
        }
        return race.value;
    }, [race.value])

    useMemo(() => {
        if (statsLoaded.current) {
            console.log('[usedAttributes.value]');
            const statsUsed = baseStats.concat(usedAttributes.value.filter(attribute => attribute !== '2h'));
            usedStats.set(statsUsed)


            let manualRequirement = {}
            Object.keys(requirements.value).forEach(level => manualRequirement[level] = requirements.value[level].manual)
            setRequirements(manualRequirement, equipment.value, statsUsed);
        }
        return usedAttributes.value;
    }, [usedAttributes.value])

    function setRequirements(req, equip, statsUsed) {
        let requirementLevels = [...new Set([...Object.keys(req), ...Object.keys(equip)])].map((value) => Number(value))
        requirementLevels.sort();
        let newRequirements = {};
        requirementLevels.forEach(level => newRequirements[level] = calculateRequirementsForLevel(req[level] ?? {}, equip[level] ?? {}, statsUsed));
        requirements.set(newRequirements);
    }

    useEffect(() => {
        if (statsLoaded.current) {
            console.log('[profiles.keys]');

            profileList.set([]);
            profiles.keys.forEach(key => profileList.add({ id: key, name: profiles.value[key].name }));
        }
    }, [profiles.keys])

    useEffect(() => {
        if (activeProfileId.value) {
            statsLoaded.current = false;
            console.log('Loading fields');
            profileList.set([]);
            profiles.keys.forEach(key => profileList.add({ id: key, name: profiles.value[key].name }));

            const currentProfile = profiles.value[activeProfileId.value];
            profileName.set(currentProfile.name);
            race.set(currentProfile.race);
            let mod = {};
            Object.keys(RaceData[currentProfile.race].stats).forEach(stat => mod[stat] = RaceData[currentProfile.race].stats[stat]);
            modifiers.set(mod);
            let attributesUsed = currentProfile.usedAttributes ?? [];
            usedAttributes.set(attributesUsed);

            let statsUsed = baseStats
                .concat(attributesUsed.filter(attribute => attribute !== '2h'));

            baseStats
                .concat(attributesUsed.filter(attribute => attribute !== '2h'))
                .forEach(stat => attributes.setArray(stat, mapPoints(currentProfile.attributes, stat)));

            setRequirements(currentProfile.requirements, currentProfile.equipment, statsUsed);

            let requirementLevels = [...new Set([...Object.keys(currentProfile.requirements), ...Object.keys(currentProfile.equipment)])].map((value) => Number(value))
            requirementLevels.sort();

            requirementLevels.forEach(level => requirements.add(level, calculateRequirementsForLevel(currentProfile.requirements[level] ?? {}, currentProfile.equipment[level] ?? {}, statsUsed)))
            equipment.set(currentProfile.equipment);
            //statsLoaded.current = true
        }

    }, [activeProfileId.value])

    function saveProfile() {
        let manualRequirements = {};
        Object.keys(requirements).forEach(level => {
            let levelRequirement = {};
            Object.keys(requirements[level].manual)
                .forEach(stat => requirements[level].manual[stat] !== 0 && (levelRequirement[stat] = requirements[level].manual[stat]))
            Object.keys(levelRequirement).length !== 0 && (manualRequirements[level] = levelRequirement);
        });

        let attributeObject = {};
        usedStats.value.forEach((stat, index) => {
            let counter = 0;
            const list = attributes[stat] ?? []
            attributes[index] && (attributes[index].slice().reverse().forEach(value => value === 0 && counter++))
            counter !== 0 && counter !== attributes[index].length && (attributeObject[stat] = attributes[index].slice(0, -counter));
        });

        console.log('save profile');
        console.log({
            name: profileName,
            race: race.value,
            usedAttributes: usedAttributes.value,
            attributes: attributeObject,
            requirements: manualRequirements,
            equipment: equipment.value
        });
    }

    function mapPoints(attributes, stat) {
        let points = Array(45).fill(0);
        ((attributes ?? {})[stat] ?? []).map((value, index) => points[index] = value)

        return points;
    }

    function calculateRequirementsForLevel(manualRequirement, equipment, statsUsed) {
        let result = {
            manual: {},
            equipment: {},
            total: {}
        };
        statsUsed.forEach(stat => {
            result.manual[stat] = manualRequirement[stat] ?? 0;
            result.equipment[stat] = equipmentRequirements(equipment ?? {}, stat);
            result.total[stat] = Math.max(result.manual[stat], result.equipment[stat])
        });
        return result;
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
    */

    /*
    console.log('--------------------ALL STATS--------------------');
    console.log(profiles.value);
    console.log(activeProfileId.value);
    console.log(currentProfile.value);
    console.log(profileList.value);
    console.log('-------------------------------------------------');
    */

    return (
        <ActiveProfileContext>
            <Container desktop={desktop}/>
        </ActiveProfileContext>
    )
    //<Container desktop={desktop} statsLoaded={statsLoaded.current} />
}