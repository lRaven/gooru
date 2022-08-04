function returnErrorMessages(data) {
	let error_list = [];
	const error_messages = {
		email: 'Почта',
		username: 'Логин',
		password: 'Пароль',
		phone_number: 'Телефон',
		avatar: 'Изображение профиля',
		name: 'Имя',
		data_source: 'Источник',
		url_detail: 'Url источника',
		parse_fields: "Категория сбора информации",
		description: "Описание",
		screenshot: "Скриншот",
		url: "Url-адрес",
		title: "Заголовок",
		article: "Статья",
		client_status: "Статус клиента",
		fields_of_activity: "Сфера деятельности",
		site_types: "Тип сайтов",
		additional_options: "Дополнительные параметры",
		number_of_position_min: "Количество позиций (от)",
		number_of_position_max: "Количество позиций (до)",
		source_amount: "Источник",
		cost: "Стоимость",
		comment: "Комментарий",
	}
	for (let prop in data) {
		let key = '';
		error_messages[prop] ? key += error_messages[prop] + ': ' : key += ''

		if (Object.prototype.hasOwnProperty.call(data, prop)) {
			data[prop].forEach((el) => { error_list.push(`${key} ${el}`); });
		}
	}
	return error_list;
}

export { returnErrorMessages }