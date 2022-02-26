export const formList = [{
	label: '维修分类',
	icon: 'grid-fill',
	type: 'sclassName'
}, {
	label: '报修时间',
	icon: "clock-fill",
	type: 'repairDate'
}, {
	label: '报修部门',
	icon: "tags-fill",
	type: 'deptName'
}, {
	label: '维修来源',
	icon: 'list-dot',
	type: 'repairDescription'
}, {
	label: '联系人',
	icon: "account-fill",
	type: 'repairContacts'
}, {
	label: '联系电话	',
	icon: "phone-fill",
	type: 'repairPhone'
}, {
	label: '报修区域',
	icon: "coupon-fill",
	type: 'areaName'
}, {
	label: '报修人',
	icon: 'server-fill',
	type: 'repairByName'
}, {
	label: '报修内容',
	icon: 'file-text-fill',
	type: 'repairDescription'
}, {
	label: '上传',
	type: 'upload'
}];
export const pickerData = {
	sclassName: {
		columns: [
			['中国', '美国', '5'],
			['深圳', '厦门', '上海', '拉萨'],
			['拉萨']

		],
		columnData: [
			['深圳', '厦门', '上海', '拉萨'],
			['得州', '华盛顿', '纽约', '阿拉斯加'],
			['得5', '华4顿', '纽3', '阿拉1加']
		],
		columnData2: [
			['拉萨'],
			['深圳'],
			['厦门'],
			['上海']
		]
	},
	areaName: {
		columns: [
			['中国', '美国', '5'],
			['深圳', '厦门', '上海', '拉萨'],
			['拉萨']
	
		],
		columnData: [
			['深圳', '厦门', '上海', '拉萨'],
			['得州', '华盛顿', '纽约', '阿拉斯加'],
			['得5', '华4顿', '纽3', '阿拉1加']
		],
		columnData2: [
			['拉萨'],
			['深圳'],
			['厦门'],
			['上海']
		]
	}
}
