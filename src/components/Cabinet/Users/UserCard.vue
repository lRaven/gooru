<template>
	<div class="user-card">
		<r-checkbox v-model="isSelected" :checked="isSelected"></r-checkbox>
		<div class="user-card__content" ref="content">
			<p class="user-card__id">id{{ user.id }}</p>

			<p class="user-card__name">
				{{
					user.first_name.length === 0 && user.last_name.length === 0
						? user.username
						: `${user.first_name} ${user.last_name}`
				}}
			</p>

			<p class="user-card__col user-card__status">
				{{ user.status || "Разблокирован" }}
			</p>

			<p class="user-card__col user-card__parsers">
				{{ user_parsers.length }}
			</p>

			<r-button text="Подробнее" color="bordered"></r-button>

			<!-- @click="
						this.$router.push({
							path: `/cabinet/parsource/${parsource.id}`,
							query: { page: 1 },
						})
			" -->
		</div>
	</div>
</template>

<script>
	import rCheckbox from "@/components/r-checkbox";
	import rButton from "@/components/r-button";
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "UserCard",
		props: { user: Object, users: Array },
		components: {
			rCheckbox,
			rButton,
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
			...mapState({
				all_parsources: (state) => state.parsers.all_parsources,
				all_parsers: (state) => state.parsers.all_parsers,
				users_managers: (state) => state.users_managers.users_managers,
			}),

			user_parsources() {
				return this.all_parsources.filter(
					(parsource) => parsource.user === this.user.id
				);
			},

			user_parsers() {
				return this.all_parsers.filter((parser) => {
					return this.user_parsources.some((parsource) => {
						return parsource.id === parser.parsource;
					});
				});
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

		&__content {
			display: grid;
			grid-template-columns:
				minmax(20rem, 1fr) 14rem
				20rem repeat(4, 14rem);
			grid-gap: 2rem;
			justify-content: space-between;
			align-items: center;
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
				width: 100%;
				font-size: 1.4rem;
				padding: 1rem 2.8rem;
			}
		}

		&__col {
			&:nth-child(n + 2) {
				justify-self: center;
			}
		}

		&__date,
		&__status,
		&__found,
		&__time {
			font-size: 1.4rem;
		}

		&__source {
			font-weight: 500;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		&__favorite {
			font-weight: 600;
			font-size: 1.5rem;
		}
	}
</style>
