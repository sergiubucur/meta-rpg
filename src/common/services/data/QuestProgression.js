const QuestProgression = [
	[],
	[ // 11 - 20
		{
			stats: ["fireDamage", "frostDamage", "lightningDamage"],
			count: 1,
			multiplier: 1
		}
	],
	[ // 21 - 30
		{
			stats: ["fireDamage", "frostDamage", "lightningDamage"],
			count: 1,
			multiplier: 1
		},
		{
			stats: ["fireResist", "frostResist", "lightningResist"],
			count: 1,
			multiplier: 1
		}
	],
	[ // 31 - 40
		{
			stats: ["fireDamage", "frostDamage", "lightningDamage"],
			count: 2,
			multiplier: 2
		},
		{
			stats: ["fireResist", "frostResist", "lightningResist"],
			count: 1,
			multiplier: 2
		}
	],
	[ // 41 - 50
		{
			stats: ["fireDamage", "frostDamage", "lightningDamage"],
			count: 2,
			multiplier: 2
		},
		{
			stats: ["fireResist", "frostResist", "lightningResist"],
			count: 2,
			multiplier: 2
		}
	],
	[ // 51 - 60
		{
			stats: ["fireDamage", "frostDamage", "lightningDamage"],
			count: 2,
			multiplier: 2
		},
		{
			stats: ["fireResist", "frostResist", "lightningResist"],
			count: 3,
			multiplier: 2
		}
	]
];

export default QuestProgression;
