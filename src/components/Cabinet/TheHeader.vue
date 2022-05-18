<template>
	<header class="the-header">
		<div class="the-header__col">
			<router-link to="/" class="the-header__name">
				COMPASS
				<span class="the-header__name-second">PARSING</span>
			</router-link>
		</div>

		<div class="the-header__col">
			<r-button text="+ Новый парсинг"></r-button>

			<div class="the-header__account" v-click-away="closeProfile">
				<div
					class="the-header__account-visible"
					@click="
						isProfileOpened === true
							? (isProfileOpened = false)
							: (isProfileOpened = true)
					"
				>
					<img :src="avatar" class="the-header__avatar" />
					<p class="the-header__username">{{ username }}</p>
					<div class="the-header__account-button">
						<img src="img/icon/cabinet/arrow.svg" alt="" />
					</div>
				</div>
				<transition>
					<div
						class="the-header__account-content"
						v-if="isProfileOpened === true"
					>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
						</ul>
					</div>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
	import rButton from "@/components/r-button";
	import { directive } from "vue3-click-away";

	export default {
		name: "TheHeader",
		components: {
			rButton,
		},
		props: {
			avatar: {
				value: String,
				default: "img/icon/cabinet/no-avatar.svg",
			},
			username: {
				value: String,
				default: "UserUser1234",
			},
		},
		data: () => ({
			isProfileOpened: false,
		}),
		methods: {
			closeProfile() {
				this.isProfileOpened = false;
			},
		},
		directives: { ClickAway: directive },
	};
</script>

<style lang="scss" scoped>
	.the-header {
		user-select: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 30rem 1fr;
		padding-top: 1rem;
		padding-bottom: 1rem;
		box-shadow: 0 0.4rem 1.4rem rgba(0, 0, 0, 0.09);
		background-color: var(--white);
		&__col {
			display: flex;
			align-items: center;
			&:last-child {
				justify-content: space-between;
			}
		}

		&__name {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			font-size: 2rem;
			color: var(--primary);
			font-weight: 700;
			&-second {
				color: var(--secondary);
				font-weight: 300;
			}
		}

		&__account {
			position: relative;
			&-visible {
				padding: 0 1rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 2rem;
				height: 100%;
			}
			&-content {
				position: absolute;
				left: 0;
				right: 0;
				top: calc(100% + 1rem);
				box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
				border-radius: 0.8rem;
				background-color: var(--white);
				padding: 1rem;
			}
		}
	}
</style>
