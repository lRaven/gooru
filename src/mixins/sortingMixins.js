import { sortArrayByObjectKey, sortArrayByNumberKey } from '@/js/sortArrayByObjectKey';

export const sortParsources = {
	watch: {
		sortByDropdown() {
			this.sort_list({ key: this.sortByDropdown.key, direction: this.sortByDropdown.direction });
		},
	},
	data: () => ({
		sortManager: [
			{
				id: 1,
				key: "user",
				description: "Пользователь",
				direction: "descending",
			},
			{
				id: 2,
				key: "data_source",
				description: "Источник",
				direction: "descending",
			},
			{
				id: 3,
				key: "date",
				description: "Дата",
				direction: "descending",
			},
			{
				id: 4,
				key: "condition",
				description: "Статус",
				direction: "descending",
			},
			{
				id: 5,
				key: "find",
				description: "Найдено",
				direction: "descending",
			},
			{
				id: 6,
				key: "lost_time",
				description: "Время парсинга",
				direction: "descending",
			},
		],
		sortUser: [
			{
				id: 1,
				key: "data_source",
				description: "Источник",
				direction: "descending",
			},
			{
				id: 2,
				key: "name",
				description: "Название",
				direction: "descending",
			},
			{
				id: 3,
				key: "date",
				description: "Дата",
				direction: "descending",
			},
			{
				id: 4,
				key: "condition",
				description: "Статус",
				direction: "descending",
			},
			{
				id: 5,
				key: "find",
				description: "Найдено",
				direction: "descending",
			},
			{
				id: 6,
				key: "favorite",
				description: "В избранном",
				direction: "descending",
			},
			{
				id: 7,
				key: "lost_time",
				description: "Время парсинга",
				direction: "descending",
			},
		],

		sortUserDropdown: [
			{
				id: 1,
				key: "data_source",
				description: "по источнику (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 2,
				key: "data_source",
				description: "по источнику (по-убыванию)",
				direction: "descending",
			},
			{
				id: 3,
				key: "name",
				description: "по названию (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 4,
				key: "name",
				description: "по названию (по-убыванию)",
				direction: "descending",
			},
			{
				id: 5,
				key: "date",
				description: "по дате (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 6,
				key: "date",
				description: "по дате (по-убыванию)",
				direction: "descending",
			},
			{
				id: 7,
				key: "condition",
				description: "по статусу (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 8,
				key: "condition",
				description: "по статусу (по-убыванию)",
				direction: "descending",
			},
			{
				id: 9,
				key: "find",
				description: "по числу найденных (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 10,
				key: "find",
				description: "по числу найденных (по-убыванию)",
				direction: "descending",
			},
			{
				id: 11,
				key: "favorite",
				description: "по числу в избранном (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 12,
				key: "favorite",
				description: "по числу в избранном (по-убыванию)",
				direction: "descending",
			},
			{
				id: 13,
				key: "lost_time",
				description: "по времени парсинга (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 14,
				key: "lost_time",
				description: "по времени парсинга (по-убыванию)",
				direction: "descending",
			},
		],
		sortManagerDropdown: [
			{
				id: 1,
				key: "user",
				description: "по пользователю (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 2,
				key: "user",
				description: "по пользователю (по-убыванию)",
				direction: "descending",
			},
			{
				id: 3,
				key: "data_source",
				description: "по источнику (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 4,
				key: "data_source",
				description: "по источнику (по-убыванию)",
				direction: "descending",
			},
			{
				id: 5,
				key: "name",
				description: "по названию (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 6,
				key: "name",
				description: "по названию (по-убыванию)",
				direction: "descending",
			},
			{
				id: 7,
				key: "date",
				description: "по дате (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 8,
				key: "date",
				description: "по дате (по-убыванию)",
				direction: "descending",
			},
			{
				id: 9,
				key: "condition",
				description: "по статусу (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 10,
				key: "condition",
				description: "по статусу (по-убыванию)",
				direction: "descending",
			},
			{
				id: 11,
				key: "find",
				description: "по числу найденных (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 12,
				key: "find",
				description: "по числу найденных (по-убыванию)",
				direction: "descending",
			},
			{
				id: 13,
				key: "favorite",
				description: "по числу в избранном (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 14,
				key: "favorite",
				description: "по числу в избранном (по-убыванию)",
				direction: "descending",
			},
			{
				id: 15,
				key: "lost_time",
				description: "по времени парсинга (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 16,
				key: "lost_time",
				description: "по времени парсинга (по-убыванию)",
				direction: "descending",
			},
		],

		sortBy: null,
		sortByDropdown: null,
	}),

	methods: {
		//* функция вызывается при повторном клике на кнопку сортировки (смена направления сортировки)
		change_direction(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});

			if (this.userRole !== "DefaultUser") {
				this.sortManager.find((el) => {
					if (el.id === args.id) {
						el.direction = args.direction;
					}
				});
			} else {
				this.sortUser.find((el) => {
					if (el.id === args.id) {
						el.direction = args.direction;
					}
				});
			}
		},

		//* функция вызывается при первом клике на кнопку сортировки (сортировка по-возрастанию)
		new_sort(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});

			if (this.userRole !== "DefaultUser") {
				this.sortManager.forEach((el) => {
					if (el.id === args.id) {
						el.direction = "ascending";
					} else {
						el.direction = "descending";
					}
				});
			} else {
				this.sortUser.forEach((el) => {
					if (el.id === args.id) {
						el.direction = "ascending";
					} else {
						el.direction = "descending";
					}
				});
			}
		},

		sort_list({ key, direction }) {
			//* по ключу user числа, поэтому другая функция сортировки
			if (key === "user") {
				this.parsources_list = sortArrayByNumberKey({
					array: this.parsources,
					key: key,
					direction: direction,
				});
			} else {
				this.parsources_list = sortArrayByObjectKey({
					array: this.parsources,
					key: key,
					direction: direction,
				});
			}
		},
	},
}

