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
			<p class="r-spoiler__title">{{ title }}</p>
			<img
				src="img/icon/arrow-full.svg"
				alt="arrow"
				class="r-spoiler__arrow"
				ref="arrow"
			/>
		</div>
		<div class="r-spoiler__body" ref="body">
			<div class="r-spoiler__content" ref="content">
				<p class="r-spoiler__text">{{ text }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { directive } from "vue3-click-away";

	export default {
		name: "rSpoiler",
		props: {
			title: {
				value: String,
				default: "Title",
			},
			text: {
				value: String,
				default: "Text",
			},
		},
		watch: {
			isContentVisible() {
				if (this.isContentVisible === true) this.openSpoiler();
				else if (this.isContentVisible === false) this.closeSpoiler();
			},
		},
		data: () => ({
			isContentVisible: false,
		}),
		computed: {
			contentHeight() {
				return this.$refs.content.offsetHeight;
			},
		},
		methods: {
			openSpoiler() {
				this.$refs.arrow.classList.add("open");
				this.$refs.body.setAttribute(
					"style",
					`height: ${this.contentHeight}px`
				);
			},
			closeSpoiler() {
				this.$refs.arrow.classList.remove("open");
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
			padding: 1.2rem 2rem;
			cursor: pointer;
		}
		&__arrow {
			pointer-events: all;
			width: 1.6rem;
			transition: all 0.2s ease;
			&.open {
				transform: rotate(90deg);
			}
		}

		&__body {
			height: 0;
			overflow: hidden;
			transition: all 0.2s ease;
			border-bottom: 0.1rem solid #cdcdcd;
		}
		&__content {
			padding: 2rem 4rem 2rem 2rem;
		}
	}
</style>
