<template>
	<div class="page-brief theme-container" style="background">
		<div class="page-brief__container center__wide">
			<img
				src="/img/brief/brief-bg.png"
				ref="bg"
				alt=""
				class="page-brief__bg"
			/>

			<div class="page-brief__content">
				<div class="page-brief__content-col">
					<transition mode="out-in">
						<button
							type="button"
							class="page-brief__back"
							v-if="page_number > 1 && document_width > 767"
							@click="moveToPrevPage"
						>
							<img
								src="/img/icon/brief/arrow-long.svg"
								alt="arrow-back"
							/>
						</button>
					</transition>

					<r-progressbar
						:direction="
							document_width < 768 ? 'horizontal' : 'vertical'
						"
						:progress="page_progress"
					></r-progressbar>
				</div>

				<div class="page-brief__content-col page-brief__pages">
					<transition mode="out-in">
						<brief-start
							v-if="page_number === 1"
							@moveToNextPage="moveToNextPage"
						></brief-start>
					</transition>

					<transition mode="out-in">
						<brief-status
							v-show="page_number === 2"
							@moveToNextPage="moveToNextPage"
						></brief-status>
					</transition>

					<transition mode="out-in">
						<brief-fields-of-activity
							v-show="page_number === 3"
							@moveToNextPage="moveToNextPage"
							:document_width="document_width"
						></brief-fields-of-activity>
					</transition>

					<transition mode="out-in">
						<brief-site-types
							v-show="page_number === 4"
							@moveToNextPage="moveToNextPage"
						></brief-site-types>
					</transition>

					<transition mode="out-in">
						<brief-additional-parameters
							v-show="page_number === 5"
							@moveToNextPage="moveToNextPage"
							:document_width="document_width"
						></brief-additional-parameters>
					</transition>

					<transition mode="out-in">
						<brief-number-of-positions
							v-show="page_number === 6"
							@moveToNextPage="moveToNextPage"
							:document_width="document_width"
						></brief-number-of-positions>
					</transition>

					<transition mode="out-in">
						<brief-source
							v-show="page_number === 7"
							@moveToNextPage="moveToNextPage"
						></brief-source>
					</transition>

					<transition mode="out-in">
						<brief-price
							v-show="page_number === 8"
							@moveToNextPage="moveToNextPage"
						></brief-price>
					</transition>

					<transition mode="out-in">
						<brief-end
							v-if="page_number === 9"
							@moveToNextPage="moveToNextPage"
						></brief-end>
					</transition>
				</div>

				<div class="page-brief__content-col">
					<transition mode="out-in">
						<button
							type="button"
							class="page-brief__back"
							v-if="page_number > 1 && document_width < 768"
							@click="moveToPrevPage"
						>
							<img
								src="/img/icon/brief/arrow-long.svg"
								alt="arrow-back"
							/>
						</button>
					</transition>

					<transition mode="out-in">
						<button
							type="button"
							class="page-brief__exit"
							@click="this.$router.push({ name: 'home' })"
						>
							<img src="/img/icon/brief/close.svg" alt="close" />
						</button>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import rProgressbar from "@/components/Brief/r-progressbar";

	import BriefStart from "@/components/Brief/Pages/BriefStart";

	import BriefStatus from "@/components/Brief/Pages/BriefStatus";
	import BriefFieldsOfActivity from "@/components/Brief/Pages/BriefFieldsOfActivity";
	import BriefSiteTypes from "@/components/Brief/Pages/BriefSiteTypes";
	import BriefAdditionalParameters from "@/components/Brief/Pages/BriefAdditionalParameters";
	import BriefNumberOfPositions from "@/components/Brief/Pages/BriefNumberOfPositions";
	import BriefSource from "@/components/Brief/Pages/BriefSource";
	import BriefPrice from "@/components/Brief/Pages/BriefPrice";

	import BriefEnd from "@/components/Brief/Pages/BriefEnd";

	import { mapState } from "vuex";

	export default {
		name: "PageBrief",
		components: {
			rProgressbar,

			BriefStart,

			BriefStatus,
			BriefFieldsOfActivity,
			BriefSiteTypes,
			BriefAdditionalParameters,
			BriefNumberOfPositions,
			BriefSource,
			BriefPrice,

			BriefEnd,
		},
		watch: {
			page_number() {
				this.fillTheProgressbar();

				this.document_width < 768
					? this.transformBgImage("mobile")
					: this.transformBgImage("pc");

				//* проверка выхода из диапазона
				if (this.page_number < 1) {
					this.page_number = 1;
				}
				if (this.page_number > this.page_progress.length) {
					this.page_number = this.page_progress.length;
				}
			},
		},
		computed: { ...mapState(["document_width"]) },
		data: () => ({
			page_number: 1,
			page_progress: [
				{ id: 1, checked: "checked" },
				{ id: 2, checked: false },
				{ id: 3, checked: false },
				{ id: 4, checked: false },
				{ id: 5, checked: false },
				{ id: 6, checked: false },
				{ id: 7, checked: false },
				{ id: 8, checked: false },
				{ id: 9, checked: false },
			],
		}),

		methods: {
			fillTheProgressbar() {
				for (
					let index = 0;
					index < this.page_progress.length;
					index++
				) {
					this.page_number > index
						? (this.page_progress[index].checked = "checked")
						: (this.page_progress[index].checked = false);
				}
			},

			transformBgImage(version) {
				switch (version) {
					case "mobile": {
						if (this.page_number === 1) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: rotate(-90deg);"
							);
						} else if (
							this.page_number > 1 &&
							this.page_number < this.page_progress.length
						) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translateY(-20%) scale(0.5) rotate(-90deg);"
							);
						} else {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(-15%, 52%) scale(1) rotate(-90deg);"
							);
						}
						break;
					}

					case "pc": {
						if (this.page_number === 1) {
							this.$refs.bg.removeAttribute("style");
						} else if (this.page_number === 2) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translateX(-10%) scale(1.25);"
							);
						} else if (this.page_number === 3) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(25%, -37%) scale(0.5);"
							);
						} else if (this.page_number === 4) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(-15%, 40%) scale(1.25);"
							);
						} else if (
							this.page_number === 5 ||
							this.page_number === 7
						) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(-15%, 20%) scale(1);"
							);
						} else if (this.page_number === 6) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(0, -20%) scale(0.8);"
							);
						} else if (this.page_number === 8) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(-20%, 0) scale(0.6);"
							);
						} else if (this.page_number === 9) {
							this.$refs.bg.setAttribute(
								"style",
								"transform: translate(-25%, -10%) scale(1.25);"
							);
						}
						break;
					}
				}
			},

			moveToPrevPage() {
				this.page_number--;
			},
			moveToNextPage() {
				this.page_number++;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-brief {
		color: $white;
		position: relative;
		background-color: #004a8b;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		transition: all 0.2s ease;
		padding: 3rem 0;

		&__bg {
			position: absolute;
			left: 0;
			bottom: 0;
			object-fit: contain;
			transform: scale(0.8);
			transition: all 0.3s ease;
		}

		&__container {
			height: 100%;
		}

		&__content {
			display: grid;
			grid-template-columns: 6rem 1fr 6rem;
			position: relative;
			gap: 5rem;
			height: 100%;
			overflow: hidden;

			&-col {
				width: 100%;
				position: relative;

				&:first-child {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					.r-progressbar {
						margin-top: auto;
						padding: 2rem;
					}
				}
			}
		}

		&__pages {
			display: grid;
			section {
				overflow: visible;
				width: 100%;
				height: 100%;
				max-height: calc(100vh - 6rem);
				grid-area: 1/1;
				padding: 3rem 1rem;
			}
		}

		&__back,
		&__exit {
			background-color: transparent;
			padding: 2rem 1rem;
		}
	}

	@media (max-width: 1200px) {
		.page-brief {
			&__content {
				gap: 0;
			}
		}
	}

	@media (max-width: 767px) {
		.page-brief {
			padding: 0;

			&__bg {
				width: 200%;
				top: 0;
				left: -25%;
				transform: rotate(-90deg);
			}

			&__content {
				grid-template-columns: 1fr;
				grid-template-rows: 6rem 1fr 6rem;
				&-col {
					&:first-child {
						order: 3;
					}
					&:nth-child(3) {
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
				}
			}
			&__pages {
				grid-area: 2/1/2/1;
				section {
					max-height: calc(100vh - 12rem);
				}
			}
		}
	}

	@media (max-width: 540px) {
		.page-brief {
			padding: 1rem 0;
			&__content {
				gap: 0;
			}
		}
	}
</style>

<style lang="scss">
	@media (max-width: 1023px) {
		.page-brief {
			section {
				h1 {
					margin-bottom: 0 !important;
				}
			}
		}
	}

	@media (max-width: 540px) {
		.page-brief {
			&__pages {
				section {
					h1 {
						font-size: 3.6rem !important;
					}
					p {
						font-size: 1.8rem !important;
					}
				}
			}
		}
	}

	@media (max-width: 375px) {
		.page-brief {
			&__pages {
				section {
					h1 {
						font-size: 2.4rem !important;
					}
					p {
						font-size: 1.5rem !important;
					}
				}
			}
		}
	}
</style>
