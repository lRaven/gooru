<template>
	<footer class="footer">
		<div class="footer__company">
			<span class="footer__copyright">&copy;</span>
			<span class="footer__logo">compass pro</span>
		</div>
		<a class="footer__policy" href="/docs/Оферта ГУРУ.pdf" target="_blank"
			>Политика в отношении обработки персональных данных</a
		>
		<nav class="footer__navigation">
			<div
				class="footer__navigation-link footer__navigation-link_dropdown"
				href="#"
			>
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
					<li class="dropdown__item">
						<a
							class="dropdown__link"
							href="https://wa.me/+79375596195"
							target="_blank"
							>WHATSAPP</a
						>
					</li>
				</ul>
			</div>
			<a class="footer__navigation-link" href="#about">О НАС</a>
		</nav>
		<span class="footer__team-caption"
			>Дизайн разработан командой Compas Pro</span
		>
	</footer>
</template>

<script>
	export default {
		name: "TheFooter",
	};
</script>

<style lang="scss" scoped>
	.footer {
		display: grid;
		grid-gap: 1rem 0;
		padding: 10rem 10rem 3rem;
		width: 100%;
		background-color: $black;
		@media (max-width: 1670px) {
			padding: 10rem 8rem 3rem;
		}
		@media (max-width: 1490px) {
			padding: 8rem 6rem 3rem;
		}
		@media (max-width: 785px) {
			padding: 6rem 6rem 3rem;
			grid-gap: 0;
		}
		@media (max-width: 600px) {
			padding: 6rem 4rem 3rem;
		}
		@media (max-width: 450px) {
			padding: 4rem 2.5rem 2rem;
		}
		&__company {
			display: flex;
			align-items: center;
			grid-column: 1/2;
			@media (max-width: 785px) {
				margin: 0 0 1rem 0;
			}
		}
		&__copyright {
			font-family: Montserrat;
			font-size: 1.4rem;
			line-height: 1.7rem;
			letter-spacing: 0.02em;
			color: rgba($color: $white, $alpha: 0.5);
			margin: 0 1rem 0 0;
		}
		&__logo {
			font-family: Montserrat;
			font-size: 1.4rem;
			line-height: 1.7rem;
			letter-spacing: 0.02em;
			color: rgba($color: $white, $alpha: 0.5);
			text-transform: uppercase;
		}
		&__policy {
			font-size: 1.3rem;
			font-weight: 400;
			line-height: 1.8rem;
			text-decoration: underline;
			color: rgba($color: $white, $alpha: 0.5);
			grid-column: 1/2;
			@media (max-width: 785px) {
				margin: 0 0 4rem 0;
			}
			@media (max-width: 450px) {
				max-width: 22rem;
				width: 100%;
			}
		}
		&__navigation {
			display: flex;
			align-items: center;
			grid-column: 2/3;
			grid-row: 1/3;
			align-self: center;
			@media (max-width: 1023px) {
				display: none;
			}
			&-link {
				font-size: 2rem;
				font-weight: 400;
				line-height: 2.8rem;
				padding: 0.5rem 2rem;
				margin: 0 4rem 0 0;
				border: 2px solid rgba($color: $white, $alpha: 0.5);
				border-radius: 12.4rem;
				color: rgba($color: $white, $alpha: 0.5);
				&:hover {
					cursor: pointer;
				}
				&_dropdown {
					position: relative;
					&:hover {
						transition: all 0.3s ease;
						border-color: transparent;
						.dropdown {
							transform: none;
						}
					}
				}
			}
		}
		&__team-caption {
			font-size: 1.3rem;
			font-weight: 400;
			line-height: 1.8rem;
			color: rgba($color: $white, $alpha: 0.6);
			grid-column: 3/4;
			justify-self: end;
			@media (max-width: 785px) {
				grid-column: 1/2;
				justify-self: start;
			}
		}
	}
	.dropdown {
		padding: 2rem 3rem 7rem 3rem;
		width: fit-content;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border: 2px solid rgba($color: $white, $alpha: 0.5);
		border-radius: 2rem;
		position: absolute;
		top: -9.5rem;
		left: -2rem;
		right: 0;
		transform: translateY(200%);
		transition: all 0.3s ease;
		&:hover {
			z-index: 2;
			transform: none;
		}
		@media (max-width: 1650px) {
			padding: 2rem 2rem 6rem 2rem;
			left: -0.5rem;
		}
		@media (max-width: 1400px) {
			padding: 2rem 1.5rem 6rem 1.5rem;
			left: 0rem;
		}
		&__link {
			color: $white;
			padding: 0.5rem;
			transition: all 0.3s ease;
			&:hover {
				background-color: $white;
				color: $black;
			}
		}
	}
</style>
