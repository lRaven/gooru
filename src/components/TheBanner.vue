<template>
	<section class="the-banner">
		<div class="the-banner__container center">
			<!-- //*decorative -->
			<r-plus-box
				color="var(--primary)"
				class="r-plus-box__corner"
			></r-plus-box>
			<r-plus-box
				color="var(--primary)"
				:isFullSquare="true"
				class="r-plus-box__full-first"
			></r-plus-box>
			<r-plus-box
				color="var(--primary)"
				:isFullSquare="true"
				class="r-plus-box__full-second"
			></r-plus-box>
			<r-gradient
				size="100rem"
				color="radial-gradient(35.39% 35.39% at 50% 50%, #69C5F9 0%, rgba(255, 255, 255, 0) 100%)"
				class="r-gradient__big"
			></r-gradient>
			<r-gradient
				size="60rem"
				color="radial-gradient(35.39% 35.39% at 50% 50%, #69C5F9 0%, rgba(255, 255, 255, 0) 100%)"
				class="r-gradient__normal"
			></r-gradient>
			<!-- //* -->

			<div class="the-banner__content">
				<h1 class="the-banner__title">
					<span class="the-banner__title-bold">Поиск</span>
					<br />
					и <span class="the-banner__title-bold">систематизация</span
					><br />
					информации
				</h1>
				<h3 class="the-banner__subtitle">
					с использованием алгоритмов<br />
					искусственного интеллекта
				</h3>
				<div class="the-banner__actions">
					<r-button text="ОТПРАВИТЬ ЗАПРОС"></r-button>
					<r-link
						text="СВЯЗАТЬСЯ С НАМИ"
						way="https://telegram.im/@compass_pro"
					>
						<template v-slot:icon>
							<svg
								width="23"
								height="20"
								viewBox="0 0 23 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="r-link__icon"
							>
								<path
									d="M21.3205 0.221581L0.890526 8.28644C0.890526 8.28644 -0.0757566 8.62199 0.004767 9.23524C0.0852906 9.84849 0.86752 10.1262 0.86752 10.1262L6.00952 11.8618L18.3526 3.98209C18.3526 3.98209 19.0658 3.5424 19.0428 3.98209C19.0428 3.98209 19.1694 4.06309 18.7898 4.42178C18.3987 4.78048 9.08092 13.204 9.08092 13.204L9.05792 13.2272L9.04641 13.2966L8.41373 18.9547C8.70131 19.082 8.95439 18.8853 8.95439 18.8853L12.2789 15.8422L17.4554 19.8341C18.8588 20.4474 19.3649 19.163 19.3649 19.163L23 0.707555C23 -0.518951 21.3205 0.221581 21.3205 0.221581Z"
									fill="#5960C7"
									class="r-link__icon-path"
								/>
							</svg>
						</template>
					</r-link>
				</div>
			</div>
			<r-goo-animated />
		</div>
	</section>
</template>

<script>
	import rGradient from "@/components/Banner/r-gradient";
	import rPlusBox from "@/components/r-plus-box";
	import rGooAnimated from "@/components/Banner/r-goo-animated";
	import rButton from "@/components/r-button";
	import rLink from "@/components/r-link";

	export default {
		name: "TheBanner",
		components: {
			rGradient,
			rPlusBox,
			rGooAnimated,
			rButton,
			rLink,
		},
	};
</script>

<style lang="scss" scoped>
	.the-banner {
		display: flex;
		background-color: #f2f9fa;
		min-height: 100vh;
		overflow: hidden;

		&__container {
			display: flex;
			align-items: center;
			padding: 12.3rem 0;
			position: relative;
		}

		&__content {
			height: fit-content;
		}

		&__title {
			font-weight: 300;
			background: linear-gradient(
				100.25deg,
				#592372 -11.24%,
				#338dd0 141.92%
			);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			text-fill-color: transparent;

			margin-bottom: 3rem;

			&-bold {
				font-weight: 700;
			}
		}
		&__subtitle {
			color: var(--dark);
			font-weight: 300;
			line-height: 1.2;
			margin-bottom: 8rem;
		}

		&__title,
		&__subtitle,
		&__actions {
			position: relative;
			z-index: 2;
			.r-button {
				padding: 2rem 4rem;
			}
			.r-link {
				&__icon-path {
					transition: all 0.2s ease;
				}
				&:hover {
					.r-link__icon-path {
						fill: var(--white);
						transition: all 0.3s ease;
					}
				}
				&__icon {
					width: 2rem;
					height: 2rem;
				}
			}
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 6rem;
		}

		//*decoration
		.r-plus-box,
		.r-gradient {
			position: absolute;
		}

		.r-gradient {
			&__big {
				left: 0;
				top: -30rem;
			}
			&__normal {
				left: 50%;
				bottom: -30rem;
			}
		}

		.r-plus-box {
			left: 50%;
			&__corner {
				left: -10rem;
				top: 12.3rem;
			}
			&__full {
				&-first {
					left: -22rem;
					top: 52rem;
				}
				&-second {
					top: 30%;
					left: 40%;
				}
			}
		}
	}
</style>
