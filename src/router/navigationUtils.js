const navBarForUser = [
	{ id: 1, text: "Подписка", name: "rates" },
	{
		id: 2,
		text: "Обращения",
		name: "appeals",
		routeParams: { query: { page: 1 } },
	},
	{
		id: 3,
		text: "Мои парсеры",
		name: "parsources",
		routeParams: { query: { page: 1 } },
	},
	{ id: 4, text: "Избранное", name: "favorites" },
	{ id: 5, text: "Мой профиль", name: "profile" },
];

const navBarForManager = [
	{
		id: 1,
		text: "Пользователи",
		name: "users",
		routeParams: { query: { page: 1 } },
	},
	{
		id: 2,
		text: "Обращения",
		name: "appeals",
		routeParams: { query: { page: 1 } },
	},
	{
		id: 3,
		text: "Все парсеры",
		name: "parsources",
		routeParams: { query: { page: 1 } },
	},
	{ id: 4, text: "Мой профиль", name: "profile" },
];
const navBarForAdmin = [
	{
		id: 1,
		text: "Пользователи",
		name: "users",
		routeParams: { query: { page: 1 } },
	},
	{ id: 2, text: "Управление", name: "control" },
	{
		id: 3,
		text: "Обращения",
		name: "appeals",
		routeParams: { query: { page: 1 } },
	},
	{
		id: 4,
		text: "Все парсеры",
		name: "parsources",
		routeParams: { query: { page: 1 } },
	},
	{ id: 5, text: "Мой профиль", name: "profile" },
];

const navBarDataHome = [
	{ id: 0, text: "Тарифы", anchor: "#rates" },
	{ id: 1, text: "Как это работает", anchor: "#how-it-works" },
	{ id: 2, text: "О компании", anchor: "#about" },
	{ id: 3, text: "Блог", name: "blog" },
];

const navigationState = new Map([
	[
		"loginDefaultUser",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"loginManager",
		{
			name: "appeals",
			query: { page: 1 },
		},
	],
	[
		"loginAdminCRM",
		{
			name: "users",
			query: { page: 1 },
		},
	],
	[
		"homeAdminCRM",
		{
			name: "users",
			query: { page: 1 },
		},
	],
	[
		"homeDefaultUser",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"homeManager",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"homeratePopupDefaultUser",
		{
			name: "rates",
		},
	],
	[
		"homeratePopupAdminCRM",
		{
			name: "control",
		},
	],
	[
		"homeratePopupManager",
		{
			name: "profile",
		},
	],

	[
		"blog-articlesAdminCRM",
		{
			name: "users",
			query: { page: 1 },
		},
	],
	[
		"blog-articlesDefaultUser",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"blog-articlesManager",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"cabinetAdminCRM",
		{
			name: "users",
			query: { page: 1 },
		},
	],
	[
		"cabinetDefaultUser",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
	[
		"cabinetManager",
		{
			name: "parsources",
			query: { page: 1 },
		},
	],
]);

const navigateCabinet = (userRole, to, from) => {
	// to и from это объекты навигации из хуков навигации
	const { name: pathNameFrom } = from;
	const { query } = to;
	const redirectQueryFromRateCard = query?.from ? query.from : "";

	const currentNavigationPath =
		pathNameFrom + redirectQueryFromRateCard + userRole;

	const currentNavigationObject = navigationState.get(currentNavigationPath);
	return currentNavigationObject ? currentNavigationObject : null;
};

export {
	navigateCabinet,
	navBarDataHome,
	navBarForUser,
	navBarForManager,
	navBarForAdmin,
};
