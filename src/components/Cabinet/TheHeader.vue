<template>
	<header class="the-header">
		<div class="the-header__col">
			<router-link to="/" class="the-header__name">
				COMPASS
				<span class="the-header__name-second">PARSING</span>
			</router-link>
		</div>

		<div class="the-header__col" v-if="!isClear">
			<r-button
				text="+ Новый парсинг"
				@click="this.$router.push({ name: 'new_parser' })"
			></r-button>

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
						:src="avatar || 'img/icon/cabinet/no-avatar.svg'"
						class="the-header__avatar"
						alt="avatar"
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
					<ul
						class="the-header__account-menu"
						v-if="isProfileOpened === true"
					>
						<li
							class="the-header__account-menu-item"
							@click="
								this.$router.push({ name: 'profile' });
								closeProfile();
							"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="the-header__account-menu-item-icon"
							>
								<path
									d="M18.6173 2.30389C18.2269 2.18459 17.8293 2.09053 17.4268 2.02229L16.9468 1.92627H15.75H15.6668L15.11 2.03506C14.6749 2.10434 14.2466 2.21141 13.83 2.35506C12.5085 2.79139 11.3442 3.6063 10.4818 4.69857C9.61936 5.79084 9.09675 7.11238 8.97885 8.49908C8.8195 9.72581 8.98442 10.9729 9.45717 12.116C9.92992 13.2591 10.694 14.2584 11.6732 15.0143L11.5005 15.0783C11.1869 15.2063 10.8605 15.3215 10.5789 15.4687C8.5788 16.3692 6.82108 17.7316 5.45032 19.444C4.07955 21.1563 3.1349 23.1696 2.69405 25.3183C2.58034 25.7651 2.55685 26.2302 2.62499 26.6862C2.69312 27.1423 2.8515 27.5802 3.09085 27.9743C3.36269 28.3914 3.72813 28.7394 4.15811 28.9905C4.58809 29.2416 5.07073 29.3889 5.56764 29.4207H16.7932C16.9627 29.4045 17.1269 29.3527 17.2749 29.2687C17.423 29.1848 17.5517 29.0705 17.6526 28.9333C17.7535 28.7962 17.8243 28.6394 17.8604 28.473C17.8965 28.3066 17.8971 28.1345 17.8621 27.9679C17.8004 27.6607 17.6282 27.3869 17.3782 27.1981C17.1281 27.0094 16.8175 26.919 16.5052 26.9439H6.06045C5.91172 26.949 5.76373 26.9206 5.62747 26.8608C5.4912 26.801 5.37013 26.7112 5.27325 26.5983C5.18765 26.4895 5.12766 26.3628 5.09774 26.2276C5.06782 26.0924 5.06876 25.9522 5.10045 25.8175C5.66032 23.2557 7.07187 20.9593 9.10479 19.3029C11.1377 17.6466 13.672 16.7282 16.294 16.6975C16.6949 16.6968 17.095 16.6646 17.4908 16.6015C19.1455 16.3387 20.6607 15.5183 21.7851 14.2763C22.9096 13.0343 23.5758 11.4452 23.6732 9.77268C23.7783 8.14328 23.3386 6.52517 22.4233 5.17307C21.508 3.82096 20.1691 2.81163 18.6173 2.30389ZM21.1773 9.31189C21.1758 10.6051 20.6627 11.8452 19.75 12.7615C19.3149 13.2186 18.7918 13.583 18.2122 13.8326C17.6325 14.0823 17.0084 14.2121 16.3773 14.2143C15.7249 14.2271 15.0765 14.1095 14.4702 13.8684C13.8639 13.6274 13.3118 13.2677 12.8462 12.8105C12.3807 12.3533 12.0111 11.8078 11.7591 11.206C11.5072 10.6041 11.3779 9.95798 11.3789 9.30549C11.3805 8.00581 11.8976 6.75985 12.8166 5.84084C13.7356 4.92183 14.9816 4.40476 16.2813 4.40307C16.9275 4.40054 17.5679 4.52563 18.1657 4.77119C18.7635 5.01675 19.3069 5.37797 19.7647 5.83404C20.2226 6.29012 20.5859 6.83211 20.8338 7.42893C21.0816 8.02574 21.2092 8.66564 21.2092 9.31189H21.1773Z"
									fill="#323232"
								/>
								<path
									d="M28.7362 26.9375H20.8578C20.1721 26.9375 19.6162 27.492 19.6162 28.1759C19.6162 28.8599 20.1721 29.4143 20.8578 29.4143H28.7362C29.4219 29.4143 29.9778 28.8599 29.9778 28.1759C29.9778 27.492 29.4219 26.9375 28.7362 26.9375Z"
									fill="#323232"
								/>
								<path
									d="M28.7362 22.7007H20.8578C20.1721 22.7007 19.6162 23.2551 19.6162 23.9391C19.6162 24.623 20.1721 25.1775 20.8578 25.1775H28.7362C29.4219 25.1775 29.9778 24.623 29.9778 23.9391C29.9778 23.2551 29.4219 22.7007 28.7362 22.7007Z"
									fill="#323232"
								/>
								<path
									d="M28.7362 18.4575H20.8578C20.1721 18.4575 19.6162 19.012 19.6162 19.6959C19.6162 20.3799 20.1721 20.9343 20.8578 20.9343H28.7362C29.4219 20.9343 29.9778 20.3799 29.9778 19.6959C29.9778 19.012 29.4219 18.4575 28.7362 18.4575Z"
									fill="#323232"
								/>
							</svg>

							<p
								class="the-header__account-menu-item-description"
							>
								Мой профиль
							</p>
						</li>

						<li
							class="the-header__account-menu-item"
							@click="
								logout();
								closeProfile();
							"
						>
							<svg
								width="30"
								height="29"
								viewBox="0 0 30 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="the-header__account-menu-item-icon"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M0.92 6.81182C0.92 3.39838 3.61077 0.560059 7.01411 0.560059H13.3846C16.789 0.560059 19.48 3.39815 19.48 6.81182V8.07061C19.48 8.77754 18.9069 9.35061 18.2 9.35061C17.4931 9.35061 16.92 8.77754 16.92 8.07061V6.81182C16.92 4.73429 15.2987 3.12006 13.3846 3.12006H7.01411C5.10155 3.12006 3.48 4.73406 3.48 6.81182V21.8283C3.48 23.9061 5.10155 25.5201 7.01411 25.5201H13.3976C15.3043 25.5201 16.92 23.9121 16.92 21.8431V20.5709C16.92 19.8639 17.4931 19.2909 18.2 19.2909C18.9069 19.2909 19.48 19.8639 19.48 20.5709V21.8431C19.48 25.2492 16.7938 28.0801 13.3976 28.0801H7.01411C3.61077 28.0801 0.92 25.2417 0.92 21.8283V6.81182ZM23.0164 9.93513C23.4941 9.41402 24.3038 9.37882 24.8249 9.8565L28.6649 13.3765C28.9294 13.6189 29.08 13.9613 29.08 14.3201C29.08 14.6789 28.9294 15.0212 28.6649 15.2636L24.8249 18.7836C24.3038 19.2613 23.4941 19.2261 23.0164 18.705C22.5388 18.1839 22.574 17.3742 23.0951 16.8965L24.5094 15.6001H11.8C11.0931 15.6001 10.52 15.027 10.52 14.3201C10.52 13.6131 11.0931 13.0401 11.8 13.0401H24.5094L23.0951 11.7436C22.574 11.2659 22.5388 10.4562 23.0164 9.93513Z"
									fill="#323232"
								/>
							</svg>

							<p
								class="the-header__account-menu-item-description"
							>
								Выйти
							</p>
						</li>
					</ul>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
	import rButton from "@/components/r-button";
	import { directive } from "vue3-click-away";
	import { mapState } from "vuex";
	import { logout } from "@/api/logout";

	export default {
		name: "TheHeader",
		components: { rButton },
		props: {
			isClear: {
				value: Boolean,
				default: false,
			},
		},
		computed: {
			...mapState({
				username: (state) => state.cabinet.user.username,

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
			logout,
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
		min-height: 8rem;
		z-index: 3;
		&__col {
			display: flex;
			align-items: center;
			&:last-child {
				justify-content: space-between;
				gap: 4rem;
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

			&-menu {
				position: absolute;
				width: max-content;
				right: 0;
				top: calc(100% + 0.5rem);
				box-shadow: $shadow;
				border-radius: 0.8rem;
				background-color: $white;
				border: 0.1rem solid rgba(0, 0, 0, 0.1);
				overflow: hidden;

				&-item {
					cursor: pointer;
					display: flex;
					align-items: center;
					gap: 1rem;

					&:first-child {
						padding: 2rem 7rem 1rem 2rem;
					}
					&:last-child {
						padding: 1rem 7rem 2rem 2rem;
					}
					&:hover {
						.the-header__account-menu-item {
							&-icon path {
								fill: $secondary;
							}
							&-description {
								color: $secondary;
							}
						}
					}

					&-icon {
						width: 3.2rem;
						min-width: 3.2rem;
						height: 3.2rem;
						path {
							transition: all 0.2s ease;
						}
					}
					&-description {
						font-size: 1.4rem;
						font-weight: 600;
						transition: all 0.2s ease;
					}
				}
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
