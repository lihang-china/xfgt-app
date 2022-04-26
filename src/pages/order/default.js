export const formList = [{
		label: '维修分类',
		icon: 'grid-fill',
		type: 'sclassId',
		children: []
	},
	// {
	// 	label: '报修时间',
	// 	icon: "clock-fill",
	// 	type: 'repairDate'
	// },
	// {
	// 	label: '报修部门',
	// 	icon: "tags-fill",
	// 	type: 'deptName'
	// },
	{
		label: '维修来源',
		icon: 'list-dot',
		type: 'scardOrigin',
		children: [{
				label: '网络',
				id: '0'
			},
			{
				label: '报警',
				id: '1'
			},
			{
				label: '保养',
				id: '2'
			},
			{
				label: '巡检',
				id: '3'
			},
		]
	},
	{
		label: '联系人',
		icon: "account-fill",
		type: 'repairContacts'
	}, {
		label: '联系电话	',
		icon: "phone-fill",
		type: 'repairPhone'
	},
	{
		label: '报修区域',
		icon: "coupon-fill",
		type: 'areaId',
		children: []
	},
	// {
	// 	label: '报修人',
	// 	icon: 'server-fill',
	// 	type: 'repairByName'
	// }, 
	{
		label: '报修内容',
		icon: 'file-text-fill',
		type: 'repairDescription'
	}, {
		label: '上传',
		type: 'upload'
	}
];
import {
	areaTree,
	repairTree
} from '/src/api/system.js'
areaTree().then(res => {
	formList.forEach(e => {
		if (e.type == 'areaId') {
			e.children = res.data
		}
	})
})
repairTree().then(res => {
	formList.forEach(e => {
		if (e.type == 'sclassId') {
			e.children = res.data
		}
	})
})
