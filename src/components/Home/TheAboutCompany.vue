<template>
	<section class="the-about-company center" id="about">
		<div class="the-about-company__col">
			<h2 class="the-about-company__title">О компании</h2>
			<p class="the-about-company__description">
				КОМПАС-ПРО действует на рынке WEB-консалтинга с 2015 года.
			</p>
			<p class="the-about-company__description">
				Мы имеем собственную проектную деятельность с портфолио
				проектов.
			</p>

			<p class="the-about-company__name">
				общество с ограниченной ответственностью “Компас ПРО”
			</p>
			<p class="the-about-company__document">инн 3444258991</p>
			<p class="the-about-company__document">огрн 1163443065576</p>
			<r-link
				text="СВЯЗАТЬСЯ С НАМИ"
				way="https://telegram.im/@compas_gooru"
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
						/>
					</svg>
				</template>
			</r-link>
		</div>
		<div class="the-about-company__col">
			<img
				src="/img/about/about-img.png"
				alt=""
				class="the-about-company__image"
			/>
		</div>
	</section>
</template>

<script>
	export default { name: "TheAboutCompany" };
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-about-company {
		display: flex;
		padding: 10rem 4rem 6rem 4rem;
		align-items: center;
		justify-content: space-between;
		gap: 5rem;
		&__col {
			&:first-child {
				max-width: 69rem;
			}
			.r-link {
				margin-top: 8rem;
				max-width: max-content;
				&__icon path {
					transition: all 0.2s ease;
				}
				&:hover {
					.r-link__icon path {
						fill: $white;
						transition: all 0.3s ease;
					}
				}
			}
		}

		&__title {
			margin-bottom: 4rem;
		}
		&__description {
			line-height: 1.5;
		}
		&__name,
		&__document {
			font-size: 1.2rem;
			line-height: 1.6;
		}

		&__image {
			max-width: 60rem;
			width: 100%;
		}
	}

	@media (max-width: 1023px) {
		.the-about-company {
			padding: 8rem 4rem;
			&__title {
				margin-bottom: 2.4rem;
			}
			.r-link {
				margin-top: 4rem;
			}
		}
	}

	@media (max-width: 767px) {
		.the-about-company {
			padding: 8rem 1.5rem;
			flex-direction: column;
			align-items: flex-start;

			&__col {
				&:first-child {
					max-width: 100%;
					width: 100%;
				}
			}

			.r-link {
				max-width: 100%;
			}
			&__image {
				max-width: 40rem;
			}
		}
	}
</style>
