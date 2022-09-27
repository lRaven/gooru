<template>
	<div class="action-card">
		<div class="action-card__borderd">
			<p
				v-for="(text, index) in textBlocks"
				:key="index"
				class="action-card__text"
			>
				{{ text }}
			</p>
			<arrow-icon class="action-card__arrow-icon" />
		</div>
	</div>
</template>

<script>
	import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
	export default {
		name: "ActionCard",
		props: {
			textBlocks: { type: Array, required: true },
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
		@media (max-width: 1650px) {
			padding: 6rem 8rem 0 8rem;
		}
		@media (max-width: 1400px) {
			padding: 5rem 6rem 0 6rem;
		}
		@media (max-width: 600px) {
			padding: 3rem 4rem 0 4rem;
		}
		@media (max-width: 450px) {
			padding: 2rem 2.5rem 0 2.5rem;
		}

		&:hover {
			position: relative;
			background-color: $black;
			color: $white;
			cursor: url("@/../public/cursor/cursorForActionCard.png"),
				url("@/../public/cursor/cursorForActionCard.cur"), pointer;

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
			gap: 2rem;
			padding: 0 0 4rem 0;
			border-bottom: 2px solid $black;
			@media (max-width: 450px) {
				padding: 0 0 2rem 0;
			}
		}

		&__text {
			font-size: 2.4rem;
			line-height: 3.4rem;
			width: 30%;
			@media (max-width: 1100px) {
				width: 60%;
			}
			@media (max-width: 550px) {
				width: 100%;
			}
			@media (max-width: 450px) {
				font-size: 2.2rem;
				line-height: 3.2rem;
			}
		}
		:deep(.icon.action-card__arrow-icon) {
			align-self: center;
			path {
				fill: $black;
			}
			@media (max-width: 550px) {
				display: none;
			}
		}
	}
</style>
