export const chartData = {
	"categories": [
		"2016",
		"2017",
		"2018",
		"2019",
		"2020",
		"2021"
	],
	"series": [{
			"name": "1级告警",
			"data": [
				35,
				8,
				25,
				37,
				4,
				20
			]
		},
		{
			"name": "2级告警",
			"data": [
				70,
				40,
				65,
				100,
				44,
				68
			]
		},
		{
			"name": "3级告警",
			"data": [
				100,
				80,
				95,
				150,
				112,
				132
			]
		}
	]
}
export const alarmData = [{
		create: "2021-12-30 13:54:22",
		eventDescription: "",
		eventName: "gggg5产品_00001",
		id: "61cd498e6d809a46b6302367",
		level: 1,
		processed: "2021-12-30 19:15:52",
		recordId: "61bc241b58209617390c65e4:61cd498e6d809a46b6302367:1640843662620",
		state: "FINISHED",
		transactor: "admin",
		alarmData:"自动触发规则执行，在2021-12-30 13:54:22 时产生告警。告警规则：gggg5产品_00001|[查看详情](https://iot.console.aliyun.com/le/alarm)"
	},
	{
		create: "2021-12-30 13:50:43",
		eventDescription: "123",
		eventName: "test123",
		id: "61cd48b36d809a46b6302366",
		level: 2,
		processed: "2022-01-08 15:43:36",
		recordId: "61ca99696d809a46b630210e:61cd48b36d809a46b6302366:1640843443022",
		state: "IGNORE",
		transactor: "admin"
	},
	{
		create: "2021-12-30 13:50:08",
		eventDescription: "123",
		eventName: "test123",
		id: "61cd489065e50820ed3a29d9",
		level: 3,
		processed: "2021-12-30 15:34:11",
		recordId: "61ca99696d809a46b630210e:61cd489065e50820ed3a29d9:1640843408948",
		state: "IGNORE",
		transactor: "admin"
	},
	{
		create: "2021-12-30 18:50:08",
		eventDescription: "123",
		eventName: "WEA123",
		id: "61cd489065e50820ed3a29d9",
		level: 1,
		processed: "2021-12-30 15:34:11",
		recordId: "61ca99696d809a46b630210e:61cd489065e50820ed3a29d9:1640843408948",
		state: "INIT",
		transactor: "admin"
	}
]
