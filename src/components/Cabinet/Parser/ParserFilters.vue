<template>
	<div class="parser-filters" ref="filters">
		<button
			class="parser-filters__minimize"
			@click="
				isMinimized === true
					? (isMinimized = false)
					: (isMinimized = true)
			"
		>
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="parser-filters__minimize-icon"
				ref="arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>
		</button>

		<div class="parser-filters__header">
			<img
				src="img/icon/cabinet/filter.svg"
				alt=""
				class="parser-filters__icon"
			/>
			<h5 class="parser-filters__title" v-if="isMinimized === false">
				Фильтр
			</h5>
		</div>

		<div class="parser-filters__body" v-show="isMinimized === false">
			<r-spoiler title="Источник" arrowType="gray">
				<template v-slot>
					<input
						type="text"
						name=""
						id=""
						placeholder="Введите источник"
						class="parser-filters__input"
					/>
				</template>
			</r-spoiler>

			<r-spoiler title="Объект поиска" arrowType="gray">
				<template v-slot>
					<div class="parser-filters__checkboxes">
						<text-checkbox
							text="Текст"
							v-model="texts"
						></text-checkbox>
						<text-checkbox
							text="Изображения"
							v-model="images"
						></text-checkbox>
						<text-checkbox
							text="Видео"
							v-model="videos"
						></text-checkbox>
						<text-checkbox
							text="Товар"
							v-model="products"
						></text-checkbox>
					</div>
				</template>
			</r-spoiler>

			<r-spoiler title="Условия поиска" arrowType="gray">
				<template v-slot>
					<textarea
						placeholder="Текстовое описание требований для поиска с возможностью прикрепления фото"
						class="parser-filters__textarea"
						v-model="description"
					></textarea>
				</template>
			</r-spoiler>

			<label class="parser-filters__file">
				<input
					type="file"
					name=""
					id=""
					class="parser-filters__file-real"
					accept="image/*"
					@change="file = $event.target.files[0].name"
				/>
				<span class="parser-filters__file-fake">
					<img
						src="img/icon/cabinet/camera.svg"
						alt=""
						class="parser-filters__file-icon"
					/>
					<p class="parser-filters__file-description">
						{{ file || "Добавить фото" }}
					</p>
				</span>
			</label>

			<r-button text="Применить"></r-button>
		</div>
	</div>
</template>

<script>
	import rSpoiler from "@/components/r-spoiler";
	import TextCheckbox from "@/components/Cabinet/TextCheckbox";
	import rButton from "@/components/r-button";

	export default {
		name: "ParserFilters",
		components: {
			rSpoiler,
			TextCheckbox,
			rButton,
		},
		watch: {
			isMinimized() {
				if (this.isMinimized === true) {
					this.minimizePanel();
				} else if (this.isMinimized === false) {
					this.resetMinimizePanel();
				}
			},
		},
		data: () => ({
			isMinimized: false,
			texts: false,
			images: false,
			videos: false,
			products: false,
			description: "",
			file: "",
		}),
		methods: {
			minimizePanel() {
				this.$refs.filters.classList.add("minimized");
				this.$refs.arrow.classList.add("minimized");
			},
			resetMinimizePanel() {
				this.$refs.filters.classList.remove("minimized");
				this.$refs.arrow.classList.remove("minimized");
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.parser-filters {
		background-color: rgba(255, 255, 255, 0.5);
		width: 29rem;
		height: calc(100vh - 8rem);
		padding: 2rem 1.5rem 1.5rem 1.5rem;
		transition: all 0.2s ease;
		&.minimized {
			width: 6.2rem;
		}

		&__minimize {
			position: relative;
			left: -2.7rem;
			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.4rem;
			height: 2.4rem;
			border-radius: 50%;
			box-shadow: $shadow;
			margin-bottom: 1rem;
			&-icon {
				transition: all 0.2s ease;
				transform: rotate(-90deg);
				&.minimized {
					transform: rotate(90deg);
				}
			}
		}

		&__header {
			display: flex;
			align-items: center;
			gap: 1.2rem;
			margin-bottom: 2.6rem;
		}
		&__title {
			font-weight: 600;
			color: $gray;
		}

		.r-spoiler {
			+ .r-spoiler {
				margin-top: 2.8rem;
			}
		}

		&__input {
			background-color: transparent;
			font-size: 1.6rem;
		}

		&__checkboxes {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
		}

		&__textarea {
			font-size: 1.3rem;
			width: 100%;
			height: 5rem;
			resize: none;
			max-height: 10rem;
			background-color: transparent;
		}

		&__file {
			user-select: none;
			display: inline-block;
			padding: 1.2rem 0;
			margin-bottom: 2.8rem;
			&-real {
				display: none;
			}
			&-fake {
				display: flex;
				align-items: center;
				gap: 0.6rem;
				cursor: pointer;
			}
			&-icon {
				width: 2.2rem;
			}
			&-description {
				font-size: 1rem;
				color: $black-70;
			}
		}

		.r-button {
			width: 100%;
			font-size: 1.4rem;
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}
	}
</style>

<style lang="scss">
	.parser-filters {
		.r-spoiler {
			&__title {
				font-weight: 500;
				font-size: 1.2rem;
			}
		}
	}
</style>
