<template>
	<the-header class="page-home__header">
		<nav class="navigation">
			<a class="navigation__link" href="#">СОЦ. СЕТИ.</a>
			<a class="navigation__link" href="#about">О НАС</a>
			<a class="navigation__link" href="#">ВОЙТИ</a>
			<a class="navigation__link navigation__link_try-it" href="#"
				>ПОПРОБОВАТЬ БЕСПЛАТНО
				<ellipse-with-arrow-icon class="navigation__link-icon" />
			</a>
		</nav>
		<button class="header__menu-button" @click="handleOpenSideBar">
			<burger-icon class="header__menu-button-icon" />
		</button>
	</the-header>
	<side-bar
		:isSideBarMinimized="isSideBarMinimized"
		@close-sidebar="handleCloseSideBar"
	>
		<nav class="navigation navigation_burger">
			<a class="navigation__link" href="#">СОЦ. СЕТИ.</a>
			<a class="navigation__link" href="#about">О НАС</a>
			<a class="navigation__link" href="#">ВОЙТИ</a>
			<a class="navigation__link navigation__link_try-it" href="#"
				>ПОПРОБОВАТЬ БЕСПЛАТНО
				<ellipse-with-arrow-icon class="navigation__link-icon" />
			</a>
		</nav>
	</side-bar>
	<main class="page-home__main">
		<the-acquaintance />
		<the-free-period />
		<the-user-promlems id="about" />
		<the-user-solutions />
		<section class="laptop">
			<img
				class="laptop__image"
				src="@/../public/LapTopPic.svg"
				alt="картинка ноутбука"
			/>
		</section>
		<the-subscribe-invite class="page-home__subscribe-invite" />
		<the-footer />
	</main>
</template>

<script>
	import TheHeader from "@/components/TheHeader.vue";
	import SideBar from "@/components/SideBar.vue";
	import TheAcquaintance from "@/components/Home/TheAcquaintance.vue";
	import TheFreePeriod from "@/components/Home/TheFreePeriod.vue";
	import TheUserPromlems from "@/components/Home/TheUserPromlems.vue";
	import TheUserSolutions from "@/components/Home/TheUserSolutions.vue";
	import TheSubscribeInvite from "@/components/Home/TheSubscribeInvite.vue";
	import TheFooter from "@/components/TheFooter.vue";

	import EllipseWithArrowIcon from "@/assets/icons/EllipseWithArrowIcon.vue";
	import BurgerIcon from "@/assets/icons/BurgerIcon.vue";

	export default {
		name: "PageHome",
		components: {
			TheHeader,
			SideBar,
			TheAcquaintance,
			TheFreePeriod,
			TheUserPromlems,
			TheUserSolutions,
			TheSubscribeInvite,
			TheFooter,

			EllipseWithArrowIcon,
			BurgerIcon,
		},
		data() {
			return {
				isSideBarMinimized: true,
			};
		},
		methods: {
			handleCloseSideBar() {
				this.isSideBarMinimized = true;
			},
			handleOpenSideBar() {
				this.isSideBarMinimized = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-home {
		&__header {
			margin: 0 auto;
		}
		&__main {
			position: relative;
		}
	}
	.header {
		&__menu-button {
			display: none;
			@media (max-width: 1023px) {
				display: flex;
			}
		}
	}
	.navigation {
		display: flex;
		align-items: center;
		@media (max-width: 1023px) {
			display: none;
		}
		&_burger {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		&__link {
			font-size: 2rem;
			font-weight: 400;
			line-height: 2.8rem;
			padding: 0.5rem 2rem;
			margin: 0 4rem 0 0;
			border: 2px solid $black;
			border-radius: 12.4rem;
			color: $black;
			@media (max-width: 1650px) {
				margin: 0 2rem 0 0;
			}
			@media (max-width: 1400px) {
				margin: 0 1.5rem 0 0;
			}
			@media (max-width: 1220px) {
				font-size: 1.8rem;
				padding: 0.5rem 1.5rem;
			}
			@media (max-width: 1100px) {
				font-size: 1.7rem;
				line-height: 2.6rem;
				padding: 0.3rem 1.3rem;
			}
			@media (max-width: 1023px) {
				width: 100%;
				color: $white;
				border-radius: 0;
				padding: 0;
				margin: 0;
				transition: all 0.3 ease;
				&:hover {
					color: $black;
					background-color: $white;
				}
			}

			&:nth-child(3) {
				margin: 0;
			}

			&:last-child {
				display: flex;
				align-items: center;
				padding: 0;
				border: none;
				margin: 0 0 0 35.6rem;
				@media (max-width: 1650px) {
					margin: 0 0 0 20rem;
				}
				@media (max-width: 1400px) {
					margin: 0 0 0 10rem;
				}
				@media (max-width: 1220px) {
					margin: 0 0 0 5rem;
				}
				@media (max-width: 1100px) {
					margin: 0 0 0 3rem;
				}
				@media (max-width: 1023px) {
					margin: 0;
				}
			}
			&:hover {
				cursor: pointer;
			}
		}
		:deep(.icon.navigation__link-icon) {
			margin: 0 0 0 3rem;
			@media (max-width: 1400px) {
				margin: 0 0 0 2rem;
			}
			@media (max-width: 1100px) {
				margin: 0 0 0 1.5rem;
			}
			@media (max-width: 1023px) {
				path {
					fill: $black;
				}
				path:last-child {
					fill: $white;
				}
			}
		}
	}
	
	.laptop {
		display: flex;
		justify-content: center;
		background: linear-gradient(to bottom, $grey 89%, $black 11%);
		overflow: hidden;
		&__image {
			max-width: 1920px;
			width: 100%;
			background: linear-gradient(to bottom, $grey 89%, $black 11%);
			@media (max-width: 550px) {
				position: relative;
				left: 45rem;
				width: 1283px;
			}
		}
	}
</style>
