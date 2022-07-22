<template>
	<div class="page-cabinet theme-container">
		<the-header
			:isCabinetVersion="true"
			:isMenuMinimized="isMenuMinimized"
			@open_menu="open_menu"
			@close_menu="close_menu"
		></the-header>

		<navigation-panel
			:notifications="notifications"
			:isMenuMinimized="isMenuMinimized"
			@open_menu="open_menu"
			@close_menu="close_menu"
		></navigation-panel>

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
	import { mapState, mapActions } from "vuex";
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
			userRole: {
				handler() {
					if (this.$route.name === "cabinet") {
						this.redirectUserByRole(this.userRole);
					}
				},
				deep: true,
			},

			//* при изменении url смотреть, если находимся на главной странице кабинета, то редирект на дефолтную страницу юзера
			"$route.path"() {
				if (this.$route.name === "cabinet") {
					this.redirectUserByRole(this.userRole);
				}
			},
		},
		computed: {
			...mapState({
				tab: (state) => state.navigation_panel.tab,
				user_auth: (state) => state.cabinet.user_auth,
				userRole: (state) => state.cabinet.user.role,
				notifications: (state) => state.notifications.notifications,

				document_width: (state) => state.document_width,
			}),
		},
		data: () => ({ isMenuMinimized: false }),
		methods: {
			...mapActions(["getNotifications"]),

			//* редирект на дефолтную страницу кабинета в зависимости от роли юзера
			redirectUserByRole(role) {
				switch (role) {
					case "DefaultUser": {
						if (this.$route.query.from === "ratePopup") {
							this.$router.push({ name: "rates" });
						} else {
							this.$router.push({
								name: "parsources",
								query: { page: 1 },
							});
						}
						break;
					}
					case "Manager": {
						this.$router.push({
							name: "parsources",
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

			close_menu() {
				this.isMenuMinimized = true;
			},
			open_menu() {
				this.isMenuMinimized = false;
			},
		},
		created() {
			this.getNotifications();
			this.redirectUserByRole(this.userRole);
		},
		mounted() {
			this.document_width > 1023
				? (this.isMenuMinimized = false)
				: (this.isMenuMinimized = true);
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

		@media (max-width: 1023px) {
			grid-template-columns: 1fr;
		}

		&__main {
			position: relative;
			display: block;
			margin-top: 8rem;
			background-color: $light-blue;
			overflow-y: auto;

			@media (max-width: 1023px) {
				margin-top: 6.4rem;
			}
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
