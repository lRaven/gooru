<template>
	<div class="page-cabinet theme-container">
		<the-header
			:isCabinetVersion="true"
			:isMenuMinimized="isSideBarMinimized"
			@open_menu="handleOpenBar"
			@close_menu="handleCloseBar"
		></the-header>
		<side-bar
			class="page-cabinet__side-bar"
			:isSideBarMinimized="isSideBarMinimized"
			@open-bar="handleOpenBar"
			@close-bar="handleCloseBar"
		>
			<navigation-panel
				class="page-cabinet__navigation-panel"
				:tabs="navigationTabs"
				:tabIcons="$options.tabIcons"
				:notifications="notifications"
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
		</main>
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";
	import SideBar from "@/components/SideBar.vue";
	import NavigationPanel from "@/components/NavigationPanel.vue";

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
		navigateCabinet,
	} from "@/router/navigationUtils";
	import { mapState, mapActions, mapGetters } from "vuex";
	import store from "@/store";

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
			SideBar,
			NavigationPanel,
			RatesIcon,
			ParsersIcon,
			FavoritesIcon,
			AppealsIcon,
			ProfileIcon,
			UsersIcon,
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
			document_width(){
				this.isSideBarMinimized = this.document_width < 1024;
			}
		},
		computed: {
			...mapState({
				tab: (state) => state.navigation_panel.tab,
				user_auth: (state) => state.cabinet.user_auth,
				userRole: (state) => state.cabinet.user.role,

				document_width: (state) => state.document_width,
			}),
			...mapGetters(["appeals_notifications", "parsources_notifications", "parsers_notifications", "user_notifications"]),

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
			notifications() {
				const notificationObj = {};
				this.navigationTabs.forEach( (tab) => {
					if (tab.name === 'appeals') {
						notificationObj['appeals'] = this.appeals_notifications.length;
					} else if (tab.name === 'parsources') {
						notificationObj['parsources'] = this.parsources_notifications.length + this.parsers_notifications.length;
					} else if (tab.name === 'users') {
						notificationObj['users'] = this.user_notifications.length;
					} else {
						notificationObj[tab.name] = 0;
					}
				});
				return notificationObj;
			},
			currentTab() {
				return (currentTabName) => {
					return this.navigationTabs.find((tab) =>
						tab.name.includes(currentTabName)
					);
				};
			},
		},
		methods: {
			...mapActions(["getNotifications"]),

			handleNavigate(tabId) {
				const navigationObject = {};
				const currentTab = this.navigationTabs.find(
					({ id }) => id === tabId
				);

				this.currentTabName = currentTab.name;
				if (currentTab?.routeParams) {
					navigationObject.query = {};
					navigationObject.query.page =
						currentTab.routeParams.query.page;
				}
				navigationObject.name = currentTab.name;
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
		},
		created() {
			this.getNotifications();
		},
		mounted() {
			this.document_width > 1023
				? (this.isSideBarMinimized = false)
				: (this.isSideBarMinimized = true);
		},
		beforeRouteEnter(to, from, next) {
			let userRole = store.state.cabinet.user?.role;
			/* к сожалению эти хуки не поддерживают асинхронность 
			не получилось сделать этот код совсем плоским, но по крайней мере 
			удалось избавиться от ещё более ужасных ветвлений*/
			if (!userRole) {
				// подписка на события мутаций в сторе, т.к. запрос о данных пользователя уже ушел на сервер
				const unsubscribe = store.subscribe((mutation) => {
					if (mutation.type === "SET_USER_DATA") {
						userRole = mutation.payload.role;
						const redirectObject = navigateCabinet(
							userRole,
							to,
							from
						);
						next((vm) => {
							if (redirectObject) {
								vm.$router.push(redirectObject);
							} else {
								vm.currentTabName = to.name;
							}
						});
						unsubscribe();
					}
				});
			} else {
				const redirectObject = navigateCabinet(userRole, to, from);
				next((vm) => {
					if (redirectObject) {
						vm.$router.push(redirectObject);
					} else {
						vm.currentTabName = to.name;
					}
				});
			}
		},
		beforeRouteUpdate(to) {
			this.currentTabName = to.name;
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
			@media (max-width: 1023px) {
				margin-top: 0;
			}
			.side-bar__controls {
				padding: 0 1rem 0 2rem;
			}
		}
		&__navigation-panel {
			:deep(.navigation-item) {
				padding: 0.8rem 1rem 0.8rem 2rem;
				.navigation-item__notification-counter {
					@media (max-width: 1023px) {
						right: 0.5rem;
					}
				}
			}
			:deep(.navigation-item_minimize) {
				padding: 1rem;
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
