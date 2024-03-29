<template>
	<div class="social-icon" @click.stop="openPopup">
		<img
			class="social-icon__image"
			:class="{ 'social-icon__image_background-color_white': true }"
			:src="currentSocialIcon"
			:alt="`${network} logo`"
		/>
	</div>
	<r-modal v-if="isPopupOpen" @close-modal="closePopup">
		<div class="share-popup">
			<h2 class="share-popup__title">Поделиться в {{ networkName }}</h2>
			<ul class="share-list share-popup__share-list">
				<li
					class="share-list-item share-list__share-list-item"
					v-for="(shareItem, index) in shareContentList"
					:key="shareItem.id"
				>
					<h3 class="share-list-item__title">
						{{ shareItem.title }}
					</h3>
					<a class="share-list-item__link" :href="shareItem.url" target="_blank"
						>Ссылка на ресурс</a
					>
					<r-textarea
						class="share-list-item__comment-area"
						v-if="network === 'telegram'"
						placeholder="Комментарий..."
						v-model="userComments[index]"
						:value="userComments[index]"
					></r-textarea>
					<r-input
						v-else
						placeholder="Заголовок"
						v-model="userComments[index]"
						:value="userComments[index]"
					/>
					<p class="share-list-item__error" v-if="isTooLongСontent(index)">
						Суммарная длина контента не должна превышать 750 символов
					</p>
					<r-checkbox
						v-if="
							this.network === 'telegram' && shareContentList[index].comment.id
						"
						description="Добавить комментарий парсера с Gooru"
						:disabled="hasComment(index)"
						v-model="parserComments[index]"
					></r-checkbox>
					<div
						v-else-if="
							shareContentList[index]?.comment.text &&
							this.network !== 'telegram'
						"
						class="gooru-comment"
					>
						<h4 class="gooru-comment__title">
							Ваш комментарий к парсеру в Gooru:
						</h4>
						<p class="gooru-comment__text">
							{{ shareContentList[index].comment.text }}
						</p>
					</div>
					<r-button
						text="Отправить"
						:disabled="isTooLongСontent(index)"
						@click="share(index)"
					></r-button>
				</li>
			</ul>
			<r-button
				v-if="shareContentList.length > 1"
				@click.stop="completeSharing"
				text="Готово"
			></r-button>
		</div>
	</r-modal>
</template>

<script>
	import { useToast } from 'vue-toastification';
	export default {
		name: 'SocialShare',
		emits: {
			'complete-sharing': null,
		},
		props: {
			network: {
				type: String,
				required: true,
			},
			shareContentList: {
				type: Array,
				required: true,
			},
		},
		inject: ['share'],
		data() {
			return {
				isPopupOpen: false,
				userComments: [''],
				parserComments: [false],
			};
		},
		computed: {
			networkName() {
				switch (this.network) {
					case 'telegram':
						return 'Telegram';
					case 'vk':
						return 'VK';
					case 'odnoklassniki':
						return 'Одноклассниках';
					default:
						return 'интернете';
				}
			},
			hasComment() {
				return (index) => {
					return this.shareContentList[index].comment.text ? false : true;
				};
			},
			currentSocialIcon() {
				switch (this.network) {
					case 'telegram':
						return '/img/icons/cabinet/tg.svg';
					case 'vk':
						return '/img/icons/cabinet/VK_Compact_Logo.svg';
					case 'odnoklassniki':
						return '/img/icons/cabinet/ok.svg';
					default:
						return '/img/icons/cabinet/share.svg';
				}
			},

			isTooLongСontent() {
				return (indexInShareContent) => {
					const parserCommentLength =
						(this.parserComments[indexInShareContent] || 0) &&
						this.shareContentList[indexInShareContent].comment.text.length;
					return this.userComments[indexInShareContent]?.length +
						parserCommentLength +
						this.shareContentList[indexInShareContent].url.length >
						750
						? true
						: false;
				};
			},
		},
		methods: {
			openPopup() {
				this.isPopupOpen = true;
			},
			closePopup() {
				this.isPopupOpen = false;
			},
			currentShareLink(index, shareLink) {
				switch (this.network) {
					case 'telegram':
						return `https://t.me/share/url?url=${shareLink}&text=${this.userComments[index]}`;
					case 'vk':
						return `https://vk.com/share.php?url=${shareLink}&title=${this.userComments[index]}`;
					case 'odnoklassniki':
						return `https://connect.ok.ru/offer?url=${shareLink}&title=${this.userComments[index]}`;
					default:
						return '/img/icons/cabinet/share.svg';
				}
			},
			completeSharing() {
				this.closePopup();
			},
		},
		beforeUpdate() {
			this.userComments = this.shareContentList.map(() => '');
			this.parserComments = this.shareContentList.map(() => false);
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';
	.share-popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 3rem 3rem 3rem;
		max-height: 70vh;
		overflow-y: auto;
		@media (max-width: 450px) {
			padding: 0 1rem 2rem 1rem;
		}

		&__title {
			text-align: center;
			margin-bottom: 3rem;
			font-weight: 600;
			color: $gray;
		}
		&__share-list {
			margin: 0 0 3rem 0;
			&:last-child {
				margin: 0;
			}
		}
		.r-button {
			font-size: 1.8rem;
			width: 100%;
			padding: 1.5rem 2rem;
			@media (max-width: 450px) {
				padding: 1rem 2rem;
			}
		}
	}
	.share-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 100%;
		width: 100%;
		&__share-list-item {
			margin: 0 0 2rem 0;
			&:last-child {
				margin: 0;
			}
		}
	}
	.share-list-item {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 1rem 1.5rem;
		width: 100%;

		&__title {
			grid-column: 1/-1;
			font-size: 2.8rem;
			margin-bottom: 1.5rem;
			font-weight: 600;
			color: $gray;
			@media (max-width: 500px) {
				font-size: 2rem;
			}
		}
		&__link {
			grid-column: 1/3;
			font-size: 1.8rem;
			height: fit-content;
			align-self: center;
		}
		&__comment-area {
			grid-column: 1/-1;
			max-width: 100%;
		}
		&__error {
			max-width: 100%;
			grid-column: 1/-1;
			color: $red;
		}
		.r-button {
			padding: 1.5rem 2rem;
			justify-self: end;
			width: 30%;
			grid-column: 1/3;
			@media (max-width: 450px) {
				padding: 1rem 2rem;
			}
		}
		.r-input {
			grid-column: 1/-1;
		}
		.r-checkbox {
			grid-column: 1/-1;
		}
	}
	.gooru-comment {
		width: 100%;
		grid-column: 1/-1;
		&__text {
			display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			@media (max-width: 500px) {
				font-size: 1.8rem;
			}
		}
	}
	.social-icon {
		transition: all 0.2 ease;
		&:hover {
			opacity: 0.8;
			cursor: pointer;
		}

		&__image {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			&_background-color_white {
				background-color: $white;
			}
		}
	}
</style>
