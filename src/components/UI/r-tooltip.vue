<template>
	<div class="tooltip">
		<div class="tooltip__inner" :class="{ [sideModifier]: true }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "rTooltip",
		props: {
			side: { type: String, default: "top" },
		},
		computed: {
			sideModifier() {
				switch (this.side) {
					case "top":
						return "tooltip__inner_side_top";
					case "rigth":
						return "tooltip__inner_side_rigth";
					case "bottom":
						return "tooltip__inner_side_bottom";
					case "left":
						return "tooltip__inner_side_left";
					default:
						return "tooltip__inner_side_top";
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.tooltip {
		position: relative;
		&__inner {
			display: flex;
			position: absolute;
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			background-color: rgba($color: $black, $alpha: 0.8);
			&_side {
				&_top {
					top: -3rem;
          left: -3rem;
				}
			}
			&::after {
				content: "";
				position: absolute;
				left: 40%;
				top: 100%;
				border: 10px solid transparent;
				border-top: 10px solid rgba($color: $black, $alpha: 0.8);
			}
		}
	}
</style>
