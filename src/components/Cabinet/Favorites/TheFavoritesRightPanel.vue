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
					<social-share-icon
						:shareContentList="selectedParsers"
						network="odnoklassniki"
					></social-share-icon>

					<social-share-icon
						:shareContentList="selectedParsers"
						network="vk"
					></social-share-icon>

					<social-share-icon
						:shareContentList="selectedParsers"
						network="telegram"
					></social-share-icon>
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

	import SocialShareIcon from "@/components/Cabinet/SocialShareIcon.vue";

	export default {
		emits: {
			"clean-selected-parser-list": null,
		},
		props: {
			totalSelected: {
				type: [Number, String],
				default: 0,
			},
			selectedParsers: {
				type: Array,
				default() {
					return [] || undefined;
				},
			},
		},
		components: {
			SocialShareIcon,
		},
		data: () => ({
			confirmRemoveValue: false,
			model: null,
			downloadFormatFiles: {
				xls: false,
				csv: false,
				json: false,
			},
			alertMessage: "",
		}),
		computed: {
			...mapState({
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
			// вообще, тут очень плохой код написан, но пусть пока так, хоть работает
			// после тестирования буду рефачить
			// тут очень сильно требуется рефакторинг
			totalSelected() {
				if (this.totalSelected && this.alertMessage) {
					this.alertMessage = "";
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
				const ids = this.selectedParsers.map( parser => parser.id);
				try {
					await multiaction_delete("favorites", ids);
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
					/* padding: 0 0 0.5rem 0; */
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
				gap: 1rem;
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
