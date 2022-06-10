<template>
	<div class="parsource-card">
		<r-checkbox v-model="isSelected" :checked="isSelected"></r-checkbox>
		<div class="parsource-card__content" ref="content">
			<div class="parsource-card__col">
				<p class="parsource-card__source">
					{{ parsource.data_source }}
				</p>
			</div>
			<div class="parsource-card__col">
				<p class="parsource-card__date">
					{{ parsource.date || "1.1.1970" }}
				</p>
			</div>
			<div class="parsource-card__col">
				<r-status :status="1 || parsource.condition"></r-status>
			</div>
			<div class="parsource-card__col">
				<p class="parsource-card__found">{{ parsource.find || 0 }}</p>
			</div>
			<div class="parsource-card__col">
				<p class="parsource-card__favorite">
					{{ parsource.favorite || 0 }}
				</p>
			</div>
			<div class="parsource-card__col">
				<p class="parsource-card__time">
					{{ parsource.lost_time || "0ч" }}
				</p>
			</div>
			<div class="parsource-card__col">
				<r-button
					text="Подробнее"
					color="bordered"
					@click="
						this.$router.push({
							path: `/cabinet/parsource/${parsource.id}`,
							query: { page: 1 },
						})
					"
				></r-button>
			</div>
		</div>
	</div>
</template>

<script>
	import rCheckbox from "@/components/r-checkbox";
	import rButton from "@/components/r-button";
	import rStatus from "@/components/Cabinet/r-status";
	import { mapMutations } from "vuex";

	export default {
		name: "ParsourceCard",
		components: {
			rCheckbox,
			rButton,
			rStatus,
		},
		watch: {
			isSelected() {
				if (this.isSelected === true) {
					this.$refs.content.classList.add("selected");
					this.SELECT_PARSOURCE(this.parsource.id);
				} else {
					this.$refs.content.classList.remove("selected");
					this.UNSELECT_PARSOURCE(this.parsource.id);
				}
			},
			"parsource.selected"() {
				this.isSelected = this.parsource.selected;
			},
		},
		props: { parsource: Object },
		data() {
			return {
				isSelected: this.parsource.selected || false,
			};
		},
		methods: {
			...mapMutations(["SELECT_PARSOURCE", "UNSELECT_PARSOURCE"]),
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.parsource-card {
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
