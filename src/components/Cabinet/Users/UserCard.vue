<template>
	<div class="user-card">
		<r-checkbox v-model="isSelected" :checked="isSelected"></r-checkbox>
		<div class="user-card__content" ref="content">
			<div
				class="user-card__content-col"
				:class="{ admin: user_me.role === 'AdminCRM' }"
			>
				<p class="user-card__col user-card__id" :title="'id' + user.id">
					id{{ user.id }}
				</p>

				<p
					class="user-card__col user-card__name"
					:title="
						user.first_name.length === 0 &&
						user.last_name.length === 0
							? user.username
							: `${user.first_name} ${user.last_name}`
					"
				>
					{{
						user.first_name.length === 0 &&
						user.last_name.length === 0
							? user.username
							: `${user.first_name} ${user.last_name}`
					}}
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
				:text="document_width > 1023 ? 'Подробнее' : ''"
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
						v-if="document_width < 1023"
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
				if (this.isSelected === true) {
					this.$refs.content.classList.add("selected");
					this.SELECT_USER(this.user.id);
				} else {
					this.$refs.content.classList.remove("selected");
					this.UNSELECT_USER(this.user.id);
				}
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
			}

			&-col {
				display: grid;
				grid-gap: 3rem;
				width: 100%;
				&.admin {
					grid-template-columns: 5rem repeat(4, 1fr);
				}
			}
		}

		&__col {
			font-size: 1.5rem;
			text-overflow: ellipsis;
			overflow: hidden;
			&:nth-child(n + 3) {
				margin: 0 auto;
				max-width: 100%;
			}
		}
		&__id,
		&__manager {
			color: $primary;
		}

		&__id,
		&__manager,
		&__name {
			font-weight: 500;
		}

		&__name,
		&__manager {
			font-size: 1.6rem;
		}
	}
</style>
