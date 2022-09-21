const navBarForUser = [
	{ id: 1, text: "Подписка", name: "rates" },
	{ id: 2, text: "Обращения", name: "appeals", routeParams: { query: { page: 1 } }, },
	{ id: 3, text: "Мои парсеры", name: "parsources", routeParams: { query: { page: 1 } }, },
	{ id: 4, text: "Избранное", name: "favorites", },
	{ id: 5, text: "Мой профиль", name: "profile" },
];

const navBarForManager = [
	{ id: 1, text: "Пользователи", name: "users", routeParams: { query: { page: 1 } }, },
	{ id: 2, text: "Обращения", name: "appeals", routeParams: { query: { page: 1 } }, },
	{ id: 3, text: "Все парсеры", name: "parsources", routeParams: { query: { page: 1 } }, },
	{ id: 4, text: "Мой профиль", name: "profile" },
];
const navBarForAdmin = [
	{ id: 1, text: "Пользователи", name: "users", routeParams: { query: { page: 1 } } },
	{ id: 2, text: "Управление", name: "control", },
	{ id: 3, text: "Обращения", name: "appeals", routeParams: { query: { page: 1 } } },
	{ id: 4, text: "Все парсеры", name: "parsources", routeParams: { query: { page: 1 } } },
	{ id: 5, text: "Мой профиль", name: "profile", },
];

const navBarDataHome = [
	{ id: 0, text: 'Тарифы', anchor: '#rates'},
	{ id: 1, text: 'Как это работает', anchor: '#how-it-works' },
	{ id: 2, text: 'О компании', anchor: '#about'},
	{ id: 3, text: 'Блог', name: 'blog' },
];

export { navBarDataHome, navBarForUser, navBarForManager, navBarForAdmin, };
