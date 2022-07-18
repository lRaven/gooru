<template>
	<div class="r-spoiler" v-click-away="closeSpoiler">
		<div
			class="r-spoiler__header"
			@click="
				isContentVisible === true
					? (isContentVisible = false)
					: (isContentVisible = true)
			"
		>
			<h5 class="r-spoiler__title">{{ title }}</h5>
			<img
				src="/img/icon/arrow-full.svg"
				alt="arrow"
				class="r-spoiler__arrow"
				:class="arrowType"
				ref="arrow"
				v-if="arrowType === 'purple'"
			/>
			<img
				src="/img/icon/cabinet/arrow.svg"
				alt="arrow"
				class="r-spoiler__arrow"
				:class="arrowType"
				ref="arrow"
				v-else-if="arrowType === 'gray'"
			/>
		</div>
		<div class="r-spoiler__body" ref="body">
			<div class="r-spoiler__content" ref="content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
	import { directive } from "vue3-click-away";
	import { mapState } from "vuex";

	export default {
		name: "rSpoiler",
		props: {
			title: {
				value: String,
				default: "Title",
			},
			arrowType: {
				value: String,
				default: "purple",
			},
		},
		watch: {
			isContentVisible() {
				if (this.isContentVisible === true) this.openSpoiler();
				else if (this.isContentVisible === false) this.closeSpoiler();
			},
			document_width() {
				setTimeout(() => {
					this.closeSpoiler();
				}, 500);
			},
		},
		data: () => ({ isContentVisible: false }),
		computed: {
			...mapState(["document_width"]),

			contentHeight() {
				return this.$refs.content.offsetHeight;
			},
		},
		methods: {
			openSpoiler() {
				const contentHeight = this.$refs.content.offsetHeight;
				this.$refs.arrow.classList.add("open");
				this.$refs.body.classList.add("open");
				this.$refs.body.setAttribute(
					"style",
					`height: ${contentHeight}px`
				);
			},
			closeSpoiler() {
				this.$refs.arrow.classList.remove("open");
				this.$refs.body.classList.remove("open");
				this.$refs.body.removeAttribute("style");
				this.isContentVisible = false;
			},
		},
		directives: { ClickAway: directive },
	};
</script>

<style lang="scss" scoped>
	.r-spoiler {
		&__header {
			user-select: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 5rem;
			padding: 1.2rem 0;
			cursor: pointer;
		}
		&__title {
			font-weight: 600;
			max-width: 50rem;
		}
		&__arrow {
			pointer-events: all;
			transition: all 0.2s ease;
			&.purple {
				width: 1.6rem;
				&.open {
					transform: rotate(90deg);
				}
			}
			&.gray {
				width: 1rem;
				&.open {
					transform: rotate(180deg);
				}
			}
		}

		&__body {
			height: 0;
			overflow: hidden;
			transition: all 0.2s ease;
			border-bottom: 0.1rem solid #cdcdcd;
		}
		&__content {
			padding: 2rem 0;
		}
	}

	@media (max-width: 540px) {
		.r-spoiler {
			&__header,
			&__content {
				padding: 1.2rem;
			}
			&__title {
				font-size: 1.6rem;
			}
		}
	}
</style>
