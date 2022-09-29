<template>
	<header class="header">
		<a class="header__logo" href="https://compas-goo.ru/" target="_blank">
			compass<span class="header__logo header__logo_gooru">gooru</span>
		</a>
		<slot></slot>
	</header>
</template>

<script>
	export default {
		name: "TheHeader",
	};
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4.7rem 10rem 3.7rem 10rem;
		position: relative;

		@media (max-width: 1650px) {
			padding: 4.7rem 8rem 3.7rem 8rem;
		}
		@media (max-width: 1400px) {
			padding: 4.7rem 6rem 3.7rem 6rem;
		}
		@media (max-width: 600px) {
			padding: 3.7rem 4rem 3.7rem 4rem;
		}
		@media (max-width: 450px) {
			padding: 3rem 3rem 10rem 3rem;
		}

		&__logo {
			font-family: Montserrat;
			font-size: 2.4rem;
			font-weight: 700;
			line-height: 2.9rem;
			letter-spacing: 0.02em;
			text-transform: uppercase;
			color: $black;
			@media (max-width: 1100px) {
				font-size: 2.3rem;
				line-height: 2.8rem;
			}
			@media (max-width: 450px) {
				font-size: 1.6rem;
				line-height: 2.6rem;
			}

			&_gooru {
				font-weight: 300;
				color: $blue;
				margin: 0 0 0 1rem;
				@media (max-width: 450px) {
					margin: 0 0 0 0.5rem;
				}
			}
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
