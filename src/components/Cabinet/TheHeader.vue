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
							? closeProfile()
							: openProfile()
					"
				>
					<img
						:src="avatar"
						class="the-header__avatar"
						v-if="avatar"
						alt="avatar"
					/>
					<img
						src="img/icon/cabinet/no-avatar.svg"
						class="the-header__avatar"
						alt="avatar"
						v-else
					/>
					<p class="the-header__username">
						{{ username }}
					</p>
					<div class="the-header__account-button">
						<img
							src="img/icon/cabinet/arrow.svg"
							alt=""
							class="the-header__account-arrow"
							ref="arrow"
						/>
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
	import { mapState } from "vuex";

	export default {
		name: "TheHeader",
		components: { rButton },
		computed: {
			...mapState({
				username: (state) => state.cabinet.user.username,

				//TODO: получить аватарку с бека, на данный момент по этому пути 404
				avatar: (state) => state.cabinet.user.avatar,
			}),
		},
		data: () => ({ isProfileOpened: false }),
		methods: {
			openProfile() {
				this.isProfileOpened = true;
				this.$refs.arrow.classList.add("open");
			},
			closeProfile() {
				this.isProfileOpened = false;
				this.$refs.arrow.classList.remove("open");
			},
		},
		directives: { ClickAway: directive },
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 23.5rem 1fr;
		gap: 4rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		box-shadow: $shadow;
		background-color: $white;
		z-index: 3;
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
			color: $primary;
			font-weight: 700;
			&-second {
				color: $secondary;
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
			&-arrow {
				transition: all 0.2s ease;
				&.open {
					transform: rotate(180deg);
				}
			}
			&-content {
				position: absolute;
				left: 0;
				right: 0;
				top: calc(100% + 1rem);
				box-shadow: $shadow;
				border-radius: 0.8rem;
				background-color: $white;
				padding: 1rem;
			}
		}
		&__avatar {
			height: 4.4rem;
			width: 4.4rem;
			border-radius: 50%;
			object-fit: cover;
		}
	}
</style>
