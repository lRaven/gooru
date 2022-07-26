<template>
	<div class="user-card">
		<r-checkbox
			v-model="isSelected"
			:checked="isSelected"
			v-if="document_width > 767"
		></r-checkbox>

		<div
			class="user-card__content"
			:class="{ selected: isSelected }"
			v-if="document_width > 767"
		>
			<div
				class="user-card__content-col"
				:class="{ admin: user_me.role === 'AdminCRM' }"
			>
				<p class="user-card__col user-card__id" :title="'id' + user.id">
					id{{ user.id }}
				</p>

				<p class="user-card__col user-card__name" :title="user_name">
					{{ user_name }}
				</p>

				<p
					class="user-card__col user-card__status"
					:title="user.is_active ? 'Разблокирован' : 'Заблокирован'"
				>
					{{ user.is_active ? "Разблокирован" : "Заблокирован" }}
				</p>

				<p
					class="user-card__col user-card__parsers"
					:title="user_parsers.length"
				>
					{{ user_parsers.length }}
				</p>

				<p
					class="user-card__col user-card__manager"
					:title="user_manager !== null ? user_manager.username : '-'"
					v-if="user_me.role === 'AdminCRM'"
				>
					{{ user_manager !== null ? user_manager.username : "-" }}
				</p>
			</div>

			<r-button
				:text="document_width > 1150 ? 'Подробнее' : ''"
				:class="{ minimized: document_width <= 1150 }"
				color="bordered"
				title="Подробнее"
				@click="
					this.$router.push({
						path: `/cabinet/user/${user.id}`,
						query: { page: 1 },
					})
				"
			>
				<template v-slot:icon>
					<svg
						width="20"
						height="21"
						viewBox="0 0 20 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="r-button__icon"
						v-if="document_width <= 1150"
					>
						<circle cx="3" cy="12.0303" r="2" fill="currentColor" />
						<circle
							cx="10"
							cy="12.0303"
							r="2"
							fill="currentColor"
						/>
						<circle
							cx="17"
							cy="12.0303"
							r="2"
							fill="currentColor"
						/>
					</svg>
				</template>
			</r-button>
		</div>

		<div
			class="user-card__content"
			:class="{ selected: isSelected }"
			v-else
		>
			<div class="user-card__content-row">
				<r-checkbox
					v-model="isSelected"
					:checked="isSelected"
				></r-checkbox>

				<p class="user-card__col user-card__id" :title="'id' + user.id">
					id{{ user.id }}
				</p>
				<p class="user-card__col user-card__name" :title="user_name">
					{{ user_name }}
				</p>
			</div>

			<div
				class="user-card__content-row"
				:class="{ admin: user_me.role === 'AdminCRM' }"
			>
				<div class="user-card__content-col">
					<p class="user-card__col-description">Статус</p>
					<p
						class="user-card__col user-card__status"
						:title="
							user.is_active ? 'Разблокирован' : 'Заблокирован'
						"
					>
						{{ user.is_active ? "Разблокирован" : "Заблокирован" }}
					</p>
				</div>

				<div class="user-card__content-col">
					<p class="user-card__col-description">Кол-во парсеров</p>
					<p
						class="user-card__col user-card__parsers"
						:title="user_parsers.length"
					>
						{{ user_parsers.length }}
					</p>
				</div>

				<div
					class="user-card__content-col"
					v-if="user_me.role === 'AdminCRM'"
				>
					<p class="user-card__col-description">Менеджер</p>
					<p
						class="user-card__col user-card__manager"
						:title="
							user_manager !== null ? user_manager.username : '-'
						"
						v-if="user_me.role === 'AdminCRM'"
					>
						{{
							user_manager !== null ? user_manager.username : "-"
						}}
					</p>
				</div>

				<r-button
					:text="document_width > 1150 ? 'Подробнее' : ''"
					:class="{ minimized: document_width <= 1150 }"
					color="bordered"
					title="Подробнее"
					@click="
						this.$router.push({
							path: `/cabinet/user/${user.id}`,
							query: { page: 1 },
						})
					"
				>
					<template v-slot:icon>
						<svg
							width="20"
							height="21"
							viewBox="0 0 20 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="r-button__icon"
							v-if="document_width <= 1150"
						>
							<circle
								cx="3"
								cy="12.0303"
								r="2"
								fill="currentColor"
							/>
							<circle
								cx="10"
								cy="12.0303"
								r="2"
								fill="currentColor"
							/>
							<circle
								cx="17"
								cy="12.0303"
								r="2"
								fill="currentColor"
							/>
						</svg>
					</template>
				</r-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "UserCard",
		props: {
			user_me: Object,
			user: Object,
			users: Array,
			managers: Array,

			parsources: Array,
			parsers: Array,
		},
		watch: {
			isSelected() {
				this.isSelected
					? this.SELECT_USER(this.user.id)
					: this.UNSELECT_USER(this.user.id);
			},
			"user.selected"() {
				this.isSelected = this.user.selected;
			},
		},
		computed: {
			...mapState(["document_width"]),

			user_parsources() {
				return this.parsources.filter(
					(parsource) => parsource.user === this.user.id
				);
			},

			user_parsers() {
				return this.parsers.filter((parser) => {
					return this.user_parsources.some((parsource) => {
						return parsource.id === parser.parsource;
					});
				});
			},

			user_manager() {
				let manager;

				const manager_id = this.managers.find(
					(manager) => manager.user === this.user.id
				);

				if (manager_id !== undefined) {
					manager = this.users.find(
						(user) => user.id === manager_id.manager
					);

					if (
						manager === undefined &&
						manager_id.manager === this.user_me.id
					) {
						manager = this.user_me;
					}
				}

				return manager || null;
			},

			user_name() {
				if (
					this.user.first_name.length === 0 ||
					this.user.last_name.length === 0
				) {
					return this.user.username;
				} else {
					return `${this.user.first_name} ${this.user.last_name[0]}.`;
				}
			},
		},

		data() {
			return {
				isSelected: this.user.selected || false,
			};
		},
		methods: {
			...mapMutations(["SELECT_USER", "UNSELECT_USER"]),
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.user-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: max-content;

		&__content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 3rem;
			width: 100%;
			padding: 2rem 3rem;
			background-color: $white;
			border-radius: 0.6rem;
			box-shadow: $shadow;
			outline: 0.1rem solid transparent;
			transition: all 0.2s ease;

			@media (max-width: 1023px) {
				padding: 1rem;
			}
			@media (max-width: 767px) {
				flex-direction: column;
				align-items: flex-start;
			}

			&:hover {
				box-shadow: 0 0.4rem 1.2rem rgba(89, 96, 199, 0.2);
				outline-color: rgba(0, 0, 0, 0.22);
			}
			&.selected {
				outline-color: $primary;
				box-shadow: 0 0.4rem 1.2rem rgba(89, 96, 199, 0.2);
			}

			.r-button {
				width: 18rem;
				font-size: 1.4rem;
				padding: 1rem 2.8rem;
				&.minimized {
					width: 4rem;
					min-width: 4rem;
					height: 4rem;
					padding: 0;
				}
			}

			&-col {
				display: grid;
				grid-gap: 3rem;
				width: 100%;
				grid-template-columns: 5rem repeat(3, 1fr);

				&.admin {
					grid-template-columns: 5rem repeat(4, 1fr);
				}

				@media (max-width: 767px) {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					gap: 0;
					overflow: hidden;
				}
			}
			&-row {
				width: 100%;
				display: grid;
				grid-gap: 1rem;
				&:first-child {
					grid-template-columns: repeat(2, max-content) 1fr;
					align-items: center;
				}
				&:last-child {
					grid-template-columns: repeat(2, 1fr) 4rem;
				}

				&.admin {
					grid-template-columns: repeat(3, 1fr) 4rem;
				}
			}
		}

		&__col {
			font-size: 1.5rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;

			&:nth-child(n + 3) {
				margin: 0 auto;
				max-width: 100%;
				@media (max-width: 767px) {
					margin: 0;
				}
			}

			@media (max-width: 767px) {
				&:nth-child(n) {
					font-size: 1.2rem;
				}
			}

			&-description {
				font-size: 1rem;

				@media (max-width: 375px) {
					font-size: 0.8rem;
				}
			}
		}

		&__id,
		&__manager {
			color: $primary;
		}

		&__id {
			font-weight: 600;
		}

		&__manager,
		&__name {
			font-weight: 500;
			font-size: 1.6rem;
		}
	}
</style>
