<template>
	<div class="page-login theme-container">
		<form @submit.prevent="login">
			<label>
				<p>Login</p>
				<input type="text" name="" id="1" v-model="username" />
			</label>
			<label>
				<p>Password</p>
				<input type="password" name="" id="2" v-model="password" />
			</label>
			<button type="submit">Авторизоваться</button>
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "PageLogin",
		computed: {
			...mapState({
				baseURL: (state) => state.baseURL,
				auth_token: (state) => state.cabinet.auth_token,
			}),
		},
		data: () => ({
			username: "",
			password: "",
		}),
		methods: {
			...mapActions(["getUserData"]),
			login() {
				axios
					.post(`${this.baseURL}/auth/token/login/`, {
						username: this.username,
						password: this.password,
					})
					.then((response) => {
						if (response.status === 200) {
							this.$cookies.set(
								"auth_token",
								response.data.auth_token
							);
							localStorage.setItem("userAuth", "yes");
							this.getUserData();
							this.$router.push("/cabinet");
						}
					})
					.catch((err) => {
						throw new Error(err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-login {
		display: flex;
		justify-content: center;
		align-items: center;
		form {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			input,
			button {
				border: 1px solid #000;
				padding: 1rem;
				font-size: 4rem;
			}
			p {
				font-size: 4rem;
				margin-bottom: 1rem;
			}
		}
	}
</style>
