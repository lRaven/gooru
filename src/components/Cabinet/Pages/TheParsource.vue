<template>
	<section class="the-parser">
		<div class="the-parser__main">
			<h2 class="the-parser__title">
				Парсинг сайта {{ parsource.data_source }}
			</h2>

			<div class="the-parser__col">
				<img
					:src="parsource.screenshot || 'img/icon/empty-image.svg'"
					alt=""
					class="the-parser__image"
				/>
				<div class="the-parser__info">
					<p class="the-parser__info-key">Источник</p>
					<a
						:href="parsource.data_source"
						target="_blank"
						class="the-parser__info-value the-parser__info-source"
					>
						{{ parsource.data_source }}
					</a>

					<p class="the-parser__info-key">Дата</p>
					<p class="the-parser__info-value">
						{{ parsource.date ? prettyDate(parsource.date) : "1.1.1970" }}
					</p>

					<p class="the-parser__info-key">Статус</p>
					<r-status :status="1 || parsource.condition"></r-status>
				</div>
			</div>

			<div class="the-parser__col the-parser__content">
				<div class="the-parser__content-main">
					<div class="the-parser__content-header">
						<div class="the-parser__content-header-row">
							<h4 class="the-parser__content-found">
								Найдено
								<span class="the-parser__content-found-number">
									{{ count }}
								</span>
							</h4>
							<p class="the-parser__total-processed">
								всего обработано
								{{ count }}
							</p>
						</div>

						<div class="the-parser__content-header-row">
							<button
								type="button"
								class="the-parser__sortby selected"
							>
								по свежести материала
							</button>
							<button type="button" class="the-parser__sortby">
								отмеченные
							</button>

							<button type="button" class="the-parser__sortby">
								с комментариями
							</button>
						</div>
					</div>

					<transition mode="out-in">
						<r-loader v-if="!isParsersLoaded"></r-loader>
					</transition>

					<transition mode="out-in" v-if="isParsersLoaded">
						<ol class="the-parser__content-list">
							<parser-content
								v-for="parser in parsers"
								:key="parser.id"
								:parserProp="parser"
							></parser-content>
						</ol>
					</transition>
				</div>

				<div
					class="the-parser__content-bottom"
					v-if="number_of_pages > 1"
				>
					<r-button color="bordered" text="Показать ещё"></r-button>
					<r-pagination
						:start_page="page"
						:count="count"
						:items_on_page="parsers_in_page"
						@page_changed="page_changed"
					></r-pagination>
				</div>
			</div>
		</div>

		<right-panel icon="img/icon/cabinet/filter.svg" title="Фильтр">
			<template v-slot>
				<div class="the-parser__right-panel">
					<r-spoiler title="Источник" arrowType="gray">
						<template v-slot>
							<router-link
								:to="{
									path: `/cabinet/parsource/${parsource.id}`,
									query: { page: 1 },
								}"
								v-for="parsource in all_parsources"
								:key="parsource.id"
								class="the-parser__right-panel-source"
							>
								{{ parsource.name }}
							</router-link>
						</template>
					</r-spoiler>

					<r-spoiler title="Объект поиска" arrowType="gray">
						<template v-slot>
							<div class="the-parser__right-panel__checkboxes">
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
								class="the-parser__right-panel__textarea"
								v-model="description"
							></textarea>
						</template>
					</r-spoiler>

					<!-- <label class="the-parser__right-panel__file">
						<input
							type="file"
							name=""
							id=""
							class="the-parser__right-panel__file-real"
							accept="image/*"
							@change="file = $event.target.files[0].name"
						/>
						<span class="the-parser__right-panel__file-fake">
							<img
								src="img/icon/cabinet/camera.svg"
								alt=""
								class="the-parser__right-panel__file-icon"
							/>
							<p
								class="the-parser__right-panel__file-description"
							>
								{{ file || "Добавить фото" }}
							</p>
						</span>
					</label> -->

					<r-button text="Применить"></r-button>
				</div>
			</template>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import rStatus from "@/components/Cabinet/r-status";
	import ParserContent from "@/components/Cabinet/Parsource/ParserContent";
	import rButton from "@/components/r-button";
	import rPagination from "@/components/r-pagination";
	import rLoader from "@/components/r-loader.vue";

	import RightPanel from "@/components/Cabinet/RightPanel";
	import rSpoiler from "@/components/r-spoiler";
	import TextCheckbox from "@/components/Cabinet/TextCheckbox";

	import { prettyDate } from '@/js/processStrings';

	export default {
		name: "TheParsource",
		components: {
			rStatus,
			ParserContent,
			rButton,
			rPagination,
			rLoader,

			RightPanel,
			rSpoiler,
			TextCheckbox,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getParsers({
						parsource_name: this.parsource_name,
						page_number: this.page,
						page_size: this.parsers_in_page,
					});
				}
			},
			parsource_id() {
				if (this.$route.path === this.path) {
					this.getParsource(this.parsource_id);
					this.getParsers({
						parsource_name: this.parsource_name,
						page_number: this.page,
						page_size: this.parsers_in_page,
					});
				}
			},

			parsource() {
				this.getParsers({
					parsource_name: this.parsource_name,
					page_number: this.page,
					page_size: this.parsers_in_page,
				});
			},
			parsers() {
				this.isParsersLoaded = true;
			},
		},
		computed: {
			...mapState({
				parsource: (state) => state.parsers.parsource,
				all_parsources: (state) => state.parsers.all_parsources,

				parsers: (state) => state.parsers.parsers,
				parsers_pagination: (state) => state.parsers.parsers_pagination,
			}),

			parsource_id() {
				return +this.$route.params.id;
			},
			page() {
				return +this.$route.query.page;
			},
			number_of_pages() {
				return Math.ceil(this.count / this.parsers_in_page);
			},

			parsource_name() {
				return this.parsource.name;
			},

			count() {
				return this.parsers_pagination.count;
			},
		},
		data() {
			return {
				isParsersLoaded: false,
				path: this.$route.path,

				parsers_in_page: 10,

				texts: false,
				images: false,
				videos: false,
				products: false,
				description: "",
				file: "",
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getParsers", "getParsource", "getAllParsources"]),

			page_changed(page_number) {
				this.$router.push({
					name: "parsource",
					query: { page: page_number },
				});
			},
			prettyDate,
		},
		created() {
			this.SET_TAB("parsers");

			this.getParsource(this.parsource_id);

			this.getAllParsources();
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-parser {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding: 0;
		height: calc(100vh - 8rem);
		grid-gap: 3rem;

		&__main {
			padding: 4rem 1rem 4rem 4rem;
			display: grid;
			grid-template-columns: 41rem 1fr;
			grid-template-rows: repeat(2, max-content);
			grid-template-columns: max-content, 1fr;
			grid-gap: 3rem;
			overflow-y: auto;
		}

		&__col {
		}

		&__title {
			grid-column: 1/3;
			font-weight: 400;
		}

		&__image {
			width: 100%;
			margin-bottom: 4rem;
			max-height: 40rem;
			object-fit: contain;
		}

		&__info {
			display: grid;
			grid-template-columns: repeat(2, max-content);
			align-items: center;
			grid-gap: 2rem 3rem;

			&-key {
				font-size: 1.6rem;
				color: $black-70;
			}
			&-value {
				font-size: 1.8rem;
			}
			&-source {
				text-decoration: underline;
				font-weight: 700;
				color: $primary;
			}
		}

		&__content {
			display: grid;
			grid-template-rows: repeat(2, min-content);
			align-content: space-between;
			grid-gap: 2rem;
			height: calc(100vh - 18.6rem);
			padding-bottom: 3rem;

			&-main {
				overflow: hidden;
				position: relative;
				display: grid;
				grid-template-rows: max-content minmax(max-content, 1fr);

				background-color: $white;
				border-radius: 0.8rem;
				box-shadow: $shadow;
			}

			&-header {
				padding: 3rem;
				&-row {
					display: flex;
					align-items: center;
					gap: 2rem;
					&:first-child {
						justify-content: space-between;
						margin-bottom: 1rem;
					}
				}
			}
			&-found {
				&-number {
					font-size: 3.2rem;
				}
			}

			&-list {
				list-style: none;
				overflow-y: auto;
				max-height: calc(100vh - 39.3rem);
			}

			&-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 5rem;
				.r-button {
					font-size: 1.4rem;
					padding: 1rem 2.8rem;
				}
			}
		}
		&__total-processed {
			color: $black-70;
		}

		&__sortby {
			background-color: transparent;
			font-size: 1.2rem;
			color: $black-50;
			&.selected {
				font-weight: 600;
				color: $black-70;
			}
		}

		&__right-panel {
			&-source {
				display: block;
				padding: 1rem 0;
				color: $black;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
	}
</style>
