export function getProfilesstorageGet() {
    if (localStorage.getItem('profiles') === null) {
        localStorage.setItem('profiles', JSON.stringify(defaultProfile()));
    }
    return JSON.parse(localStorage.getItem('profiles'));
}

export function saveProfilesstorageSet(profiles) {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

export function defaultProfile() {
    return {
        'active': 'hammare-troll',
        'profiles': {
            'hammare-troll': {
                'name': 'Hammare Troll',
                'race': 'troll',
                'usedAttributes': ['maces'],
                'attributes': {
                    "strength": [54, 3, 3, 3],
                    "endurance": [38, 2, 2, 2],
                    "maces": [48, 6, 6, 6],
                    "health": [10, 9, 9, 9],
                },
                'requirements': {
                    1: {
                        "endurance": 30,
                        "maces": 40
                    }
                },
                "equipment": {
                    1: {
                        "weapon": {
                            "mainhand": {
                                "name": "Spikklubba",
                                "type": "Hammare",
                                "minDamage": 4,
                                "maxDamage": 6,
                                "wield": "Enhand",
                                "breakingPoint": 27,
                                "enchant": ["Opal", "Onyx", "Safir", "Prismatisk"],
                                "maxEnchant": 1,
                                "requirements": { "minLevel": 1, "maxLevel": 19, "strength": 40, "maces": 25, "race": ["Människa", "Alv", "Dvärg", "Ork", "Troll", "Goblin"] },
                                "bonus": {}
                            },
                            "mainhandEnchant": null,
                            "offhand": {
                                "name": "Spikklubba",
                                "type": "Hammare",
                                "minDamage": 4,
                                "maxDamage": 6,
                                "wield": "Enhand",
                                "breakingPoint": 27,
                                "enchant": ["Opal", "Onyx", "Safir", "Prismatisk"],
                                "maxEnchant": 1,
                                "requirements": { "minLevel": 1, "maxLevel": 19, "strength": 40, "maces": 25, "race": ["Människa", "Alv", "Dvärg", "Ork", "Troll", "Goblin"] },
                                "bonus": {}
                            },
                            "offhandEnchant": null,
                            "distance": {
                                "name": "Liten Sten", "type": "Distans", "minDamage": 1, "maxDamage": 1, "wield": "Distans",
                                "enchant": ["Distans", "Prismatisk"],
                                "maxEnchant": 1,
                                "requirements": { "minLevel": 1, "maxLevel": 45, "race": ["Människa", "Alv", "Dvärg", "Ork", "Troll", "Goblin"] },
                                "bonus": {}
                            },
                            "distanceEnchant": null
                        },
                        "armor": { "head": null, "shoulders": null, "chest": null, "hands": null, "legs": null, "feet": null },
                        "accessories": { "mantel": null, "necklace": null, "ring": null, "amulet": null, "braclet": null, "ornament": null }
                    }
                }
            },
            'standard2': {
                'name': 'Standard 2',
                'race': 'orc',
                'usedAttributes': ['spears'],
                'attributes': {
                    "strength": [35, 6, 6, 6],
                    "endurance": [35, 6, 6, 6],
                    "spears": [35, 6, 6, 6],
                    "health": [35, 2, 2, 2],
                    "initiative": [10, 2, 0, 0]
                },
                'requirements': {
                    1: {
                        "strength": 45,
                        "initiative": 10,
                        "endurance": 35,
                        "spears": 40
                    }
                },
                "equipment": {}
            }
        }
    }
}