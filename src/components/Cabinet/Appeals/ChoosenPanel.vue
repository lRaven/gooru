<template>
	<div
		class="choosen-panel"
		:class="{ 'choosen-panel_background_transparent': !isPanelOpen }"
	>
		<slot
			name="visibleManageButton"
			:changePanelVisibility="handleChangeVisibility"
		></slot>
		<template v-if="isPanelOpen">
			<h3 class="choosen-panel__title">{{ title }}</h3>
			<div class="choosen-params">
				<slot
					v-for="{ id, description } in params"
					name="paramsItems"
					:keyId="id"
					:description="description"
					:handleChangeFilterParams="changeChoosenParams({ id, description })"
					:hasChoosen="choosenParams.includes(param.id)"
				></slot>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: "ChoosenPanel",
		emits: {
			"choosen-params-changed": null,
			"change-panel-visibility": null,
		},
		props: {
			params: {
				type: Array,
				required: true,
			},
			title: { type: String, default: "" },
		},
		inject: ['changeChoosenParams'],
		data() {
			return {
				choosenParams: [],
				isPanelOpen: false,
			};
		},
		methods: {
			/* changeFilterParams(triggeredParam) {
				if (this.choosenParams.includes(triggeredParam)) {
					this.choosenParams = this.choosenParams.filter(
						(param) => param !== triggeredParam
					);
				} else {
					this.choosenParams.push(triggeredParam);
				}
				this.$emit("choosen-params-changed", this.choosenParams);
			}, */
			handleChangeVisibility() {
				this.isPanelOpen
					? (this.isPanelOpen = false)
					: (this.isPanelOpen = true);
				this.$emit("change-panel-visibility", this.isPanelOpen);
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
	.choosen-panel {
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
	.choosen-params {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.choosen-param {
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
		&__choosen-params {
			margin: 0 2rem 2rem 0;
			&:last-child {
				margin: 0 0 2rem 0;
			}
		}
	}
</style>
