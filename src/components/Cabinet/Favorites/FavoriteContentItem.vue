<template>
	<li class="favorite-content-item" v-click-away="stateReset">
		<div
			class="favorite-content-item__row"
			@click="
				isCroppedText === true ? expandArticle() : minimizeArticle()
			"
		>
			<div class="favorite-content-item__col">
				<r-checkbox
					@update:modelValue="handleChangeSelectItem"
					:modelValue="isSelected"
					:checked="checked"
				></r-checkbox>

				<h5 class="favorite-content-item__title">{{ parser.title }}</h5>
				<p class="favorite-content-item__text">{{ parser.article }}</p>
			</div>

			<div class="favorite-content-item__col">
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="favorite-content-item__icon"
					@click="openConfirmPopup"
					v-if="isFavorited"
				>
					<path
						d="M12.8633 18C12.4141 17.9956 11.9722 17.8812 11.5738 17.6663L9.31735 16.4283C9.21869 16.378 9.11015 16.3518 9.00016 16.3518C8.89018 16.3518 8.78167 16.378 8.68301 16.4283L6.42653 17.6663C5.97167 17.9141 5.45891 18.0253 4.94623 17.9872C4.43355 17.9492 3.94138 17.7634 3.52531 17.451C3.10672 17.1407 2.78123 16.7145 2.58624 16.2213C2.39124 15.728 2.33468 15.1878 2.42306 14.6628L2.85978 12.0467C2.87526 11.9356 2.86546 11.8222 2.83116 11.7157C2.79686 11.6092 2.73901 11.5124 2.66221 11.4331L0.832073 9.58138C0.463164 9.2118 0.202169 8.74222 0.0789608 8.22629C-0.0442474 7.71035 -0.0247079 7.16893 0.135352 6.66396C0.289411 6.15503 0.580702 5.70224 0.97494 5.35894C1.36918 5.01563 1.84997 4.79612 2.36067 4.72617L4.88753 4.33856C4.9958 4.32385 5.0989 4.28179 5.18776 4.21608C5.27662 4.15037 5.3485 4.06306 5.39705 3.96179L6.53049 1.58258C6.75666 1.10613 7.10768 0.705098 7.54344 0.425273C7.97921 0.145448 8.48221 -0.00186543 8.99499 7.86826e-05C9.50954 -0.00389218 10.0147 0.142509 10.4525 0.422448C10.8903 0.702387 11.2429 1.10448 11.4698 1.58258L12.6033 3.96179C12.6511 4.06364 12.7228 4.15145 12.8118 4.21727C12.9008 4.28308 13.0043 4.32478 13.1128 4.33856L15.6397 4.72617C16.1491 4.79984 16.6281 5.0207 17.0217 5.36347C17.4153 5.70624 17.7076 6.157 17.865 6.66396C18.0226 7.1692 18.0409 7.70995 17.9178 8.22537C17.7947 8.74078 17.5351 9.21037 17.1683 9.58138L15.3381 11.4331C15.2576 11.5096 15.1973 11.6061 15.1628 11.7135C15.1282 11.8208 15.1205 11.9355 15.1405 12.0467L15.5669 14.6628C15.6633 15.1817 15.6169 15.7182 15.433 16.2112C15.2492 16.7042 14.9352 17.1337 14.527 17.451C14.0432 17.8131 13.4603 18.0055 12.8633 18Z"
						fill="#989898"
					/>
				</svg>

				<svg
					width="18"
					height="19"
					viewBox="0 0 18 19"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="favorite-content-item__icon"
					@click="
						isShareOpen === true
							? (isShareOpen = false)
							: (isShareOpen = true)
					"
					ref="share"
				>
					<path
						d="M14.1901 18.9998C13.8958 18.9283 13.6054 18.8415 13.3201 18.7398C12.6843 18.4641 12.1636 17.9767 11.8464 17.3606C11.5292 16.7444 11.4351 16.0374 11.5801 15.3598C11.5758 15.3333 11.5758 15.3063 11.5801 15.2798C11.1001 15.0098 10.5801 14.7398 10.1501 14.4598L6.24013 12.2298C6.20274 12.1931 6.15246 12.1726 6.10011 12.1726C6.04776 12.1726 5.99751 12.1931 5.96013 12.2298C5.49183 12.6343 4.90987 12.8842 4.29402 12.945C3.67817 13.0059 3.05856 12.8749 2.52013 12.5698C1.98024 12.265 1.54806 11.8003 1.28303 11.2398C1.01801 10.6793 0.933134 10.0505 1.04012 9.4398C1.15055 8.82763 1.44856 8.26492 1.89287 7.82957C2.33718 7.39421 2.90583 7.10775 3.52013 7.00981C3.95485 6.93375 4.40117 6.95723 4.82552 7.07847C5.24986 7.19971 5.64121 7.41558 5.97014 7.70982C6.002 7.74157 6.04515 7.75938 6.09013 7.75938C6.13512 7.75938 6.17826 7.74157 6.21013 7.70982L11.4901 4.70982H11.5701C11.3863 3.96269 11.4965 3.1735 11.878 2.50535C12.2596 1.8372 12.8833 1.34115 13.6201 1.11979C14.2938 0.913071 15.0187 0.950073 15.6678 1.22434C16.3169 1.49861 16.8488 1.99265 17.1701 2.61979C17.4911 3.24434 17.5829 3.96171 17.4294 4.64695C17.2759 5.33219 16.8869 5.94186 16.3301 6.36979C15.7392 6.81731 15.0035 7.03023 14.2649 6.96745C13.5263 6.90466 12.8371 6.57067 12.3301 6.02982L6.91014 9.11979C7.07992 9.69077 7.07992 10.2988 6.91014 10.8698L12.3301 13.9598C12.7259 13.5391 13.2317 13.2377 13.7901 13.0898C14.2339 12.9752 14.698 12.9638 15.1468 13.0565C15.5956 13.1492 16.0172 13.3435 16.3793 13.6244C16.7414 13.9054 17.0343 14.2656 17.2355 14.6773C17.4367 15.0891 17.5409 15.5415 17.5401 15.9998C17.547 16.7293 17.2878 17.4362 16.8111 17.9884C16.3344 18.5406 15.6728 18.9001 14.9501 18.9998H14.8601H14.1901Z"
						fill="#989898"
					/>
				</svg>

				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="favorite-content-item__icon"
					@click="
						isDownloadOpen === true
							? (isDownloadOpen = false)
							: (isDownloadOpen = true)
					"
					ref="download"
				>
					<path
						d="M10.1903 1H10.2704C10.5215 1.05555 10.7456 1.19665 10.9043 1.39911C11.063 1.60157 11.1464 1.85288 11.1403 2.11005V10.77C11.1981 10.725 11.2517 10.6748 11.3004 10.6201L13.2104 8.72003C13.3509 8.57689 13.5272 8.47412 13.721 8.42242C13.9148 8.37073 14.1189 8.37199 14.3121 8.42615C14.5052 8.4803 14.6802 8.58536 14.8189 8.73029C14.9575 8.87521 15.0548 9.05467 15.1003 9.25C15.1494 9.44847 15.1436 9.65658 15.0838 9.85205C15.0239 10.0475 14.9121 10.2231 14.7603 10.36L11.7603 13.36L10.8503 14.27C10.7453 14.3875 10.6166 14.4816 10.4727 14.546C10.3288 14.6103 10.173 14.6436 10.0153 14.6436C9.85772 14.6436 9.70187 14.6103 9.55798 14.546C9.41409 14.4816 9.28541 14.3875 9.18036 14.27L5.25033 10.35C5.09841 10.2093 4.98886 10.029 4.93408 9.82928C4.8793 9.6296 4.88147 9.41855 4.94034 9.22003C4.98657 9.02344 5.08851 8.84434 5.23395 8.70422C5.37939 8.5641 5.56216 8.46893 5.76034 8.43005C5.95485 8.38036 6.15924 8.38482 6.35138 8.44299C6.54352 8.50116 6.71606 8.61078 6.85034 8.76001L8.72034 10.63C8.76251 10.6757 8.79942 10.7261 8.83035 10.78H8.89035V10.59C8.89035 7.88003 8.89035 5.16 8.89035 2.44C8.84426 2.13062 8.91215 1.81506 9.08139 1.552C9.25063 1.28894 9.50968 1.09631 9.81033 1.01001L10.1903 1Z"
						fill="#989898"
					/>
					<path
						d="M1 17.6999L1.06 17.55C1.1328 17.3386 1.26669 17.1535 1.4447 17.0182C1.62271 16.883 1.83683 16.8035 2.06 16.79H17.79C18.0622 16.7723 18.3316 16.8537 18.5485 17.0191C18.7653 17.1845 18.9151 17.4228 18.97 17.6899C19.0016 17.8452 19.0001 18.0054 18.9658 18.16C18.9314 18.3147 18.865 18.4604 18.7707 18.5877C18.6764 18.715 18.5564 18.821 18.4184 18.8989C18.2805 18.9768 18.1277 19.0249 17.97 19.04H2.42001C2.11191 19.0856 1.79772 19.0174 1.53632 18.848C1.27492 18.6787 1.08423 18.4198 1 18.12V17.6999Z"
						fill="#989898"
					/>
				</svg>
			</div>
		</div>

		<div class="favorite-content-item__row" v-if="isShareOpen === true">
			<div class="favorite-content-item__social">
				<p class="favorite-content-item__social-description">
					Поделиться в социальных сетях:
				</p>
				<ul class="favorite-content-item__social-list">
					<li class="favorite-content-item__social-list-item">
						<ShareNetwork
							network="odnoklassniki"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/ok.svg" alt="ok" />
						</ShareNetwork>
					</li>
					<li class="favorite-content-item__social-list-item">
						<ShareNetwork
							network="vk"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/vk.svg" alt="vk" />
						</ShareNetwork>
					</li>
					<li class="favorite-content-item__social-list-item">
						<ShareNetwork
							network="twitter"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
							:hashtags="shareContent.hashtags"
						>
							<img
								src="/img/icon/cabinet/twtr.svg"
								alt="twitter"
							/>
						</ShareNetwork>
					</li>
					<li class="favorite-content-item__social-list-item">
						<ShareNetwork
							network="telegram"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/tg.svg" alt="tg" />
						</ShareNetwork>
					</li>
				</ul>
			</div>
			<r-button text="Отправить" color="bordered"></r-button>
		</div>

		<div class="favorite-content-item__row" v-if="isDownloadOpen === true">
			<div class="favorite-content-item__download">
				<p class="favorite-content-item__download-description">
					Выберите формат
				</p>
				<ul class="favorite-content-item__download-list">
					<li class="favorite-content-item__download-list-item">
						<r-checkbox
							description="Excel"
							v-model="downloadFormatFiles.excel"
							:checked="downloadFormatFiles.excel"
						></r-checkbox>
					</li>
					<li class="favorite-content-item__download-list-item">
						<r-checkbox
							description="CSV"
							v-model="downloadFormatFiles.csv"
							:checked="downloadFormatFiles.csv"
						></r-checkbox>
					</li>
				</ul>
			</div>
			<r-button
				@click="handleClickDownload"
				:disabled="isDisabledDownloadButton"
				text="Скачать"
				color="bordered"
			></r-button>
		</div>
	</li>
	<r-confirm-popup
		v-if="isDeleteFavoritePopupVisible"
		:text="`Вы действительно хотите удалить «${parser.article}» из избранного?`"
		@action_confirm="deleteFavoriteParser"
		@close_popup="isDeleteFavoritePopupVisible = false"
	/>
