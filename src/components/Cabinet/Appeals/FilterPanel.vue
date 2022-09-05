<template>
	<div class="filter-panel" :class="{ 'filter-panel_background_transparent': !isPanelOpen }">
		<slot
			name="visibleManageButton"
			:changePanelVisibility="handleChangeVisibility"
		></slot>
		<template v-if="isPanelOpen">
			<h3 class="filter-panel__title">{{ title }}</h3>
			<div class="filter-params">
				<div
					class="filter-param filter-param__filter-params"
					:class="{ active: choosenParams.includes(param.id) }"
					v-for="param in params"
					:key="param.id"
					@click="changeFilterParams(param.id)"
				>
					<p class="filter-param__description">
						{{ param.description }}
					</p>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: "FilterPanel",
		emits: {
			"filter-params-changed": null,
			"change-panel-visibility": null,
		},
		props: {
			params: {
				type: Array,
				required: true,
			},
			title: { type: String, default: "" },
		},
		data() {
			return {
				choosenParams: [],
				isPanelOpen: false,
				text: "Открой меня",
			};
		},
		methods: {
			changeFilterParams(triggeredParam) {
				if (this.choosenParams.includes(triggeredParam)) {
					this.choosenParams = this.choosenParams.filter(
						(param) => param !== triggeredParam
					);
				} else {
					this.choosenParams.push(triggeredParam);
				}
				this.$emit("filter-params-changed", this.choosenParams);
			},
			handleChangeVisibility() {
				this.isPanelOpen
					? (this.isPanelOpen = false)
					: (this.isPanelOpen = true);
				this.$emit('change-panel-visibility', this.isPanelOpen);
			},
		},
		mounted() {
			// если в слот ничего не передали, то панель всегда доступна
			if (!this.$slots.visibleManageButton) {
				this.isPanelOpen = true;
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.filter-panel {
		padding: 1rem;
		background-color: $white;
		border-radius: 1rem;
		&_background_transparent {
			background-color: transparent;
			width: fit-content;
		}
		&__title {
			margin: 0 0 2rem 0;
		}
	}
	.filter-params {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.filter-param {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 3rem;
		border-radius: 4rem;
		background-color: rgba($color: $gray, $alpha: 0.15);
		color: $black;
		font-weight: 500;

		&:hover {
			cursor: pointer;
			transform: scale(1.02);
			transition: all 0.3s ease;
		}
		&.active {
			background-color: $primary;
			color: $white;
		}
		&__description {
			font-size: 1.4rem;
		}
		&__filter-params {
			margin: 0 2rem 2rem 0;
			&:last-child {
				margin: 0 0 2rem 0;
			}
		}
	}
</style>
