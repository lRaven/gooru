<template>
	<div class="page-registration theme-container">
		<form @submit.prevent="registration">
			<label>
				<p>Email:</p>
				<input type="email" name="" id="1" v-model="email" />
			</label>
			<label>
				<p>Login:</p>
				<input type="text" name="" id="2" v-model="username" />
			</label>
			<label>
				<p>Password:</p>
				<input type="password" name="" id="3" v-model="password" />
			</label>
			<button type="submit">Зарегистрироваться</button>
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";

	export default {
		name: "PageRegistration",
		computed: {
			...mapState(["baseURL"]),
		},
		data: () => ({
			email: "",
			username: "",
			password: "",
		}),
		methods: {
			registration() {
				axios
					.post(`${this.baseURL}/auth/users/`, {
						email: this.email,
						username: this.username,
						password: this.password,
					})
					.then((response) => {
						if (response.status === 201) {
							this.$router.push("/login");
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
	.page-registration {
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
