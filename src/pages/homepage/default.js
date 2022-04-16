// *****  App组件默认配置文件  ******
export const navList = [
	// {
	// 	title: '考勤打卡',
	// 	icon: 'map-fill',
	// 	value: '20',
	// 	color: ''
	// },
	// {
	// 	title: '排班',
	// 	icon: 'calendar-fill',
	// 	value: '20',
	// 	color: ''
	// },
	{
		title: '设备运维',
		icon: 'coupon-fill',
		value: '20',
		color: '',
		url: '../maintenance/index'
	},
	{
		title: '工单',
		icon: 'list-dot',
		value: '20',
		color: '',
		url:'../order/index'
	},
	{
		title: '告警中心',
		icon: 'error-circle-fill',
		value: '20',
		color: '',
		url:'../alarm/index'
	},
	{
		title: '设备档案',
		icon: 'grid-fill',
		value: '20',
		color: '',
		url:'../devicefiles/index'
	},
	{
		title: '文档管理',
		icon: 'file-text-fill',
		value: '20',
		color: '',
		url:'/pages/file/index'
		
	},
	{
		title: '知识库',
		icon: 'calendar-fill',
		value: '20',
		color: '',
		url:'/pages/knowledgebase/index'
	}
];
export const gridList = [{
		title: '已打卡',
		icon: 'error-circle',
		value: 'workDay',
		type: 'success'
	},
	{
		title: '未打卡',
		icon: 'error-circle',
		value: 'lossCount',
		type: 'error'
	},
	{
		title: '早退',
		icon: 'error-circle',
		value: 'beforeCount',
		type: 'warning'
	},
	{
		title: '迟到',
		icon: 'error-circle',
		value: 'lateCount',
		type: 'warning ',
		color: 'red'
	}
]
