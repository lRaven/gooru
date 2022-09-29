<template>
	<section class="subscribe-invite">
		<div class="subscribe-invite__descriptions">
			<p class="subscribe-invite__text" v-for="(text, index) in texts" :key="index">
				{{ text }}
			</p>
		</div>
		<template v-if="documentWidth > 1375">
			<div class="subscribe-invite__pitch">
				<div class="subscribe-invite__company">
					<span class="subscribe-invite__logo">compass</span>
					<span class="subscribe-invite__logo">gooru</span>
					<div
						class="subscribe-invite__mark"
						:class="{
							'subscribe-invite__mark_blue':
								appContext === 'busines',
						}"
					></div>
				</div>

				<p class="subscribe-invite__pitch-point">Экономь свое время</p>
				<p class="subscribe-invite__pitch-point">
					Сфокусируйся на работе
				</p>
				<p class="subscribe-invite__pitch-point">
					Распределяй обязанности
				</p>
			</div>
			<div class="subscribe-invite__offer">
				<r-button class="subscribe-invite__free-button"
				@click="handleRedirectToGooru('registration')"
					>Бесплатный период</r-button
				>
				<r-button class="subscribe-invite__subscribe-button"
				@click="handleRedirectToGooru('#rates')"
					>ОФОРМИТЬ ПОДПИСКУ</r-button
				>
				<p
					class="subscribe-invite__sale"
					:class="{
						'subscribe-invite__sale_blue': appContext === 'busines',
					}"
				>
					10%
				</p>
			</div>
		</template>
		<template v-else>
			<div class="subscribe-invite__pitch">
				<div class="subscribe-invite__company">
					<span class="subscribe-invite__logo">compass</span>
					<span class="subscribe-invite__logo">gooru</span>
					<div
						class="subscribe-invite__mark"
						:class="{
							'subscribe-invite__mark_blue':
								appContext === 'busines',
						}"
					></div>
				</div>

				<p class="subscribe-invite__pitch-point">Экономь свое время</p>
				<p class="subscribe-invite__pitch-point">
					Сфокусируйся на работе
				</p>
				<p class="subscribe-invite__pitch-point">
					Распределяй обязанности
				</p>
				<div class="subscribe-invite__offer">
					<r-button class="subscribe-invite__free-button"
					@click="handleRedirectToGooru('registration')"
						>Бесплатный период</r-button
					>
					<r-button class="subscribe-invite__subscribe-button"
					@click="handleRedirectToGooru('#rates')"
						>ОФОРМИТЬ ПОДПИСКУ</r-button
					>
					<p
						class="subscribe-invite__sale"
						:class="{
							'subscribe-invite__sale_blue':
								appContext === 'busines',
						}"
					>
						10%
					</p>
				</div>
			</div>
		</template>
	</section>
</template>

