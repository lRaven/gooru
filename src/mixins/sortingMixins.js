import { sortArrayByObjectKey, sortArrayByNumberKey } from '@/js/sortArrayByObjectKey';

export const sortParsources = {
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

		sortBy: null,
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

		sortBy: null,
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

		sortBy: null,
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