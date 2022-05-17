<template>
	<div class="the-footer">
		<div class="the-footer__container center-wide">
			<div class="the-footer__col">
				<div class="the-footer__company">
					<img
						src="img/icon/logo.png"
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
						src="img/icon/huawei-business.png"
						alt="HUAWEI buseness-partner"
					/>
					<img
						src="img/icon/ibm-business.png"
						alt="IBM buseness-partner"
					/>
				</div>
			</div>

			<div class="the-footer__col">
				<ul class="the-footer__list">
					<li class="the-footer__list-item">
						политика конфиденциальности
					</li>
					<li class="the-footer__list-item">договор оферты</li>
					<li class="the-footer__list-item the-footer__copyright">
						Создание и продвижение сайтов © 2015-{{ current_year }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TheFooter",
		computed: {
			current_year: () => new Date().getFullYear(),
		},
	};
</script>

<style lang="scss" scoped>
	.the-footer {
		user-select: none;
		background-color: #ededed;
		padding: 3rem 1.5rem;
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
			grid-template-columns: 6rem 1fr;
			grid-gap: 0.5rem 1rem;
			&-logo {
				grid-area: 1/1/3/1;
			}
			&-name {
				font-weight: 700;
				align-self: flex-end;
				font-size: 1.4rem;
			}
			&-slogan {
				font-size: 1rem;
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
			}
		}
		&__copyright {
			cursor: inherit;
		}
	}
</style>