export const sortParsourcesUser = {
	watch: {
		sortByDropdown() {
			this.sort_list({ key: this.sortByDropdown.key, direction: this.sortByDropdown.direction });
		},
	},
	data: () => ({
		sortUser: [
			{
				id: 1,
				key: "data_source",
				description: "Источник",
				direction: "descending",
			},
			{
				id: 2,
				key: "name",
				description: "Название",
				direction: "descending",
			},
			{
				id: 3,
				key: "date",
				description: "Дата",
				direction: "descending",
			},
			{
				id: 4,
				key: "condition",
				description: "Статус",
				direction: "descending",
			},
			{
				id: 5,
				key: "find",
				description: "Найдено",
				direction: "descending",
			},
			{
				id: 6,
				key: "favorite",
				description: "В избранном",
				direction: "descending",
			},
			{
				id: 7,
				key: "lost_time",
				description: "Время парсинга",
				direction: "descending",
			},
		],

		sortUserDropdown: [
			{
				id: 1,
				key: "data_source",
				description: "по источнику (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 2,
				key: "data_source",
				description: "по источнику (по-убыванию)",
				direction: "descending",
			},
			{
				id: 3,
				key: "name",
				description: "по названию (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 4,
				key: "name",
				description: "по названию (по-убыванию)",
				direction: "descending",
			},
			{
				id: 5,
				key: "date",
				description: "по дате (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 6,
				key: "date",
				description: "по дате (по-убыванию)",
				direction: "descending",
			},
			{
				id: 7,
				key: "condition",
				description: "по статусу (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 8,
				key: "condition",
				description: "по статусу (по-убыванию)",
				direction: "descending",
			},
			{
				id: 9,
				key: "find",
				description: "по найденным (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 10,
				key: "find",
				description: "по найденным (по-убыванию)",
				direction: "descending",
			},
			{
				id: 11,
				key: "favorite",
				description: "по числу в избранном (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 12,
				key: "favorite",
				description: "по числу в избранном (по-убыванию)",
				direction: "descending",
			},
			{
				id: 13,
				key: "lost_time",
				description: "по времени парсинга (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 14,
				key: "lost_time",
				description: "по времени парсинга (по-убыванию)",
				direction: "descending",
			},
		],

		sortBy: null,
		sortByDropdown: null,
	}),

	methods: {
		//* функция вызывается при повторном клике на кнопку сортировки (смена направления сортировки)
		change_direction(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});


			this.sortUser.find((el) => {
				if (el.id === args.id) {
					el.direction = args.direction;
				}
			});

		},

		//* функция вызывается при первом клике на кнопку сортировки (сортировка по-возрастанию)
		new_sort(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});


			this.sortUser.forEach((el) => {
				if (el.id === args.id) {
					el.direction = "ascending";
				} else {
					el.direction = "descending";
				}
			});

		},

		sort_list({ key, direction }) {
			//* по ключу user числа, поэтому другая функция сортировки
			if (key === "user") {
				this.parsources_list = sortArrayByNumberKey({
					array: this.parsources,
					key: key,
					direction: direction,
				});
			} else {
				this.parsources_list = sortArrayByObjectKey({
					array: this.parsources,
					key: key,
					direction: direction,
				});
			}
		},
	},
}

