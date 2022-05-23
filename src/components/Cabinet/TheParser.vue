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
				<div class="the-parser__content-header">
					<h4 class="the-parser__content-found">
						Найдено
						<span class="the-parser__content-found-number"
							>862</span
						>
					</h4>
				</div>

				<ul class="the-parser__content-list"></ul>
			</div>
		</div>

		<div class="the-parser__filters heze"></div>
	</section>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import rStatus from "@/components/Cabinet/r-status";

	export default {
		name: "TheParser",
		components: {
			rStatus,
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

	.heze {
		width: 29.8rem;
		height: calc(100vh - 8rem);
		background-color: $secondary;
	}

	.the-parser {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-gap: 3rem;
		padding-right: 0;

		&__main {
			padding-top: 4rem;
			display: grid;
			grid-template-columns: 41rem 1fr;
			grid-template-rows: repeat(2, max-content);
			grid-gap: 3rem;
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
			background-color: $white;
			border-radius: 0.8rem;
			box-shadow: $shadow;
			&-header {
				padding: 2rem 3rem;
			}
			&-found {
				&-number {
					font-size: 3.2rem;
				}
			}

			&-list {
			}
		}

		&__filters {
			// background-color: rgba(255, 255, 255, 0.5);
		}
	}
</style>
