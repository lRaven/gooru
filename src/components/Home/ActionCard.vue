<template>
	<div class="action-card">
		<div class="action-card__borderd">
			<p class="action-card__text">{{ text }}</p>
			<arrow-icon class="action-card__arrow-icon" />
		</div>
	</div>
</template>

<script>
	import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
	export default {
		name: "ActionCard",
		props: {
			text: { type: String, required: true },
		},
		components: {
			ArrowIcon,
		},
	};
</script>

<style lang="scss" scoped>
	.action-card {
		padding: 6rem 10rem 0 10rem;
		transition: all 0.3s ease;

		&:hover {
			position: relative;
			background-color: $black;
			color: $white;

			:deep(.icon.action-card__arrow-icon) {
				path {
					fill: $white;
				}
			}
      .action-card__borderd {
        border-bottom: 2px solid transparent;
      }
		}
		&__borderd {
			display: flex;
			justify-content: space-between;
      padding: 0 0 4rem 0;
			border-bottom: 2px solid $black;
		}

		&__text {
			font-size: 2.4rem;
			line-height: 3.4rem;
			width: 30%;
		}
		:deep(.icon.action-card__arrow-icon) {
			align-self: center;
			path {
				fill: $black;
			}
		}
	}
</style>
