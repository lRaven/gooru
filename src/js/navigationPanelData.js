const navBarForUser = [
	{ id: 1, selected: false, tab: "all", icon_fill: "", text: "Все" },
	{ id: 2, selected: false, tab: "parser", icon_fill: "", text: "Парсинг" },
	{ id: 3, selected: false, tab: "hh", icon_fill: "", text: "HH" },
];

const navBarDataHome = [
	{ id: 0, text: 'Тарифы', anchor: '#rates'},
	{ id: 1, text: 'Как это работает', anchor: '#how-it-works' },
	{ id: 2, text: 'О компании', anchor: '#about'},
	{ id: 3, text: 'Блог', name: 'blog' },
];

export { navBarForUser, navBarDataHome };
