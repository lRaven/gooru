<template>
	<the-header
		class="page-home__header"
		:class="{
			'page-home__header_visible': isHeaderVisible,
			'page-home__header_hidden': !isHeaderVisible,
			'page-home__header_short': scrollValue > 200,
		}"
	>
		<nav class="navigation">
			<div class="navigation__link navigation__link_dropdown">
				СОЦ. СЕТИ.
				<ul class="dropdown">
					<li class="dropdown__item">
						<a
							class="dropdown__link"
							href="https://telegram.im/@compass_pro"
							target="_blank"
							>TELEGRAM</a
						>
					</li>
				</ul>
			</div>
			<a class="navigation__link" href="#about">О НАС</a>
			<a
				class="navigation__link"
				:href="gooruFrontendUrl + '/login'"
				target="_blank"
				>ВОЙТИ</a
			>
			<a
				class="navigation__link navigation__link_try-it"
				:href="gooruFrontendUrl + '/registration'"
				target="_blank"
				>ПОПРОБОВАТЬ БЕСПЛАТНО
				<ellipse-with-arrow-icon class="navigation__link-icon" />
			</a>
		</nav>
		<button class="header__menu-button" @click="handleOpenSideBar">
			<burger-icon class="header__menu-button-icon" />
		</button>
	</the-header>
	<side-bar
		class="page-home__sidebar"
		:isSideBarMinimized="isSideBarMinimized"
		@close-sidebar="handleCloseSideBar"
	>
		<nav class="navigation navigation_burger">
			<a
				class="navigation__link"
				href="#about"
				@click="handleCloseSideBar"
				>О НАС</a
			>
			<a
				class="navigation__link"
				:href="gooruFrontendUrl + '/login'"
				target="_blank"
				>ВОЙТИ</a
			>
			<a
				class="navigation__link navigation__link_try-it"
				:href="gooruFrontendUrl + '/registration'"
				target="_blank"
				>ПОПРОБОВАТЬ БЕСПЛАТНО
				<ellipse-with-arrow-icon class="navigation__link-icon" />
			</a>
			<p class="navigation__link navigation__link_underline">КОНТАКТЫ</p>
			<a
				class="navigation__link"
				href="https://telegram.im/@compass_pro"
				target="_blank"
				>TELEGRAM</a
			>
		</nav>
	</side-bar>
	<main class="page-home__main">
		<the-acquaintance />
		<the-free-period />
		<the-user-promlems />
		<the-user-solutions id="about" />
		<section class="laptop">
			<img
				class="laptop__image"
				:src="laptopPicSrc"
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
		inject: ["gooruFrontendUrl", "documentWidth", "appContext"],
		data() {
			return {
				isSideBarMinimized: true,
				isHeaderVisible: true,
				scrollValue: 0,
			};
		},
		watch: {
			documentWidth() {
				if (this.documentWidth >= 1023) {
					this.handleCloseSideBar();
				}
			},
		},
		computed: {
			laptopPicSrc() {
				return this.appContext === "blogers"
					? "/blogers/laptopPic.svg"
					: "/laptopPic.svg";
			},
		},
		methods: {
			handleCloseSideBar() {
				this.isSideBarMinimized = true;
			},
			handleOpenSideBar() {
				this.isSideBarMinimized = false;
			},
			handleChangeScroll() {
				if (scrollY - this.scrollValue > 0) {
					this.isHeaderVisible = false;
				} else {
					this.isHeaderVisible = true;
				}
				this.scrollValue = scrollY;
			},
		},
		created() {
			window.addEventListener("scroll", this.handleChangeScroll);
		},
		beforeUnmount() {
			window.removeEventListener("scroll", this.handleChangeScroll);
		},
	};
</script>

<style lang="scss" scoped>
	.page-home {
		&__header {
			position: fixed;
			width: 100%;
			z-index: 3;
			background-color: $grey;
			max-width: 2500px;

			&_visible {
				transition: all 0.3s ease;
				opacity: 1;
				/* position: fixed; */
				/* transform: none; */
			}
			&_hidden {
				transition: all 0.3s ease;
				opacity: 0;
				visibility: hidden;
				/* position: absolute;
				transform: translateY(-200%); */
			}
			&_short {
				padding-bottom: 3.7rem;
			}
		}
		&__sidebar {
			padding: 4.7rem 6rem 3.7rem 6rem;
			@media (max-width: 600px) {
				padding: 3.7rem 4rem 3.7rem 4rem;
			}
			@media (max-width: 450px) {
				padding: 3rem 3rem 3.7rem 3rem;
			}
		}
		&__main {
			position: relative;
			padding: 12.6rem 0 0 0;
			@media (max-width: 1023px) {
				padding: 11.2rem 0 0 0;
			}
			@media (max-width: 600px) {
				padding: 10.2rem 0 0 0;
			}
			@media (max-width: 450px) {
				padding: 15.6rem 0 0 0;
			}
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
			

			transition: all 0.3s ease;
			&:hover {
				color: $white;
				background-color: $black;
			}

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
				margin: 1rem 0 0 0;
				transition: all 0.2s ease;
				&:hover {
					color: $black;
					background-color: $white;
				}
			}

			&:nth-child(3) {
				margin: 0;
				@media (max-width: 1023px) {
					display: flex;
					align-items: center;
				}
			}

			&:last-child {
				display: flex;
				align-items: center;
				padding: 0;
				border: none;
				padding: 0.5rem 1rem;
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
					margin: 1rem 0 0 0;
				}
			}
			&:hover {
				cursor: pointer;
			}
			&_dropdown {
				position: relative;
				&:hover {
					transition: all 0.3s ease;
					border-color: transparent;
					color: $black;
					background-color: transparent;
					.dropdown {
						transform: none;
						visibility: visible;
					}
				}
			}
			&_underline {
				border-bottom: 1px solid $white;
				width: fit-content;
				&:hover {
					color: $white;
					background-color: $black;
					cursor: default;
				}
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
	.dropdown {
		padding: 5rem 3rem 2rem 3rem;
		width: fit-content;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		background-color: $grey;
		border: 2px solid $black;
		border-radius: 2rem;
		position: absolute;
		top: -1rem;
		left: -1rem;
		right: 0;
		transform: translateY(-200%);
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: -1;
		&:hover {
			transform: none;
		}
		@media (max-width: 1650px) {
			padding: 5rem 2rem 2rem 2rem;
			left: 0rem;
		}
		@media (max-width: 1400px) {
			padding: 5rem 1.5rem 2rem 1.5rem;
			left: -0.5rem;
		}
		&__link {
			color: $black;
			padding: 0.5rem;
			transition: all 0.3s ease;
			&:hover {
				background-color: $black;
				color: $white;
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
			max-height: 1000px;
			width: 100%;
			background: linear-gradient(to bottom, $grey 89%, $black 11%);
			@media (max-width: 550px) {
				position: relative;
				left: 45rem;
				width: 1283px;
			}
			@media (max-width: 450px) {
				left: 40rem;
			}
		}
	}
</style>
