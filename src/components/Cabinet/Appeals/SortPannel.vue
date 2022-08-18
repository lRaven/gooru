<template>
	<div class="sort-pannel">
		<h3 class="sort-pannel__title">Сортировать по</h3>
		<div class="sort-params">
			<div
				class="sort-param sort-param__sort-params"
				:class="{ active: choosenParams.includes(param.id) }"
				v-for="param in params"
				:key="param.id"
				@click="changeSortParams(param.id)"
			>
				<p class="sort-param__description">{{ param.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SortPannel",
		emits: {
			"sort-params-changed": null,
		},
		props: {
			params: {
				type: Array,
				required: true,
			},
		},
		data() {
			return { choosenParams: [] };
		},
		methods: {
			changeSortParams(triggeredParam) {
				if (this.choosenParams.includes(triggeredParam)) {
					this.choosenParams = this.choosenParams.filter(
						(param) => param !== triggeredParam
					);
				} else {
					this.choosenParams.push(triggeredParam);
				}
				this.$emit("sort-params-changed", this.choosenParams);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.sort-pannel {
		padding: 1rem;
    background-color: $white;
    border-radius: 1rem;
		&__title {
			margin: 0 0 2rem 0;
		}
	}
	.sort-params {
		display: flex;
    flex-wrap: wrap;
    width: 100%;
	}
	.sort-param {
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
    &__sort-params {
      margin: 0 2rem 2rem 0;
      &:last-child {
        margin: 0 0 2rem 0;
      }
    }
	}
</style>
