<template>
	<div class="page-cabinet theme-container">
		<the-header
			:isCabinetVersion="true"
			:isMenuMinimized="isSideBarMinimized"
			@open_menu="handleOpenBar"
			@close_menu="handleCloseBar"
		></the-header>

		<!-- <navigation-panel
			:notifications="notifications"
			:isSideBarMinimized="isSideBarMinimized"
			@open_menu="open_menu"
			@close_menu="close_menu"
		></navigation-panel> -->
		<side-bar
			class="page-cabinet__side-bar"
			:isSideBarMinimized="isSideBarMinimized"
			@open-bar="handleOpenBar"
			@close-bar="handleCloseBar"
		>
			<navigation-panel-r
				class="page-cabinet__navigation-panel"
				:tabs="navigationTabs"
				:tabIcons="$options.tabIcons"
				:currentTab="currentTab(currentTabName)"
				:isMenuMinimized="isSideBarMinimized"
				@navigate-to="handleNavigate"
			/>
		</side-bar>

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
	import TheHeader from "@/components/TheHeader";
	import NavigationPanel from "@/components/Cabinet/NavigationPanel";
	import SideBar from "@/components/SideBar.vue";
	import NavigationPanelR from "@/components/NavigationPanelR.vue";

	import RatesIcon from "@/assets/icons/Cabinet/NavigationPanel/RatesIcon.vue";
	import ParsersIcon from "@/assets/icons/Cabinet/NavigationPanel/ParsersIcon.vue";
	import FavoritesIcon from "@/assets/icons/Cabinet/NavigationPanel/FavoritesIcon.vue";
	import AppealsIcon from "@/assets/icons/Cabinet/NavigationPanel/AppealsIcon.vue";
	import ProfileIcon from "@/assets/icons/Cabinet/NavigationPanel/ProfileIcon.vue";
	import UsersIcon from "@/assets/icons/Cabinet/NavigationPanel/UsersIcon.vue";
	import ControlIcon from "@/assets/icons/Cabinet/NavigationPanel/ControlIcon.vue";

	import {
		navBarForUser,
		navBarForManager,
		navBarForAdmin,
	} from "@/js/navigationPanelData";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "PageCabinet",
		tabIcons: {
			Подписка: RatesIcon,
			Обращения: AppealsIcon,
			"Мои парсеры": ParsersIcon,
			"Все парсеры": ParsersIcon,
			Избранное: FavoritesIcon,
			"Мой профиль": ProfileIcon,
			Пользователи: UsersIcon,
			Управление: ControlIcon,
		},
		components: {
			TheHeader,
			NavigationPanel,
			SideBar,
			NavigationPanelR,
			RatesIcon,
			ParsersIcon,
			FavoritesIcon,
			AppealsIcon,
			ProfileIcon,
			UsersIcon,
		},
		provide: {
			handleClick() {
				console.log(this.name);
				this.$emit("setTab", this.name);
			},
			handleNavigateTo(tabName) {
				console.log(this);
				this.$emit("navigate-to", tabName);
			},
		},
		data: () => ({
			isSideBarMinimized: false,
			currentTabName: "parsources",
		}),
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
				const routeName = this.$route.name;
				if (routeName === "cabinet") {
					this.redirectUserByRole(this.userRole);
				} else {
					this.currentTabName = routeName;
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

			navigationTabs() {
				switch (this.userRole) {
					case "DefaultUser":
						return navBarForUser;
					case "Manager":
						return navBarForManager;
					case "AdminCRM":
						return navBarForAdmin;
					default:
						return [];
				}
			},
			currentTab() {
				return (currentTabName) => {
					return this.navigationTabs.find(
						(tab) => tab.name === currentTabName
					);
				};
			},
		},
		methods: {
			...mapActions(["getNotifications"]),

			handleNavigate(currentTabName) {
				const navigationObject = {};
				this.currentTabName = currentTabName;

				if (this.currentTab(currentTabName)?.routeParams) {
					navigationObject.query = {};
					navigationObject.query.page =
						this.currentTab(currentTabName).routeParams.query.page;
				}
				navigationObject.name = currentTabName;
				this.$router.push(navigationObject);
				if (this.document_width <= 1023) {
					this.handleCloseBar();
				}
			},
			handleOpenBar() {
				this.isSideBarMinimized = false;
			},
			handleCloseBar() {
				this.isSideBarMinimized = true;
			},

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
		},
		created() {
			this.getNotifications();
			this.redirectUserByRole(this.userRole);
		},
		mounted() {
			this.document_width > 1023
				? (this.isSideBarMinimized = false)
				: (this.isSideBarMinimized = true);
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
		&__side-bar {
			margin-top: 6.4rem;
		}
		&__navigation-panel {
			:deep(.navigation-item) {
				padding: 0.8rem 1.4rem 0.8rem 2.5rem;
			}
		}

		&__main {
			position: relative;
			display: block;
			margin-top: 6.4rem;
			background-color: $light-blue;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;

			@media (max-width: 1023px) {
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
