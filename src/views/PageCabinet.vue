<template>
	<div class="page-cabinet theme-container">
		<the-header :isCabinetVersion="true" />
		<navigation-panel />

		<main class="page-cabinet__main main">
			<router-view v-slot="{ Component }">
				<transition mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>

			<transition mode="out-in">
				<r-loader v-if="$route.name === 'cabinet'" />
			</transition>
		</main>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import TheHeader from "@/components/TheHeader";

	import NavigationPanel from "@/components/Cabinet/NavigationPanel";

	export default {
		name: "PageCabinet",
		components: {
			TheHeader,
			NavigationPanel,
		},
		watch: {
			user_auth() {
				if (this.user_auth === false)
					this.$router.push({ name: "login" });
			},
			//* при получении юзера, редиректить на дефолтную страницу юзера в случае если находимся на главной странице кабинета
			user: {
				handler() {
					if (this.$route.name === "cabinet") {
						this.redirectUserByRole(this.user.role);
					}
				},
				deep: true,
			},

			//* при изменении url смотреть, если находимся на главной странице кабинета, то редирект на дефолтную страницу юзера
			"$route.path"() {
				if (this.$route.name === "cabinet") {
					this.redirectUserByRole(this.user.role);
				}
			},
		},
		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
				user_auth: (state) => state.cabinet.user_auth,
				tab: (state) => state.navigation_panel.tab,
				userRole: (state) => state.cabinet.user.role,
			}),
		},
		methods: {
			//* редирект на дефолтную страницу кабинета в зависимости от роли юзера
			redirectUserByRole(role) {
				switch (role) {
					case "DefaultUser": {
						this.$router.push({ name: "rates" });
						break;
					}
					case "Manager": {
						this.$router.push({
							name: "appeals",
							query: { page: 1 },
						});
						break;
					}
					case "AdminCRM": {
						this.$router.push({
							name: "users",
							query: { page: 1 },
						});
						break;
					}
				}
			},
		},
		created() {
			this.redirectUserByRole(this.user.role);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-cabinet {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100vh;
		overflow: hidden;
		&__main {
			position: relative;
			display: block;
			margin-top: 8rem;
			background-color: $light-blue;
			overflow-y: auto;
		}
	}
</style>

<style lang="scss">
	.page-cabinet {
		.r-spoiler {
			&__title {
				font-weight: 500;
				font-size: 1.2rem;
			}

			+ .r-spoiler {
				margin-top: 2.8rem;
			}
		}
	}
</style>
