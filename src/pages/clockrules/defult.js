export const itemList = [{
		type: 'clock',
		children: [{
				title: '上下班时间',
				value: ['周一、二、三、四、五 A : 08:30-17:00', '周六、日 休息']
			},
			{
				title: '弹性规则',
				value: ['[班次：A]', '允许晚到晚走：上班时间最多可晚到30分钟，晚到几分钟，下班必须晚走几分钟', '第一天下班后晚走3个小时，第二天上班可以晚到一个小时']
			}, {
				title: '迟到规则',
				value: ['迟到10分钟以上视为严重迟到']
			}
		]
	},
	{
		type: 'rule',
		children: [{
			title: '缺卡后可以补卡',
			value: ['补卡起算日期未1号的每个月最多补卡5次，可补过去31个自然日内的缺卡']
		}]
	},
	{
		type: 'path',
		children: [{
			title: '办公地点',
			value: ['中控科技园']
		}]
	}
]
