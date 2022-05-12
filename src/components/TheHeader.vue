<template>
	<div class="the-header" id="header">
		<div class="the-header__container center-wide">
			<div class="the-header__col">
				<router-link to="/" class="the-header__logo">
					COMPASS
					<span class="the-header__logo-secondary">PARSER</span>
				</router-link>
			</div>

			<div class="the-header__col">
				<nav class="the-header__nav">
					<ul class="the-header__links">
						<li class="the-header__link">Тарифы</li>
						<li class="the-header__link">Как это работает</li>
						<li class="the-header__link">О компании</li>
					</ul>
				</nav>

				<div class="the-header__buttons">
					<r-button color="transparent" text="Войти"></r-button>
					<r-button text="Регистрация"></r-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import rButton from "@/components/r-button";

	export default {
		name: "TheHeader",
		components: {
			rButton,
		},
	};
</script>

<style lang="scss" scoped>
	.the-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 4rem 1.5rem;
		z-index: 2;

		&__container {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__col {
			&:last-child {
				display: flex;
				align-items: center;
				gap: 13rem;
			}
		}

		&__logo {
			color: var(--primary);
			font-weight: 700;
			font-size: 2.4rem;
			text-transform: uppercase;

			&-secondary {
				color: var(--secondary);
				font-weight: 300;
			}
		}

		&__links {
			display: flex;
			align-items: center;
		}
		&__link {
			position: relative;
			cursor: pointer;
			font-size: 1.6rem;
			padding: 1.2rem 3rem;

			&::after {
				content: "";
				position: absolute;
				left: 3rem;
				bottom: 0.5rem;
				width: 0;
				height: 0.2rem;
				background-color: var(--black);
				transition: all 0.2s ease;
			}
			&:hover {
				&::after {
					width: calc(100% - 6rem);
					transition: all 0.3s ease;
				}
			}
		}

		&__buttons {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
	}
</style>
