import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

//*TODO:   id юзера будет убран с бекенда, убрать после поле с id 
async function upload_avatar(user_id, avatar) {
	try {
		const request = await axios.patch(`${store.state.baseURL}/user/upload/${user_id}/`, {
			avatar: avatar,
		}, {
			headers: {
				Authorization: `token ${cookie.get('auth_token')}`,
				'Content-Type': 'multipart/form-data'
			}
		});

		if (request.status === 200) {
			console.log('Avatar changed');
			store.dispatch('getUserData');
		}
	}
	catch {
		console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
		);
	}
}

export { upload_avatar }