<template>
	<div class="stats-card">
		<template v-if="isRate">
			<h3 class="stats-card__title">{{ title }}</h3>
			<hr class="stats-card__horizontal-rule" />
		</template>
		<stats-card-row
			v-for="item in stats_items"
			:key="item.id"
			:id="item.id"
			:isRate="isRate"
			:description="item.description"
			:value="item.value"
		></stats-card-row>
	</div>
</template>

<script>
	import StatsCardRow from "@/components/Cabinet/Stats/StatsCardRow.vue";

	export default {
		name: "StatsCard",
		components: { StatsCardRow },
		props: {
			isRate: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: "title",
			},
			stats_items: Array,
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.stats-card {
		display: flex;
		flex-direction: column;
		background-color: $white;
		box-shadow: $shadow;
		border-radius: 1rem;
		padding: 2rem;
		grid-area: card;
		&__title {
			font-size: 2.4rem;
			text-transform: uppercase;
			font-weight: 700;
			color: $primary;
			margin-bottom: 1.6rem;
		}
		&__rate-info-item {
			margin: 0 0 2rem 0;
			&_inline {
				margin: 0 0 1.8rem 0;
				&:last-child {
					margin: 0;
				}
			}
			&:last-child {
				margin: 0;
			}
		}
		&__horizontal-rule {
			height: 0.1rem;
			background-color: $light-gray;
			border: none;
			margin-bottom: 1.8rem;
		}
	}
</style>