export const sortUsers = {
	watch: {
		sortByDropdown() {
			this.sort_list({ key: this.sortByDropdown.key, direction: this.sortByDropdown.direction });
		},
	},
	data: () => ({
		sortManager: [
			{
				id: 1,
				key: "id",
				description: "Пользователь",
				direction: "descending",
			},
			{
				id: 2,
				key: "is_active",
				description: "Статус",
				direction: "descending",
			},
			{
				id: 3,
				key: "",
				description: "Кол-во парсеров",
				direction: "descending",
			},
		],

		sortAdmin: [
			{
				id: 1,
				key: "id",
				description: "Пользователь",
				direction: "descending",
			},
			{
				id: 2,
				key: "is_active",
				description: "Статус",
				direction: "descending",
			},
			{
				id: 3,
				key: "",
				description: "Кол-во парсеров",
				direction: "descending",
			},
			{
				id: 4,
				key: "condition",
				description: "Менеджер",
				direction: "descending",
			},
		],

		sortManagerDropdown: [
			{
				id: 1,
				key: "id",
				description: "По id пользователя (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 2,
				key: "id",
				description: "По id пользователя (по-убыванию)",
				direction: "descending",
			},
			{
				id: 3,
				key: "is_active",
				description: "По статусу (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 4,
				key: "is_active",
				description: "По статусу (по-убыванию)",
				direction: "descending",
			},
			{
				id: 5,
				key: "",
				description: "По кол-ву парсеров (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 6,
				key: "",
				description: "По кол-ву парсеров (по-убыванию)",
				direction: "descending",
			},
		],

		sortAdminDropdown: [
			{
				id: 1,
				key: "id",
				description: "По id пользователя (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 2,
				key: "id",
				description: "По id пользователя (по-убыванию)",
				direction: "descending",
			},
			{
				id: 3,
				key: "is_active",
				description: "По статусу (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 4,
				key: "is_active",
				description: "По статусу (по-убыванию)",
				direction: "descending",
			},
			{
				id: 5,
				key: "",
				description: "По кол-ву парсеров (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 6,
				key: "",
				description: "По кол-ву парсеров (по-убыванию)",
				direction: "descending",
			},
			{
				id: 7,
				key: "",
				description: "По менеджеру (по-возрастанию)",
				direction: "ascending",
			},
			{
				id: 8,
				key: "",
				description: "По менеджеру (по-убыванию)",
				direction: "descending",
			},
		],

		sortBy: null,
		sortByDropdown: null,
	}),

	methods: {
		//* функция вызывается при повторном клике на кнопку сортировки (смена направления сортировки)
		change_direction(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});

			if (this.userRole === 'Manager') {
				this.sortManager.find((el) => {
					if (el.id === args.id) {
						el.direction = args.direction;
					}
				});
			} else if (this.userRole === 'AdminCRM') {
				this.sortAdmin.find((el) => {
					if (el.id === args.id) {
						el.direction = args.direction;
					}
				});
			}


		},

		//* функция вызывается при первом клике на кнопку сортировки (сортировка по-возрастанию)
		new_sort(args) {
			this.sort_list({
				key: args.key,
				direction: args.direction,
			});

			if (this.userRole === 'Manager') {
				this.sortManager.forEach((el) => {
					if (el.id === args.id) {
						el.direction = "ascending";
					} else {
						el.direction = "descending";
					}
				});
			} else if (this.userRole === 'AdminCRM') {
				this.sortAdmin.forEach((el) => {
					if (el.id === args.id) {
						el.direction = "ascending";
					} else {
						el.direction = "descending";
					}
				});
			}


		},

		sort_list({ key, direction }) {
			//* по ключу user числа, поэтому другая функция сортировки
			if (key === "id") {
				this.users_list = sortArrayByNumberKey({
					array: this.users,
					key: key,
					direction: direction,
				});
			} else {
				this.users_list = sortArrayByObjectKey({
					array: this.users,
					key: key,
					direction: direction,
				});
			}
		},
	},
}