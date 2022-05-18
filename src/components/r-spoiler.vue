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
				src="img/icon/arrow-full.svg"
				alt="arrow"
				class="r-spoiler__arrow"
				ref="arrow"
			/>
		</div>
		<div class="r-spoiler__body" ref="body">
			<div class="r-spoiler__content" ref="content">
				<p class="r-spoiler__text" v-for="text in texts" :key="text.id">
					{{ text.text }}
				</p>
				<ul class="r-spoiler__list">
					<li
						class="r-spoiler__list-item"
						v-for="item in list"
						:key="item.id"
					>
						{{ item.text }}
					</li>
				</ul>
				<p class="r-spoiler__disclaimer">{{ disclaimer }}</p>
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
			texts: {
				value: Array,
				default: [{ id: 1, text: "Text" }],
			},
			list: Array,
			disclaimer: String,
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
			gap: 5rem;
			padding: 1.2rem 2rem;
			cursor: pointer;
		}
		&__title {
			font-weight: 600;
			max-width: 50rem;
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

		&__text,
		&__disclaimer {
			line-height: 1.3;
			font-size: 1.6rem;
		}
		&__list {
			&-item {
				font-size: 1.6rem;
				line-height: 1.3;
				display: block;
				&::first-letter {
					font-weight: 700;
					font-size: 40rem;
				}
			}
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
			&__text,
			&__disclaimer {
				font-size: 1.4rem;
			}
		}
	}
</style>
