const endpoints = {
	product: {
		list: '/products',
	},
	blog: {
		list: '/blogs',
	},
	categories: {
		list: '/categories',
	},
	homepage: {
		zh: '/pages/96',
		'zh-cn': '/pages/7069',
		en: '/pages/7070',
	},
	compareProgramsPage: '/pages/1621',
	comparePrograms: '/comparep-rograms',
	homeFeatured: '/home-featured',
	contactForm: {
		id: '317',
		unitTag: 'd349187',
	},
	contactFormAdvise: {
		id: '345',
		unitTag: '1ef1eec',
	},
	contactFormSettlementDocuments: {
		id: '822',
		unitTag: 'a407308',
	},
	taxonomiesSettlement: 'nation',
	settlementPrograms: '/settlement-programs',
	eb5Project: {
		page: '/pages/521?_fields=acf&acf_format=standard',
		list: '/eb5-projects',
		categories: '/eb5-categories?_fields=id,name,slug,taxonomy',
	},
	filter: '/filter-data-settlement_hp',
	homepageMap: '/data-map-homepage',
	aboutUs: {
		page: {
			zh: '/pages/7220?acf_format=standard',
			'zh-cn': '/pages/7222?acf_format=standard',
			en: '/pages/7224?acf_format=standard',
		},
		metadata: {
			zh: '/pages/7220',
			'zh-cn': '/pages/7222',
			en: '/pages/7224',
		}
	}
}

export default endpoints