</template>

<script>
	import { useToast } from "vue-toastification";

	import { directive } from "vue3-click-away";
	import { mapState, mapActions } from "vuex";

	import { downloadFile } from "@/api/parser";

	export default {
		name: "FavoriteContentItem",
		props: {
			parser: Object,
			checked: {
				type: Boolean,
				default: false,
			},
		},
		emits: ["change-selected"],
		watch: {
			isShareOpen() {
				if (this.isShareOpen === true) {
					this.isDownloadOpen = false;
					this.$refs.share.classList.add("selected");
				} else {
					this.$refs.share.classList.remove("selected");
				}
			},
			isDownloadOpen() {
				if (this.isDownloadOpen === true) {
					this.isShareOpen = false;
					this.$refs.download.classList.add("selected");
				} else {
					this.$refs.download.classList.remove("selected");
				}
			},
		},
		computed: {
			...mapState({
				favorites: (state) => state.favorites.favorites,
				user: (state) => state.cabinet.user,
			}),

			isFavorited() {
				let find = false;
				this.favorites.forEach((parsource) => {
					parsource.parsers.forEach((parser) => {
						if (parser.id === this.parser.id) {
							find = true;
							this.favoriteId = parser.favoriteId;
						}
					});
				});

				return find;
			},
			isDisabledDownloadButton() {
				return !Object.values(this.downloadFormatFiles).find(
					(downloadFormatFile) => downloadFormatFile === true
				);
			},
		},
		data() {
			return {
				isShareOpen: false,
				isDownloadOpen: false,
				isSelected: this.checked,
				isCroppedText: true,
				isDeleteFavoritePopupVisible: false,

				comment: "",
				favoriteId: 0,
				downloadFormatFiles: { excel: false, csv: false },

				shareContent: {
					url: this.parser.url,
					title: this.parser.title,
					description: this.parser.article,
					image: "https://gitlab.com/uploads/-/system/project/avatar/32004440/Vue.js_Logo_2.svg.png",

					// *fb only
					quote: "",
					//*fb, twtr only
					hashtags: "",
				},
			};
		},
		methods: {
			...mapActions(["updateFavorites"]),

			hideAllExtras() {
				this.isMessagesOpen = false;
				this.isShareOpen = false;
				this.isDownloadOpen = false;
			},
			expandArticle() {
				this.isCroppedText = false;
			},

			minimizeArticle() {
				this.isCroppedText = true;
			},

			stateReset() {
				this.minimizeArticle();
				this.hideAllExtras();
			},
			handleChangeSelectItem(value) {
				console.log("parser", this.parser.id, value);
				this.$emit("change-selected", {
					id: this.parser.id,
					isSelect: value,
				});
				this.isSelected = value;
			},
			openConfirmPopup() {
				this.isDeleteFavoritePopupVisible = true;
			},
			async deleteFavoriteParser() {
				try {
					await this.updateFavorites({
						parserToUpdate: {
							...this.parser,
							favoriteId: this.favoriteId,
						},
						userId: this.user.id,
						isFavorite: true,
					});
					this.toast.success(
						`Парсер «${this.parser.article}» удален из избранного!`
					);
					setTimeout(
						() => (this.isDeleteFavoritePopupVisible = false),
						1000
					);
				} catch (error) {
					this.toast.error(
						`Не удалось удалить «${this.parser.article}» из избранного !`
					);
				}
			},
			async handleClickDownload() {
				try {
					const downloadFilesQueue = [];
					Object.keys(this.downloadFormatFiles).forEach((key) => {
						if (this.downloadFormatFiles[key] === true) {
							downloadFilesQueue.push(
								downloadFile({
									type: key === "excel" ? "xls" : key,
								})
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
							//* преобразование mime-типов ответа в расширение
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
		},
		setup() {
			const toast = useToast();
			return { toast };
		},

		directives: { ClickAway: directive },
	};
</script>
<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.favorite-content-item {
		list-style: none;
		border-top: 0.1rem solid #999;
		padding: 1rem 3rem 1rem 1rem;
		background-color: $white;

		&__row {
			display: flex;
			justify-content: space-between;
			+ .favorite-content-item__row {
				margin-top: 2rem;
			}
			&:first-child {
				align-items: center;
				gap: 1rem;
			}
			&:last-child {
				gap: 2rem;
			}
			.r-button {
				align-self: flex-end;
				padding: 0.8rem 2.8rem;
				font-size: 1.4rem;
				font-weight: 500;
				height: max-content;
			}
		}

		&__col {
			&:first-child {
				cursor: pointer;
				display: grid;
				grid-template-columns: max-content 1fr;
				grid-gap: 0.5rem 3rem;
			}
			&:last-child {
				display: flex;
				align-items: center;
				gap: 1.2rem;
				width: max-content;
			}
		}
		.r-checkbox {
			grid-row: 1/3;
		}

		&__image {
			max-width: 7rem;
			width: 100%;
			max-height: 5rem;
			object-fit: contain;
		}

		&__title {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		&__text {
			font-size: 1.6rem;
			line-height: 1.3;
			margin-bottom: 0.5rem;
			&.cropped {
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		&__icon {
			cursor: pointer;

			&.selected {
				path {
					fill: $primary;
				}
			}

			path {
				transition: all 0.2s ease;
			}
			&:hover {
				path {
					fill: $primary;
				}
			}
		}

		&__textarea {
			width: 100%;
			height: 7rem;
			border: 0.1rem solid #d5d5d5;
			resize: none;
			border-radius: 0.6rem;
			padding: 1rem;
			font-size: 1.2rem;
			color: $black;
			&::placeholder {
				user-select: none;
				color: $black;
			}
		}

		&__social {
			&-description {
				font-size: 1.2rem;
				margin-bottom: 1.3rem;
			}
			&-list {
				display: flex;
				gap: 1rem;
				&-item {
					cursor: pointer;
					width: 3.2rem;
					height: 3.2rem;
					border: 0.1rem solid transparent;
					border-radius: 50%;
					overflow: hidden;
					transition: all 0.2s ease;
					&:hover {
						border-color: $primary;
					}
					img {
						padding: 0.1rem;
						width: 100%;
						object-fit: contain;
					}
				}
			}
		}

		&__download {
			&-description {
				font-size: 1.2rem;
				margin-bottom: 1.3rem;
			}
			&-list {
				display: flex;
				gap: 5rem;
				&-item {
					.r-checkbox__description {
						font-weight: 500;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	.favorite-content-item {
		&__download {
			&-list {
				&-item {
					.r-checkbox__description {
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
