// ***** 默认参数不可删除 ******
// ****** 筛选配置 ******
export const navList = [{
		title: '报修区域',
		children: [{
			title: '软件园'
		}, {
			title: '测试园'
		}]
	}, {
		title: '维修来源:',
		children: [{
			title: '网络'
		}, {
			title: '报警'
		}, {
			title: '保养'
		}, {
			title: '巡检'
		}]
	},
	{
		title: '报修部门:',
		children: [{
			title: '市场部门'
		}, {
			title: '测试部门'
		}, {
			title: '财务部门'
		}, {
			title: '运维部门'
		}, {
			title: '市场部门'
		}, ]
	}
];
export const maintainNav = [{
		title: '保养任务编码',
		type: 'input',
		prop: 'taskCode'
	}, {
		title: '保养计划编码',
		type: 'input',
		prop: 'planCode'
	},
	{
		title: '保养计划名称',
		type: 'input',
		prop: 'planName'
	},
	{
		title: '保养时间',
		type: 'date',
		startDate: {
			title: '开始时间',
			prop: 'beginDate',
		},
		endDate: {
			title: '结束时间',
			prop: 'endDate'
		}

	},
	{
		title: '任务类型:',
		prop: 'type',
		children: [{
			title: '自动创建',
			value: 0
		}, {
			title: '手动创建',
			value: 1
		}]
	}
];
export const repair = [{
		title: '维修单号',
		type: 'input',
		prop: 'scardCode'
	}, {
		title: '维修分类',
		prop: 'sclassId',
		children: [{
			title: '自动创建',
			prop: 'type',
			value: 0
		}, {
			title: '手动创建',
			prop: 'type',
			value: 1
		}]
	},
	{
		title: '紧急程度',
		prop: 'sclassEmergency',
		children: [{
			title: '一般',
			value: 0
		}, {
			title: '紧急',
			value: 1
		}]
	},
	{
		title: '维修来源',
		prop: 'scardOrigin',
		children: [{
				title: '网络',
				value: 0
			}, {
				title: '报警',
				value: 1
			},
			{
				title: '保养',
				value: 2
			}, {
				title: '巡检',
				value: 3
			}
		]
	},
	{
		title: '联系人',
		type: 'input',
		prop: 'repairContacts'
	},
	{
		title: '联系电话',
		type: 'input',
		prop: 'repairPhone'
	},
	{
		title: '报修时间',
		type: 'date',
		startDate: {
			title: '开始日期',
			prop: 'beginrepairDate',
		},
		endDate: {
			title: '结束日期',
			prop: 'endrepairDate'
		}
	},
	{
		title: '报修区域',
		type: 'tree',
		prop: 'areaId',
		children: []
	},
	{
		title: '报修部门',
		type: 'tree',
		prop: 'deptId',
		children: []
	}
];
export const inspection = [{
		title: '巡检任务编码',
		type: 'input',
		prop: 'taskCode'
	}, {
		title: '巡检计划编码',
		type: 'input',
		prop: 'planCode'
	},
	{
		title: '巡检计划名称',
		type: 'input',
		prop: 'planName'
	},
	{
		title: '巡检时间',
		type: 'date',
		startDate: {
			title: '开始时间',
			prop: 'beginDate',
		},
		endDate: {
			title: '结束时间',
			prop: 'endDate'
		}

	},
	{
		title: '任务类型:',
		children: [{
			title: '自动创建',
			prop: 'type',
			value: 0
		}, {
			title: '手动创建',
			prop: 'type',
			value: 1
		}]
	}
];
import {
	areaTree,deptTree
} from '/src/api/system.js'
areaTree().then(res => {
	repair.forEach(e => {
		if (e.prop == 'areaId') {
			e.children = res.data
		}
	})
})
deptTree().then(res=>{
	repair.forEach(e => {
		if (e.prop == 'deptId') {
			e.children = res.data
		}
	})
})
// userListall().then(
// 	res => {
// 		repair.forEach(e => {
// 			if (e.prop == 'userId') {
// 				res.rows.forEach(t => {
// 					e.children.push({
// 						label: t.userName,
// 						value: t.userId
// 					})
// 				})
// 			}
// 		})
// 		console.log(repair, 'adasda321321321')
// 	})
// 默认数据
export const orderList = {
	repair: [{
			areaId: 6,
			areaName: "软件园/A号楼/二层",
			createBy: "admin",
			createTime: "2022-01-24T15:06:10.000+08:00",
			delFlag: "0",
			deptId: 103,
			deptName: "研发部门",
			orderStatus: -1,
			repairByName: "管理员",
			repairContacts: "李航",
			repairDate: "2022-01-24 15:05:47",
			repairDescription: "E22故障",
			repairPhone: "18804626605",
			requireDate: "2022-01-24 18:05:47",
			scardCode: "BX-20220124150610046",
			scardGuid: "40048ccac1b44e14a67c2f7c061d3ec4",
			scardId: 193,
			scardOrigin: "2",
			sclassEmergency: "0",
			sclassId: 36,
			sclassName: "日常维修",
			teamId: 57,
			teamName: "维修管理-01",
			userId: 1
		}, {
			areaId: 6,
			areaName: "软件园/A号楼/二层",
			createBy: "admin",
			createTime: "2022-01-24T15:06:10.000+08:00",
			delFlag: "0",
			deptId: 103,
			deptName: "研发部门",
			orderStatus: -1,
			repairByName: "管理员",
			repairContacts: "李航",
			repairDate: "2022-01-24 15:05:47",
			repairDescription: "E22故障",
			repairPhone: "18804626605",
			requireDate: "2022-01-24 18:05:47",
			scardCode: "BX-20220124150610046",
			scardGuid: "40048ccac1b44e14a67c2f7c061d3ec4",
			scardId: 193,
			scardOrigin: "2",
			sclassEmergency: "0",
			sclassId: 36,
			sclassName: "日常维修",
			teamId: 57,
			teamName: "维修管理-01",
			userId: 1
		},
		{
			areaId: 6,
			areaName: "软件园/A号楼/二层",
			createBy: "admin",
			createTime: "2022-01-24T15:06:10.000+08:00",
			delFlag: "0",
			deptId: 103,
			deptName: "研发部门",
			orderStatus: -1,
			repairByName: "管理员",
			repairContacts: "李航",
			repairDate: "2022-01-24 15:05:47",
			repairDescription: "E22故障",
			repairPhone: "18804626605",
			requireDate: "2022-01-24 18:05:47",
			scardCode: "BX-20220124150610046",
			scardGuid: "40048ccac1b44e14a67c2f7c061d3ec4",
			scardId: 193,
			scardOrigin: "2",
			sclassEmergency: "0",
			sclassId: 36,
			sclassName: "日常维修",
			teamId: 57,
			teamName: "维修管理-01",
			userId: 1
		},
		{
			areaId: 64,
			areaName: "测试园",
			createBy: "admin",
			createTime: "2021-12-20T16:32:50.000+08:00",
			delFlag: "0",
			deptId: 103,
			deptName: "研发部门",
			orderStatus: -1,
			repairByName: "管理员",
			repairContacts: "郭",
			repairDate: "2021-12-19 16:32:49",
			repairDescription: "硬件设备不能运行",
			repairPhone: "13939002866",
			requireDate: "2021-12-19 20:32:49",
			scardCode: "BX-20211220163249888",
			scardGuid: "fc001d5127a44eeab47276955eac6f81",
			scardId: 188,
			scardOrigin: "0",
			sclassEmergency: "1",
			sclassId: 42,
			sclassName: "设备维修->tes1test->维修软件系统",
			teamId: 1,
			teamName: "维修班组",
			updateBy: "admin",
			updateTime: "2021-12-21T10:50:23.000+08:00",
			userId: 1
		}, {
			areaId: 64,
			areaName: "测试园",
			createBy: "admin",
			createTime: "2021-12-17T12:49:35.000+08:00",
			delFlag: "0",
			deptId: 103,
			deptName: "研发部门",
			orderStatus: -1,
			repairByName: "管理员",
			repairContacts: "陈",
			repairDate: "2021-12-15 14:00:00",
			repairPhone: "13929880099",
			requireDate: "2021-12-15 16:00:00",
			scardCode: "BX-20211217124935237",
			scardGuid: "734f9f9d38604bb4bf86a0dfb187df58",
			scardId: 187,
			scardOrigin: "0",
			sclassEmergency: "1",
			sclassId: 4,
			sclassName: "维修分类->水->停水",
			teamId: 2,
			teamName: "保养班组",
			updateBy: "admin",
			updateTime: "2021-12-20T16:51:31.000+08:00",
			userId: 1
		}
	],
	inspection: [{
			beginDate: "2022-01-16 15:52:15",
			createBy: "SYSTEM",
			createTime: "2022-01-16 01:00:01",
			delFlag: "0",
			endDate: "2022-01-16 16:52:15",
			latestTime: "2022-01-16 17:22:15",
			lineId: 1,
			lineName: "线路1",
			planCode: "MONTH3",
			planId: 52,
			planName: "巡检计划-跨年-类型月-隔一月",
			staffId: 110,
			staffName: "王利",
			status: "1",
			taskCode: "MONTH3-2022-01-16-0004",
			taskGuid: "c9ceeb428a504c8a94a77c8e612b5de1",
			taskId: 1600,
			teamId: 21,
			teamName: "自由班组",
			type: "0"
		},
		{
			beginDate: "2022-01-16 15:49:49",
			createBy: "SYSTEM",
			createTime: "2022-01-16 01:00:01",
			delFlag: "0",
			endDate: "2022-01-16 17:09:49",
			latestTime: "2022-01-16 17:19:49",
			lineId: 1,
			lineName: "线路1",
			planCode: "MONTH1",
			planId: 50,
			planName: "巡检计划-不跨年-类型月-隔一月",
			staffId: 110,
			staffName: "王利",
			status: "1",
			taskCode: "MONTH1-2022-01-16-0004",
			taskGuid: "bf29647970244eceb200d462b0ec13e7",
			taskId: 1596,
			teamId: 21,
			teamName: "自由班组",
			type: "0"
		},
		{
			beginDate: "2022-01-16 14:12:15",
			createBy: "SYSTEM",
			createTime: "2022-01-16 01:00:01",
			delFlag: "0",
			endDate: "2022-01-16 15:12:15",
			latestTime: "2022-01-16 15:42:15",
			lineId: 1,
			lineName: "线路1",
			planCode: "MONTH3",
			planId: 52,
			planName: "巡检计划-跨年-类型月-隔一月",
			staffId: 110,
			staffName: "王利",
			status: "1",
			taskCode: "MONTH3-2022-01-16-0003",
			taskGuid: "f4b1c870f9344b6a95d8bb6b713cebc4",
			taskId: 1599,
			teamId: 21,
			teamName: "自由班组",
			type: "0"
		},
	],
	maintain: [{
			createBy: "system",
			createTime: "2022-01-18 00:00:02",
			delFlag: "0",
			equCode: "20200515000",
			equId: 9,
			equName: "客梯",
			finishTime: "2022-01-18 20:47:00",
			maintainTime: "2022-01-18 00:00:00",
			mcontentCode: "test1018",
			mcontentId: 22,
			mcontentName: "t1018",
			notes: "system于2022-01-18 00:00:01手动创建该保养任务单！且不影响原先的保养计划！",
			staffId: "105",
			staffName: "保养班组01-组员01",
			status: "0",
			taskCode: "test1018-manual-20220118000001582",
			taskGuid: "b2bee9a1f43c480fbbf51de2defdeba0",
			taskId: 1702,
			teamId: 6,
			teamName: "保养班组->保养班组01",
			type: "1",
			updateBy: "admin",
			updateTime: "2022-01-18T20:48:15.000+08:00"
		},
		{
			createBy: "system",
			createTime: "2022-01-18 00:00:01",
			delFlag: "0",
			equId: 90,
			maintainTime: "2022-01-18 00:00:00",
			mcontentCode: "t817",
			mcontentId: 27,
			mcontentName: "维修保养规划",
			notes: "system于2022-01-18 00:00:00手动创建该保养任务单！且不影响原先的保养计划！",
			staffId: "105",
			staffName: "保养班组01-组员01",
			status: "1",
			taskCode: "t817-manual-20220118000000810",
			taskGuid: "64549629296b46e697dd7d8f9547ad8e",
			taskId: 1701,
			teamId: 6,
			teamName: "保养班组->保养班组01",
			type: "1"
		},
		{
			createBy: "system",
			createTime: "2022-01-17 00:00:01",
			delFlag: "0",
			equId: 90,
			maintainTime: "2022-01-17 00:00:00",
			mcontentCode: "t817",
			mcontentId: 27,
			mcontentName: "维修保养规划",
			notes: "system于2022-01-17 00:00:00手动创建该保养任务单！且不影响原先的保养计划！",
			staffId: "105",
			staffName: "保养班组01-组员01",
			status: "1",
			taskCode: "t817-manual-20220117000000791",
			taskGuid: "0c9367b08131449ca5cb9ab180f95cb9",
			taskId: 1700,
			teamId: 6,
			teamName: "保养班组->保养班组01",
			type: "1"
		}
	]
};
// ***** order组件配置参数 ******
export const cardEdit = {
	repair: {
		typeValue: ['一般', '紧急'],
		listType: '维修工单',
		name: 'repairContacts',
		phone: 'repairPhone',
		time: 'createTime',
		type: 'sclassEmergency',
		bottomList: [{
				title: '报修人',
				field: 'repairByName',
				value: undefined
			}, {
				title: '维修单号',
				field: 'scardCode',
				value: undefined
			},
			{
				title: '维修分类',
				field: 'sclassName',
				value: undefined
			},
			{
				title: '维修来源',
				field: 'scardOrigin',
				value: undefined
			},
			{
				title: '报修区域',
				field: 'repairDescription',
				value: undefined
			},
			{
				title: '报修部门',
				field: 'deptName',
				value: undefined
			}
		]
	},
	inspection: {
		typeValue: ['完成', '未完成'],
		headerRightValue: '完成',
		headerLeftValue: '未完成',
		listType: '巡检任务',
		name: 'staffName',
		phone: undefined,
		time: 'createTime',
		type: 'status',
		bottomList: [{
				title: '任务编码',
				field: 'taskCode',
				value: undefined
			},
			{
				title: '计划编码',
				field: 'planCode',
				value: undefined
			},
			{
				title: '计划名称',
				field: 'planName',
				value: undefined
			},
			{
				title: '巡检路线',
				field: 'lineName',
				value: undefined
			},
			{
				title: '预计结束时间',
				field: 'endDate',
				value: undefined
			},
			{
				title: '最晚结束时间',
				field: 'latestTime',
				value: undefined
			},
			{
				title: '巡检班组',
				field: 'teamName',
				value: undefined
			},
		]
	},
	maintain: {
		typeValue: ['完成', '未完成'],
		listType: '保养任务',
		name: 'teamName',
		phone: undefined,
		time: 'createTime',
		type: 'status',
		bottomList: [{
				title: '任务编码',
				field: 'taskCode',
				value: undefined
			},
			{
				title: '计划编码',
				field: 'mcontentCode',
				value: undefined
			},
			{
				title: '计划名称',
				field: 'mcontentName',
				value: undefined
			},
			{
				title: '设备编码',
				field: 'equCode',
				value: undefined
			},
			{
				title: '设备名称',
				field: 'equName',
				value: undefined
			},
			{
				title: '任务类型',
				field: 'type',
				value: undefined
			},
			{
				title: '保养班组',
				field: 'staffName',
				value: undefined
			},
		]
	}
};
