<template>
	<footer class="footer">
		<div class="footer__company">
			<span class="footer__copyright">&copy;</span>
			<span class="footer__logo">compass pro</span>
		</div>
		<a class="footer__policy" href="#" target="__blank"
			>Политика в отношении обработки персональных данных</a
		>
		<nav class="footer__navigation">
			<a class="footer__navigation-link" href="#">СОЦ. СЕТИ.</a>
			<a class="footer__navigation-link" href="#">О НАС</a>
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
		&__company {
			display: flex;
			align-items: center;
			grid-column: 1/2;
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
		}
		&__navigation {
			display: flex;
			align-items: center;
			grid-column: 2/3;
			grid-row: 1/3;
			align-self: center;
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
			}
		}
    &__team-caption {
      font-size: 1.3rem;
			font-weight: 400;
			line-height: 1.8rem;
			color: rgba($color: $white, $alpha: 0.6);
			grid-column: 3/4;
      justify-self: end;
    }
	}
</style>
