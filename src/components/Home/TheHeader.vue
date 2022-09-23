<template>
	<header class="header">
		<p class="header__logo">
			compass<span class="header__logo header__logo_gooru">gooru</span>
		</p>
		<nav class="navigation">
			<a class="navigation__link" href="#">СОЦ. СЕТИ.</a>
			<a class="navigation__link" href="#">О НАС</a>
			<a class="navigation__link" href="#">ВОЙТИ</a>
			<a class="navigation__link navigation__link_try-it" href="#"
				>ПОПРОБОВАТЬ БЕСПЛАТНО
				<ellipse-with-arrow-icon class="navigation__link-icon" />
			</a>
		</nav>
	</header>
</template>

<script>
	import EllipseWithArrowIcon from "@/assets/icons/EllipseWithArrowIcon.vue";
	export default {
		name: "TheHeader",
		components: {
			EllipseWithArrowIcon,
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4.7rem 10rem 3.7rem 10rem;

		&__logo {
			font-family: Montserrat;
			font-size: 2.4rem;
			font-weight: 700;
			line-height: 2.9rem;
			letter-spacing: 0.02em;
			text-transform: uppercase;

			&_gooru {
				font-weight: 300;
				color: $blue;
				margin: 0 0 0 1rem;
			}
			&:hover {
				cursor: pointer;
			}
		}
		.navigation {
			display: flex;
			align-items: center;
			&__link {
				font-size: 2rem;
				font-weight: 400;
				line-height: 2.8rem;
				padding: 0.5rem 2rem;
				margin: 0 4rem 0 0;
				border: 2px solid $black;
				border-radius: 12.4rem;
				color: $black;

				&:last-child {
					display: flex;
					align-items: center;
					padding: 0;
					border: none;
					margin: 0 0 0 35.6rem;
				}
				&:hover {
					cursor: pointer;
				}
			}

			&__link-icon {
				margin: 0 0 0 3rem;
			}
		}
	}
</style>
