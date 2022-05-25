<template>
	<div class="parser-card">
		<r-checkbox v-model="isSelected"></r-checkbox>
		<div class="parser-card__content" ref="content">
			<div class="parser-card__col">
				<p class="parser-card__source">{{ source }}</p>
			</div>
			<div class="parser-card__col">
				<p class="parser-card__date">{{ date }}</p>
			</div>
			<div class="parser-card__col">
				<r-status :status="status"></r-status>
			</div>
			<div class="parser-card__col">
				<p class="parser-card__found">{{ found }}</p>
			</div>
			<div class="parser-card__col">
				<p class="parser-card__favorite">{{ favorite }}</p>
			</div>
			<div class="parser-card__col">
				<p class="parser-card__time">{{ time }}</p>
			</div>
			<div class="parser-card__col">
				<r-button
					text="Подробнее"
					color="bordered"
					@click="
						this.$router.push({
							path: `/cabinet/parsers/${id}`,
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

	export default {
		name: "ParserCard",
		components: {
			rCheckbox,
			rButton,
			rStatus,
		},
		watch: {
			isSelected() {
				this.isSelected === true
					? this.$refs.content.classList.add("selected")
					: this.$refs.content.classList.remove("selected");
			},
		},
		props: {
			id: Number,
			source: {
				value: String,
				default: "source",
			},
			date: {
				value: String,
				default: "01.01.1970",
			},
			status: {
				value: Number,
				default: null,
			},
			found: {
				value: Number,
				default: 0,
			},
			favorite: {
				value: Number,
				default: 0,
			},
			time: {
				value: String,
				default: "0мин.",
			},
		},
		data: () => ({ isSelected: false }),
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.parser-card {
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
		}
		&__favorite {
			font-weight: 600;
			font-size: 1.5rem;
		}
	}
</style>
