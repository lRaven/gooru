<template>
	<div class="the-header" id="header" ref="header">
		<div class="the-header__container center-wide">
			<div class="the-header__col">
				<router-link
					to="/"
					class="the-header__logo"
					@click="scrollToId('#header')"
				>
					GOORU
					<span class="the-header__logo-secondary">PARSER</span>
				</router-link>
			</div>

			<div class="the-header__col">
				<nav class="the-header__nav">
					<ul class="the-header__links">
						<li
							class="the-header__link"
							@click="scrollToId('#rates')"
						>
							Тарифы
						</li>
						<li
							class="the-header__link"
							@click="scrollToId('#how-it-works')"
						>
							Как это работает
						</li>
						<li
							class="the-header__link"
							@click="scrollToId('#about')"
						>
							О компании
						</li>
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
	import { scroll } from "@/js/scrollToLink";

	export default {
		name: "TheHeader",
		components: {
			rButton,
		},
		watch: {
			scrollTop() {
				if (this.scrollTop <= this.headerHeight)
					this.resetPaintHeaderWhenPageScrolled();
				else this.paintHeaderWhenPageScrolled();
			},
		},
		data: () => ({ scrollTop: document.documentElement.scrollTop }),
		computed: {
			headerHeight() {
				return this.$refs.header.clientHeight;
			},
		},
		methods: {
			paintHeaderWhenPageScrolled() {
				this.$refs.header.classList.add("bg");
			},
			resetPaintHeaderWhenPageScrolled() {
				this.$refs.header.classList.remove("bg");
			},
			scrollToId(id) {
				scroll(id);
			},
		},
		mounted() {
			window.addEventListener("scroll", () => {
				this.scrollTop = document.documentElement.scrollTop;
			});
		},
	};
</script>

<style lang="scss" scoped>
	.the-header {
		user-select: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 4rem 1.5rem;
		z-index: 3;
		transition: all 0.2s ease;
		&.bg {
			background-color: #fff;
			box-shadow: 0 0 1rem 0 var(--gray);
			padding: 2rem 1.5rem;
			transition: all 0.5s ease;
		}

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
			.r-button {
				padding: 1.2rem 3rem;
			}
		}
	}
</style>
