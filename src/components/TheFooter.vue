<template>
	<footer class="the-footer">
		<div class="the-footer__container center__wide">
			<div class="the-footer__col">
				<div class="the-footer__company">
					<img
						src="/img/icon/logo.png"
						alt="logo"
						class="the-footer__company-logo"
					/>
					<p class="the-footer__company-name">КОМПАС ПРО</p>
					<p class="the-footer__company-slogan">
						С НАМИ В ПРАВИЛЬНОМ НАПРАВЛЕНИИ
					</p>
				</div>

				<div class="the-footer__partners">
					<img
						src="/img/icon/huawei-business.png"
						alt="HUAWEI buseness-partner"
					/>
					<img
						src="/img/icon/ibm-business.png"
						alt="IBM buseness-partner"
					/>
				</div>
			</div>

			<div class="the-footer__col">
				<ul class="the-footer__list">
					<li class="the-footer__list-item">
						политика конфиденциальности
					</li>
					<li class="the-footer__list-item">
						<a
							href="docs/Оферта ГУРУ.pdf"
							target="_blank"
							class="the-footer__list-item-link"
						>
							договор оферты
						</a>
					</li>
					<li class="the-footer__list-item the-footer__copyright">
						Создание и продвижение сайтов © 2015-{{ current_year }}
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "TheFooter",
		computed: { current_year: () => new Date().getFullYear() },
	};
</script>

<style lang="scss" scoped>
	.the-footer {
		background-color: #ededed;
		padding: 3rem 4rem;
		text-transform: uppercase;
		&__container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
		}

		&__col {
			display: flex;
			align-items: center;
			&:first-child {
				gap: 15rem;
			}
		}

		&__company {
			display: grid;
			grid-template-columns: max-content 1fr;
			grid-gap: 0.5rem 1rem;
			&-logo {
				grid-area: 1/1/3/1;
				width: 6rem;
				height: 6rem;
			}
			&-name {
				font-weight: 700;
				align-self: flex-end;
				font-size: 1.4rem;
			}
			&-slogan {
				font-size: 1rem;
				width: max-content;
			}
		}

		&__partners {
			display: flex;
			align-items: center;
			gap: 2rem;
		}

		&__list {
			display: flex;
			gap: 6rem;
			&-item {
				cursor: pointer;
				width: max-content;
				&-link {
					color: currentColor;
				}
			}
		}
		&__copyright {
			cursor: inherit;
		}
	}

	@media (max-width: 1440px) {
		.the-footer {
			&__container {
				gap: 3rem;
			}
			&__col {
				&:first-child {
					gap: 5rem;
				}
			}
			&__list {
				gap: 2rem;
			}
		}
	}
	@media (max-width: 1240px) {
		.the-footer {
			&__container {
				flex-direction: column;
			}
			&__col {
				width: 100%;

				&:first-child {
					justify-content: space-between;
				}
			}

			&__list {
				width: 100%;
				justify-content: space-between;
			}
		}
	}
	@media (max-width: 767px) {
		.the-footer {
			padding: 3rem 1.5rem;
		}
	}
	@media (max-width: 670px) {
		.the-footer {
			&__list {
				flex-wrap: wrap;
				gap: 1rem;
				&-item {
					text-align: center;
					width: 100%;
				}
			}
		}
	}
	@media (max-width: 540px) {
		.the-footer {
			&__col {
				&:first-child {
					gap: 2rem;
				}
			}

			&__company {
				&-logo {
					width: 4rem;
					height: 4rem;
				}
				&-name {
					font-size: 1rem;
				}
				&-slogan {
					font-size: 0.8rem;
				}
			}

			&__partners {
				flex-direction: column;
				gap: 0.8rem;
				img {
					max-width: 4rem;
				}
			}

			&__list {
				&-item {
					font-size: 0.8rem;
				}
			}
		}
	}
</style>
