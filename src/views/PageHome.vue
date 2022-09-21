<template>
	<div class="page-home theme-container">
		<the-header
			:isMenuMinimized="isMenuMinimized"
			@open_menu="handleOpenBar"
			@close_menu="handleCloseBar"
		/>
		<side-bar class="page-home__sidebar-panel" :isSideBarMinimized="isMenuMinimized" @close-bar="handleCloseBar">
			<navigation-panel-r
				:tabs="$options.navBarDataHome"
				:tabIcons="tabIcons"
				:isMenuMinimized="isMenuMinimized"
				:currentTab="currentTab"
				@navigate-to="handleNavigate"
			/>
		</side-bar>

		<main class="main">
			<the-banner />
			<the-benefits />
			<the-requests />
			<the-rates />
			<the-how-it-works />
			<the-sample-parser />
			<the-about-company />
		</main>
		<the-footer />
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";
	import SideBar from "@/components/SideBar.vue";
	import NavigationPanelR from "@/components/NavigationPanelR.vue";

	import TheBanner from "@/components/Home/TheBanner";
	import TheBenefits from "@/components/Home/TheBenefits";
	import TheRequests from "@/components/Home/TheRequests";
	import TheRates from "@/components/Home/TheRates";
	import TheHowItWorks from "@/components/Home/TheHowItWorks";
	import TheSampleParser from "@/components/Home/TheSampleParser";
	import TheAboutCompany from "@/components/Home/TheAboutCompany";

	import TheFooter from "@/components/TheFooter";

	// navbar icons
	import RatesIcon from "@/assets/icons/Home/NavigationPanel/RatesIcon.vue";
	import BlogIcon from "@/assets/icons/Home/NavigationPanel/BlogIcon.vue";
	import DefaultIcon from "@/assets/icons/Home/NavigationPanel/DefaultIcon.vue";
	import HowItWorks from "@/assets/icons/Home/NavigationPanel/HowItWorks.vue";

	import { scroll } from "@/js/scrollToLink";
	import { navBarDataHome } from "@/js/navigationPanelData";
	import { mapState } from "vuex";

	export default {
		name: "PageHome",
		navBarDataHome,
		components: {
			TheHeader,
			SideBar,
			NavigationPanelR,

			TheBanner,
			TheBenefits,
			TheRequests,
			TheRates,
			TheHowItWorks,
			TheSampleParser,
			TheAboutCompany,

			TheFooter,
			/* eslint-disable */
			RatesIcon /* eslint-disable */,
			BlogIcon /* eslint-disable */,
			DefaultIcon /* eslint-disable */,
			HowItWorks /* eslint-disable */,
		},
		provide: {
			handleClick() {
				this.$emit('setTab', this.id);
			},
			handleNavigateTo(tabId) {
				const choosenTab = this.tabs.find((tab) => tab.id === tabId);
				this.$emit("navigate-to", choosenTab);
			},
		},
		data() {
			return { isMenuMinimized: true, currentTab: null };
		},
		computed: {
			...mapState({
				documentWidth: (state) => state.document_width,
			}),
			tabIcons() {
				const tabIconsObject = {};
				this.$options.navBarDataHome.forEach((tab) => {
					switch (tab.text) {
						case "Тарифы":
							tabIconsObject[tab.text] = RatesIcon;
							break;
						case "Как это работает":
							tabIconsObject[tab.text] = HowItWorks;
							break;
						case "О компании":
							tabIconsObject[tab.text] = RatesIcon;
							break;
						case "Блог":
							tabIconsObject[tab.text] = BlogIcon;
							break;
						default:
							tabIconsObject[tab.text] = DefaultIcon;
							break;
					}
				});
				return tabIconsObject;
			},
		},
		methods: {
			scroll,
			handleNavigate(tab) {
				/*
				структура таба
				{ id: 0, text: 'Тарифы', anchor: '#rates'}
				*/
				this.currentTab = tab;
				if (tab?.anchor) {
					scroll(tab.anchor);
					this.isMenuMinimized = true;
				} else {
					this.$router.push({ name: tab.name });
				}
			},
			handleOpenBar() {
				this.isMenuMinimized = false;
			},
			handleCloseBar() {
				this.isMenuMinimized = true;
			},
		},
		beforeRouteEnter(to, from, next) {
			if ((from.name === "blog-article" || from.name === "blog-articles") && to.params.anchor) {
				next((vm) => {
					vm.scroll(to.params.anchor);
				});
			} else {
				next();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.page-home__sidebar-panel {
		display: none;
		padding: 7rem 0 0 0;
		@media (max-width: 1023px) {
			padding: 4rem 1.5rem 1.5rem 1.5rem;
			display: flex;
			z-index: 3;
		}
		@media (max-width: 560px) {
			padding: 2rem 1.5rem 1.5rem 1.5rem;
		}
		@media (max-width: 450px) {
			padding: 1.5rem 1.5rem 1.5rem 1.5rem;
		}
	}
</style>
