<template>
	<div class="the-favorites__right-panel">
		<p class="the-favorites__right-panel-counter-wrapper">
			<span class="the-favorites__right-panel-counter">
				{{ totalSelected }}
			</span>
			материала
		</p>
		<r-spoiler
			:class="{ mobile: documentWidth <= 450 }"
			title="Выложить в соц.сети"
			arrowType="gray"
		>
			<template v-slot>
				<div
					class="the-favorites__right-panel-social"
					@click.capture="handleClickSharedIcon($event)"
				>
					<ShareNetwork
						network="odnoklassniki"
						:url="shareContent.url"
						:title="shareContent.title"
						:description="shareContent.description"
						:media="shareContent.image"
						@close="callbackCloseSharedIcon"
					>
						<img
							src="/img/icon/cabinet/ok.svg"
							alt="ok"
							ref="odnoklassniki"
						/>
					</ShareNetwork>

					<ShareNetwork
						network="vk"
						:url="shareContent.url"
						:title="shareContent.title"
						:description="shareContent.description"
						:media="shareContent.image"
						@close="callbackCloseSharedIcon"
					>
						<img src="/img/icon/cabinet/vk.svg" alt="vk" ref="vk" />
					</ShareNetwork>

					<ShareNetwork
						network="telegram"
						:url="shareContent.url"
						:title="shareContent.title"
						:description="shareContent.description"
						:media="shareContent.image"
						@close="callbackCloseSharedIcon"
					>
						<img
							src="/img/icon/cabinet/tg.svg"
							alt="tg"
							ref="telegram"
						/>
					</ShareNetwork>
				</div>
				<p class="the-favorites__right-panel-alert-message">
					{{ alertMessage }}
				</p>
			</template>
		</r-spoiler>

		<r-spoiler title="Скачать" arrowType="gray">
			<template v-slot>
				<div class="the-favorites__right-panel__checkboxes">
					<r-checkbox
						v-model="downloadFormatFiles.xls"
						description="Excel"
					></r-checkbox>
					<r-checkbox
						v-model="downloadFormatFiles.csv"
						description="CSV"
					></r-checkbox>
					<r-checkbox
						v-model="downloadFormatFiles.json"
						description="JSON"
					></r-checkbox>
				</div>
				<r-button
					@click="handleClickDownload"
					text="Скачать"
					:disabled="isDisabledDownloadButton"
				></r-button>
			</template>
		</r-spoiler>

		<r-spoiler title="Удалить" arrowType="gray">
			<template v-slot>
				<div class="the-favorites__right-panel__checkboxes">
					<r-checkbox
						v-model="confirmRemoveValue"
						description="Подтверждаете удаление"
					></r-checkbox>
				</div>
				<r-button
					@click="handleClickRemoveButton"
					:disabled="!confirmRemoveValue || !selectedParsers.length"
					text="Удалить"
				></r-button>
			</template>
		</r-spoiler>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import { multiaction_delete } from "@/api/multiaction_delete";
	import { downloadFile } from "@/api/parser";

	export default {
		props: {
			totalSelected: {
				type: [Number, String],
				default: 0,
			},
			selectedParsers: {
				type: Array,
				default() {
					return [];
				},
			},
		},
		data: () => ({
			confirmRemoveValue: false,
			model: null,
			downloadFormatFiles: {
				xls: false,
				csv: false,
				json: false,
			},
			shareContent: {
				url: window.location.href,
				title: "",
				description: "",

				// *fb only
				quote: "",
				//*fb, twtr only
				hashtags: "",
			},
			sharedPointer: 0,
			alertMessage: "",
		}),
		computed: {
			...mapState({
				favorites: (state) => state.favorites.favorites,
				documentWidth: (state) => state.document_width,
			}),
			...mapActions(["getFavoriteParsers"]),
			isDisabledDownloadButton() {
				return (
					!Object.values(this.downloadFormatFiles).find(
						(currentItem) => currentItem === true
					) || !this.selectedParsers.length
				);
			},
		},
		watch: {
			totalSelected() {
				if (this.totalSelected && this.alertMessage) {
					this.alertMessage = "";
				}
				if (this.selectedParsers.length) {
					const parserId = this.selectedParsers[this.sharedPointer];
					let currentParser = null;
					this.favorites.forEach(({ parsers }) => {
						currentParser = parsers.find(
							(parser) => parser.id === parserId
						);
						if (currentParser) {
							this.shareContent.url = currentParser.url;
							this.shareContent.title = currentParser.title;
							this.shareContent.description =
								currentParser.article;
						}
					});
				}
			},
		},
		methods: {
			handleClickSharedIcon($event) {
				if (this.totalSelected === 0) {
					this.alertMessage = "Необходимо выбрать новость!";
					$event.stopPropagation();
				}
			},
			callbackCloseSharedIcon(networkName, url) {
				this.sharedPointer += 1;
				if (this.sharedPointer < this.selectedParsers.length) {
					const parserId = this.selectedParsers[this.sharedPointer];
					let currentParser = null;
					this.favorites.forEach(({ parsers }) => {
						currentParser = parsers.find(
							(parser) => parser.id === parserId
						);
						if (currentParser) {
							this.shareContent.url = currentParser.url;
							this.shareContent.title = currentParser.title;
							this.shareContent.description =
								currentParser.article;
						}
					});

					setTimeout(() => {
						this.$refs[`${networkName}`].click();
					}, 0);
				} else {
					this.sharedPointer = 0;
					console.log("finish", url);
				}
			},
			async handleClickDownload() {
				try {
					const downloadFilesQueue = [];
					Object.keys(this.downloadFormatFiles).forEach((key) => {
						if (this.downloadFormatFiles[key] === true) {
							downloadFilesQueue.push(
								downloadFile({ type: key })
							);
						}
					});
					const responses = await Promise.allSettled(
						downloadFilesQueue
					);
					responses.forEach((response) => {
						if (response.status === "fulfilled") {
							const downloadUrl = window.URL.createObjectURL(
								response.value
							);
							let dataFileType =
								response.value.type.split("/")[1];
							// преобразование mime-типов ответа в расширение
							if (
								dataFileType ===
								"vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							) {
								dataFileType = "xlsx";
							} else if (
								dataFileType === "application/vnd.ms-excel"
							) {
								dataFileType = "xls";
							}
							const linkForDownload = document.createElement("a");
							linkForDownload.href = downloadUrl;
							linkForDownload.download = `favoritesParsersData.${dataFileType}`;
							document.body.appendChild(linkForDownload);
							linkForDownload.click();
							linkForDownload.remove();
						}
					});
				} catch (err) {
					throw new Error(err);
				}
			},
			async handleClickRemoveButton() {
				try {
					await multiaction_delete({
						model: "favorites",
						ids: this.selectedParsers,
					});

					await this.getFavoriteParsers();
					this.confirmRemoveValue = false;
				} catch (err) {
					throw new Error(err);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-favorites {
		&__right-panel {
			.mobile {
				.r-spoiler__content {
					padding: 0 0 0.5rem 0;
				}
				&-counter {
					font-size: 3.6rem;
					&-wrapper {
						margin-bottom: 2rem;
					}
				}
			}
			&-alert-message {
				padding-top: 1rem;
				width: 100%;
				height: 2rem;
				font-size: 1.2rem;
				font-weight: 500;
				line-height: 1.7rem;
				color: $red;
				@media (max-width: 450px) {
					font-size: 1rem;
				}
			}
			&-social {
				display: flex;
				justify-content: space-between;
			}
			&__checkboxes {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				margin-bottom: 2rem;
			}
			.r-button {
				width: 100% !important;
				font-size: 1.4rem;
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
				@media (max-width: 450px) {
					font-size: 1rem;
					padding-top: 1rem;
					padding-bottom: 1rem;
				}
			}
		}
	}
</style>
