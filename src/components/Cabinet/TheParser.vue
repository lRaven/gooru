<template>
	<section class="the-parser">
		<div class="the-parser__main">
			<h2 class="the-parser__title">
				Парсинг сайта {{ current_parser.source }}
			</h2>

			<div class="the-parser__col">
				<img
					:src="current_parser.img"
					alt=""
					class="the-parser__image"
				/>
				<div class="the-parser__info">
					<p class="the-parser__info-key">Источник</p>
					<a
						:href="current_parser.source"
						target="_blank"
						class="the-parser__info-value the-parser__info-source"
					>
						{{ current_parser.source }}
					</a>

					<p class="the-parser__info-key">Дата</p>
					<p class="the-parser__info-value">
						{{ current_parser.date }}
					</p>

					<p class="the-parser__info-key">Статус</p>
					<r-status :status="current_parser.status"></r-status>
				</div>
			</div>

			<div class="the-parser__col the-parser__content">
				<div class="the-parser__content-main">
					<div class="the-parser__content-header">
						<div class="the-parser__content-header-row">
							<h4 class="the-parser__content-found">
								Найдено
								<span class="the-parser__content-found-number">
									{{ current_parser.content.length }}
								</span>
							</h4>
							<p class="the-parser__total-processed">
								всего обработано
								{{ current_parser.content.length }}
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

					<ol class="the-parser__content-list">
						<parser-content
							v-for="parser_result in current_parser.content"
							:key="parser_result.id"
							:parser="parser_result"
						></parser-content>
					</ol>
				</div>

				<div
					class="the-parser__content-bottom"
					v-if="current_parser.content.length > 10"
				>
					<r-button color="bordered" text="Показать ещё"></r-button>
					<r-pagination></r-pagination>
				</div>
			</div>
		</div>

		<parser-filters :current_parser="current_parser"></parser-filters>
	</section>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import rStatus from "@/components/Cabinet/r-status";
	import ParserContent from "@/components/Cabinet/Parser/ParserContent";
	import rButton from "@/components/r-button";
	import rPagination from "@/components/r-pagination";
	import ParserFilters from "@/components/Cabinet/Parser/ParserFilters";

	export default {
		name: "TheParser",
		components: {
			rStatus,
			ParserContent,
			rButton,
			rPagination,
			ParserFilters,
		},
		data() {
			return {
				parser_id: Number(this.$route.params.id),
			};
		},
		computed: {
			...mapState({
				parsers: (state) => state.cabinet.parsers,
			}),
			current_parser() {
				let result = this.parsers.find(
					(parser) => parser.id === this.parser_id
				);

				return result;
			},
		},
		methods: {
			...mapMutations(["SET_TAB"]),
		},
		created() {
			this.SET_TAB("parsers");
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

		&__main {
			padding: 4rem 3rem 4rem 4rem;
			display: grid;
			grid-template-columns: 41rem 1fr;
			grid-template-rows: repeat(2, max-content);
			grid-template-columns: max-content, 1fr;
			grid-gap: 3rem;
		}

		&__col {
		}

		&__title {
			grid-column: 1/3;
			font-weight: 400;
		}

		&__image {
			user-select: none;
			width: 100%;
			margin-bottom: 4rem;
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
			user-select: none;
			background-color: transparent;
			font-size: 1.2rem;
			color: $black-50;
			&.selected {
				font-weight: 600;
				color: $black-70;
			}
		}
	}
</style>
