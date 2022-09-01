<template>
	<div class="page-home theme-container">
		<the-header
			:isMenuMinimized="isMenuMinimized"
			@open_menu="handleOpenMenu"
			@close_menu="handleCloseMenu"
		/>
		<navigation-panel-r
			:tabs="$options.navBarDataHome"
			:tabIcons="tabIcons"
			:isMenuMinimized="isMenuMinimized"
			:currentTab="currentTab"
			@navigate-to="handleNavigate"
			@close-menu="handleCloseMenu"
			class="page-home__navigation-panel"
		/>

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
	import HowItWorks from "@/assets/icons/Home/NavigationPanel/HowItWorks.vue"

	import { scroll } from "@/js/scrollToLink";
	import { navBarDataHome } from "@/js/navigationPanelData";
	import { mapState } from "vuex";

	export default {
		name: "PageHome",
		navBarDataHome,
		components: {
			TheHeader,
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
			HowItWorks,/* eslint-disable */
		},
		data() {
			return { isMenuMinimized: false, currentTab: null };
		},
		watch: {
			/* documentWidth() {
				if (this.documentWidth <= 1023) {
					this.isMenuMinimize = true;
				}
			}, */
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
			handleOpenMenu() {
				this.isMenuMinimized = false;
			},
			handleCloseMenu() {
				this.isMenuMinimized = true;
			},
		},
		created() {
			this.isMenuMinimized = this.documentWidth <= 1023;
		},
		beforeRouteEnter(to, from, next) {
			if (from.name === "blog-article" && to.params.anchor) {
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
	.page-home__navigation-panel {
		display: none;
		padding: 7rem 0 0 0;
		@media (max-width: 1023px) {
			display: flex;
			z-index: 3;
		}
		@media (max-width: 767px) {
			margin: 74px 0 0 0;
		}
	}
</style>