<script>
	import texts from "@/assets/textData.json";

	export default {
		name: "TheSubscribeInvite",
		inject: ["documentWidth", "appContext", "gooruFrontendUrl"],
		computed: {
			texts() {
				const currentContext = this.appContext;
				return texts[currentContext].subscribeInvite;
			}
		},
		methods: {
			handleRedirectToGooru(targetEndPoint) {
				window.open(this.gooruFrontendUrl+`/${targetEndPoint}`, 'blank');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.subscribe-invite {
		padding: 20rem 10rem 0 10rem;
		background-color: $black;
		@media (max-width: 1670px) {
			padding: 18rem 8rem 0 8rem;
		}
		@media (max-width: 1490px) {
			padding: 16rem 6rem 0 6rem;
		}
		@media (max-width: 1375px) {
			display: grid;
			padding: 16rem 6rem 0 6rem;
		}
		@media (max-width: 600px) {
			padding: 10rem 4rem 0 4rem;
		}
		@media (max-width: 450px) {
			padding: 8rem 2.5rem 0 2.5rem;
		}
		&__descriptions {
			display: flex;
			flex-wrap: wrap;
			gap: 2rem 20rem;
			margin: 0 0 10.4rem 0;
			
			@media (max-width: 1375px) {
				grid-column: 1/3;
				margin: 0 0 8.4rem 0;
			}
			@media (max-width: 600px) {
				flex-direction: column;
			}
			@media (max-width: 450px) {
				margin: 0 0 6.4rem 0;
			}
		}
		&__text {
			font-size: 2.4rem;
			line-height: 3.4rem;
			max-width: 33.6rem;
			width: 100%;
			color: $white;
			@media (max-width: 1600px) {
				min-width: 50rem;
			}
			@media (max-width: 1100px) {
				min-width: 100%;
			}
			@media (max-width: 450px) {
				font-size: 2.2rem;
				line-height: 3.2rem;
			}
		}
		&__pitch {
			display: flex;
			align-items: center;
			margin: 0 0 5rem 0;
			@media (max-width: 1375px) {
				display: grid;
				justify-content: initial;
				grid-gap: 2rem 0;
				grid-column: 1/3;
				padding: 0 0 5rem 0;
				border-bottom: 2px solid $white;
				margin: 0;
			}
			@media (max-width: 900px) {
				justify-items: center;
			}
			@media (max-width: 450px) {
				padding: 0 0 8rem 0;
			}
		}
		&__company {
			display: flex;
			align-items: center;
			@media (max-width: 900px) {
				justify-self: start;
			}
			@media (max-width: 450px) {
				justify-self: center;
			}
		}
		&__logo {
			font-family: Montserrat;
			font-size: 2.4rem;
			font-weight: 700;
			line-height: 2.9rem;
			letter-spacing: 0.02em;
			text-transform: uppercase;
			color: $white;
			margin: 0 2rem 0 0;

			&:first-child {
				margin: 0 1rem 0 0;
			}
		}
		&__mark {
			width: 1.5rem;
			height: 1.5rem;
			background-color: $red;
			border-radius: 50%;
			margin: 0 30.8rem 0 0;
			@media (max-width: 1670px) {
				margin: 0 15rem 0 0;
			}
			@media (max-width: 1490px) {
				margin: 0 10rem 0 0;
			}
			@media (max-width: 1375px) {
				margin: 0 3rem 0 0;
			}
			@media (max-width: 450px) {
				margin: 0;
			}
			&_blue {
				background-color: $blue;
			}
		}
		&__pitch-point {
			font-size: 2rem;
			font-weight: 400;
			line-height: 2.8rem;
			padding: 0.5rem 2rem;
			color: $white;
			border: 1px solid $white;
			border-radius: 12.4rem;
			margin: 0 2rem 0 0;
			@media (max-width: 1375px) {
				grid-column: 1/2;
				justify-self: start;
				text-align: center;
				margin: 0;
			}
			@media (max-width: 450px) {
				justify-self: center;
			}
			@media (max-width: 390px) {
				font-size: 1.7rem;
				line-height: 2.5rem;
			}

			&:last-child {
				margin: 0;
			}
		}
		&__offer {
			display: flex;
			align-items: center;
			padding: 0 0 5rem 0;
			border-bottom: 2px solid $white;
			@media (max-width: 1375px) {
				display: grid;
				grid-column: 2/3;
				grid-row: 1/5;
				grid-gap: 2rem;
				border-bottom: none;
				padding: 0;
			}
			@media (max-width: 960px) {
				grid-gap: 2rem 1rem;
			}
			@media (max-width: 900px) {
				width: 100%;
				grid-template-columns: 1fr;
				grid-column: 1/2;
				grid-row: 5/5;
				margin: 3rem 0 0 0;
			}
			@media (max-width: 450px) {
				margin: 6rem 0 0 0;
			}
		}
		:deep(.r-button.subscribe-invite__free-button) {
			font-size: 3.6rem;
			line-height: 5rem;
			text-transform: uppercase;
			color: $white;
			padding: 2.5rem 0;
			width: 33%;
			margin: 0 2rem 0 0;
			@media (max-width: 1490px) {
				font-size: 3.2rem;
				line-height: 4.6rem;
			}
			@media (max-width: 1375px) {
				width: initial;
				padding: 2.5rem 3rem;
				margin: 0;
			}
			@media (max-width: 960px) {
				font-size: 3rem;
				line-height: 4.5rem;
				padding: 2.5rem 1rem;
			}
			@media (max-width: 530px) {
				font-size: 2.5rem;
				line-height: 4rem;
			}
			@media (max-width: 450px) {
				font-size: 2rem;
				line-height: 3.5rem;
			}
			@media (max-width: 390px) {
				font-size: 1.9rem;
				line-height: 3rem;
				padding: 2.5rem 2rem;
			}
		}
		:deep(.r-button.subscribe-invite__subscribe-button) {
			font-size: 3.6rem;
			line-height: 5rem;
			text-transform: uppercase;
			color: $black;
			padding: 2.5rem 0;
			background-color: $white;
			width: 51%;
			margin: 0 2rem 0 0;
			@media (max-width: 1490px) {
				font-size: 3.2rem;
				line-height: 4.6rem;
			}
			@media (max-width: 1375px) {
				font-size: 3rem;
				line-height: 4.5rem;
				padding: 2.5rem 3rem;
				width: initial;
				grid-row: 2/3;
				grid-column: 1/3;
				margin: 0;
			}
			@media (max-width: 650px) {
				grid-row: 1/2;
			}
			@media (max-width: 530px) {
				font-size: 2.5rem;
				line-height: 4rem;
			}
			@media (max-width: 450px) {
				font-size: 2rem;
				line-height: 3.5rem;
			}
			@media (max-width: 390px) {
				font-size: 1.9rem;
				line-height: 3rem;
				padding: 2.5rem 2rem;
			}
		}
		&__sale {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2.4rem;
			line-height: 3.4rem;
			color: $white;
			width: 10rem;
			height: 10rem;
			background-color: $red;
			border-radius: 50%;
			@media (max-width: 1375px) {
				grid-column: 2/3;
			}
			@media (max-width: 650px) {
				grid-column: 1/2;
				justify-self: center;
			}
			&_blue {
				background-color: $blue;
			}
		}
	}
</style>
