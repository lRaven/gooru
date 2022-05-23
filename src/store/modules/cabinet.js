const state = () => ({
	parsers: [
		{
			id: 1,
			source: 'avito.ru',
			img: 'img/requests/request-img1.jpg',
			date: '03.15.2021',
			status: 58,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 2,
			source: 'bbbbbds.ru',
			img: 'img/requests/request-img2.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 3,
			source: 'cccccasdca.com',
			img: 'img/requests/request-img3.jpg',
			date: '03.15.2021',
			status: null,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 4,
			source: 'avito.ru',
			img: 'img/requests/request-img4.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 5,
			source: 'bbbbbds.ru',
			img: 'img/requests/request-img1.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 6,
			source: 'cccccasdca.com',
			img: 'img/requests/request-img2.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 7,
			source: 'avito.ru',
			img: 'img/requests/request-img3.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 8,
			source: 'bbbbbds.ru',
			img: 'img/requests/request-img4.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
		{
			id: 9,
			source: 'cccccasdca.com',
			img: 'img/requests/request-img1.jpg',
			date: '03.15.2021',
			status: 100,
			found: 600,
			favorite: 15,
			time: '1ч 45мин',
		},
	]
})

const getters = { PARSERS: state => state.parsers }

const mutations = { SET_PARSERS: (state, payload) => state.parsers = payload }

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}