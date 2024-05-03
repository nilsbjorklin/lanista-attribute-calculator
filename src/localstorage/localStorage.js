import { uniqueId } from "../supportFunctions";

const fieldNames = [
    'race',
    'usedAttributes',
    'attributes',
    'requirements',
    'equipment'
];

export function getActiveProfile() {
    let result = localStorage.getItem('activeProfile')
    if (result) {
        console.log(result);
        return result
    } else {
        console.log(hammareTroll['activeProfile']);
        return hammareTroll['activeProfile'];
    }
}

export function putActiveProfile(profileId) {
    localStorage.setItem('activeProfile', profileId);

} export function getProfileList() {
    let result = localStorage.getItem('profileList')
    if (result) {
        return JSON.parse(result)
    } else {
        return hammareTroll['profileList'];
    }
}

export function putProfileList(profileList) {
    console.log(profileList);
    localStorage.setItem('profileList', JSON.stringify(profileList));
}

export function cloneProfile(name) {
    let profileId = getActiveProfile();
    let newProfileId = uniqueId();
    fieldNames.forEach(fieldName => {
        storageSet(newProfileId, fieldName, storageGet(profileId, fieldName))
    })
    let profileList = getProfileList();
    profileList[newProfileId] = name;
    putProfileList(profileList);
    return newProfileId;
}

export function removeProfile(){
    let activeProfileId = getActiveProfile();
    fieldNames.forEach(fieldName => {
        localStorage.removeItem(getKey(activeProfileId, fieldName))
    })
    let oldProfileList = getProfileList();
    let newProfileList = {};
    Object.keys(oldProfileList)
    .filter(profileId => profileId !== activeProfileId)
    .forEach(profileId => newProfileList[profileId] = oldProfileList[profileId]);
    putProfileList(newProfileList);
    return Object.keys(newProfileList)[0];
}

function fieldIsAllowed(fieldName) {
    if (!fieldNames.includes(fieldName)) {
        throw new Error(`'${fieldName}' is not a valid field to fetch from storage!`);
    }
}

export function storageGet(activeProfileId, fieldName) {
    let result = localStorage.getItem(getKey(activeProfileId, fieldName))
    if (result) {
        return JSON.parse(result)
    } else {
        return hammareTroll[fieldName];
    }
}

export function storageSet(activeProfileId, fieldName, value) {
    localStorage.setItem(getKey(activeProfileId, fieldName), JSON.stringify(value));
}

export function storageDelete(activeProfileId, fieldName) {
    localStorage.removeItem(getKey(activeProfileId, fieldName));
}

function getKey(activeProfileId, fieldName) {
    fieldIsAllowed(fieldName);
    return activeProfileId + '-' + fieldName;
}
let standardId = uniqueId();

const defaultValues = {
    activeProfile: standardId,
    profileList: {[standardId]: 'Standard'},
    race: 'human',
    usedAttributes: [],
    attributes: {},
    requirements: {},
    equipment: {}
}

let hammareTrollId = uniqueId();

const hammareTroll = {
    activeProfile: hammareTrollId,
    profileList: {
        [hammareTrollId]: 'Hammare Troll',
        [standardId]: 'Standard'
    },
    race: 'troll',
    usedAttributes: ['maces'],
    attributes: {
        strength: [54, 3, 3, 3],
        endurance: [38, 2, 2, 2],
        maces: [48, 6, 6, 6],
        health: [10, 9, 9, 9],
    },
    requirements: {
        1: {
            endurance: 30,
            maces: 40
        },
    },
    equipment: {
        1: {
            weapon: {
                mainhand: {
                    name: 'Spikklubba',
                    type: 'Hammare',
                    minDamage: 4,
                    maxDamage: 6,
                    wield: 'Enhand',
                    breakingPoint: 27,
                    enchant: ['Opal', 'Onyx', 'Safir', 'Prismatisk'],
                    maxEnchant: 1,
                    requirements: { minLevel: 1, maxLevel: 19, strength: 40, maces: 25, race: ['Människa', 'Alv', 'Dvärg', 'Ork', 'Troll', 'Goblin'] },
                    bonus: {}
                },
                mainhandEnchant: null,
                offhand: {
                    name: 'Spikklubba',
                    type: 'Hammare',
                    minDamage: 4,
                    maxDamage: 6,
                    wield: 'Enhand',
                    breakingPoint: 27,
                    enchant: ['Opal', 'Onyx', 'Safir', 'Prismatisk'],
                    maxEnchant: 1,
                    requirements: { minLevel: 1, maxLevel: 19, strength: 40, maces: 25, race: ['Människa', 'Alv', 'Dvärg', 'Ork', 'Troll', 'Goblin'] },
                    bonus: {}
                },
                offhandEnchant: null,
                distance: {
                    name: 'Liten Sten',
                    type: 'Distans',
                    minDamage: 1,
                    maxDamage: 1,
                    wield: 'Distans',
                    enchant: ['Distans', 'Prismatisk'],
                    maxEnchant: 1,
                    requirements: { minLevel: 1, maxLevel: 45, race: ['Människa', 'Alv', 'Dvärg', 'Ork', 'Troll', 'Goblin'] },
                    bonus: {}
                },
                distanceEnchant: null
            },
            armor: { head: null, shoulders: null, chest: null, hands: null, legs: null, feet: null },
            accessories: { mantel: null, necklace: null, ring: null, amulet: null, braclet: null, ornament: null }
        }
    }
}