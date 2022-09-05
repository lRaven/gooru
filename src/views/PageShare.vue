<template>
	<div class="page-share theme-container">
		<the-header
			class="bg"
			:isMenuMinimized="isBarMinimized"
			@open_menu="handleOpenBar"
		/>
		<side-bar
			class="page-share__side-bar"
			:isSideBarMinimized="isBarMinimized"
			@open-bar="handleOpenBar"
			@close-bar="handleCloseBar"
		>
			<div
				class="social-share"
				:class="{ 'social-share_minimize': isBarMinimized }"
				@click="handleOpenBar"
			>
				<template v-if="isBarMinimized">
					<svg
						width="24"
						height="24"
						viewBox="0 0 18 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="social-share__open-button"
					>
						<path
							d="M14.1901 18.9998C13.8958 18.9283 13.6054 18.8415 13.3201 18.7398C12.6843 18.4641 12.1636 17.9767 11.8464 17.3606C11.5292 16.7444 11.4351 16.0374 11.5801 15.3598C11.5758 15.3333 11.5758 15.3063 11.5801 15.2798C11.1001 15.0098 10.5801 14.7398 10.1501 14.4598L6.24013 12.2298C6.20274 12.1931 6.15246 12.1726 6.10011 12.1726C6.04776 12.1726 5.99751 12.1931 5.96013 12.2298C5.49183 12.6343 4.90987 12.8842 4.29402 12.945C3.67817 13.0059 3.05856 12.8749 2.52013 12.5698C1.98024 12.265 1.54806 11.8003 1.28303 11.2398C1.01801 10.6793 0.933134 10.0505 1.04012 9.4398C1.15055 8.82763 1.44856 8.26492 1.89287 7.82957C2.33718 7.39421 2.90583 7.10775 3.52013 7.00981C3.95485 6.93375 4.40117 6.95723 4.82552 7.07847C5.24986 7.19971 5.64121 7.41558 5.97014 7.70982C6.002 7.74157 6.04515 7.75938 6.09013 7.75938C6.13512 7.75938 6.17826 7.74157 6.21013 7.70982L11.4901 4.70982H11.5701C11.3863 3.96269 11.4965 3.1735 11.878 2.50535C12.2596 1.8372 12.8833 1.34115 13.6201 1.11979C14.2938 0.913071 15.0187 0.950073 15.6678 1.22434C16.3169 1.49861 16.8488 1.99265 17.1701 2.61979C17.4911 3.24434 17.5829 3.96171 17.4294 4.64695C17.2759 5.33219 16.8869 5.94186 16.3301 6.36979C15.7392 6.81731 15.0035 7.03023 14.2649 6.96745C13.5263 6.90466 12.8371 6.57067 12.3301 6.02982L6.91014 9.11979C7.07992 9.69077 7.07992 10.2988 6.91014 10.8698L12.3301 13.9598C12.7259 13.5391 13.2317 13.2377 13.7901 13.0898C14.2339 12.9752 14.698 12.9638 15.1468 13.0565C15.5956 13.1492 16.0172 13.3435 16.3793 13.6244C16.7414 13.9054 17.0343 14.2656 17.2355 14.6773C17.4367 15.0891 17.5409 15.5415 17.5401 15.9998C17.547 16.7293 17.2878 17.4362 16.8111 17.9884C16.3344 18.5406 15.6728 18.9001 14.9501 18.9998H14.8601H14.1901Z"
							fill="currentColor"
						/>
					</svg>
				</template>
				<template v-else>
					<social-share-icon
						network="odnoklassniki"
						:shareContentList="[
							{
								...content,
								comment: { id: null, text: '' },
								shareUrl: currentShareUrl,
							},
						]"
					/>
					<social-share-icon
						network="vk"
						:shareContentList="[
							{
								...content,
								comment: { id: null, text: '' },
								shareUrl: currentShareUrl,
							},
						]"
					/>
					<social-share-icon
						network="telegram"
						:shareContentList="[
							{
								...content,
								comment: { id: null, text: '' },
								shareUrl: currentShareUrl,
							},
						]"
					/>
				</template>
			</div>
		</side-bar>

		<main class="page-share__content">
			<section class="author" v-if="isAuthorDataLoaded">
				<img class="author__avatar" :src="authorAvatar" />
				<p class="author__name">{{ author.name }}</p>
				<p class="author__surname">{{ author.surname }}</p>
			</section>
			<r-loader v-else />
			<article class="parse-content" v-if="isContentDataLoaded">
				<img v-if="content.image" class="parse-content__image" />
				<h2 class="parse-content__title">{{ content.title }}</h2>
				<p
					class="parse-content__article"
					v-for="(articleChunk, index) in paragraphs"
					:key="index"
				>
					{{ articleChunk }}
				</p>
			</article>
			<r-loader v-else />
		</main>
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader.vue";
	import SideBar from "@/components/SideBar.vue";
	import SocialShareIcon from "@/components/Cabinet/SocialShareIcon.vue";

	import { getSharedParser } from "@/api/parser";

	import { mapState } from 'vuex';

	export default {
		name: "PageShare",
		components: {
			TheHeader,
			SideBar,
			SocialShareIcon,
		},
		provide: {
			async shareParser(index) {
				const { shareUrl } = this.shareContentList[index];
				try {
					window.open(
						this.currentShareLink(index, shareUrl),
						"_blank"
					);
				} catch (error) {
					this.toast.error("Произошла ошибка!");
					console.log(error);
				}
			},
		},
		data() {
			return {
				content: null,
				author: null,
				currentShareUrl: `${process.env.VUE_APP_FRONTEND_URL}/share/${this.$route.params.id}`,
				isBarMinimized: false,
				isAuthorDataLoaded: false,
				isContentDataLoaded: false,
			};
		},
		computed: {
			...mapState({
				documentWidth: (state) => state.document_width,
			}),
			authorAvatar() {
				return `${process.env.VUE_APP_BACK_URL}${this.content.user.avatar}`;
			},
			paragraphs() {
				const array = [];
				const numberOfParagraphs = this.content.article.length / 280;
				if (numberOfParagraphs === 0) {
					return [this.content.article];
				}
				for (
					let paragraphNumer = 0;
					paragraphNumer < numberOfParagraphs;
					paragraphNumer++
				) {
					let chunk = this.content.article.slice(
						paragraphNumer * 280,
						(paragraphNumer + 1) * 280
					);
					array.push(chunk);
				}
				return array;
			},
		},
		methods: {
			handleOpenBar() {
				this.isBarMinimized = false;
			},
			handleCloseBar() {
				this.isBarMinimized = true;
			},
		},
		async created() {
			this.isBarMinimized = this.documentWidth <= 1023;
			try {
				this.content = await getSharedParser(this.$route.params.id);
				this.isContentDataLoaded = true;
				const name = this.content.user.first_name;
				const surname = this.content.user.last_name;
				this.author = { name, surname };
				this.isAuthorDataLoaded = true;
			} catch (error) {
				console.log(error);
				this.isContentDataLoaded = true;
				this.isAuthorDataLoaded = true;
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.page-share {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100vh;
		overflow: hidden;
		background-color: #f1f7ff;

		&__content {
			display: grid;
			grid-template-columns: 1fr 3fr;
			grid-gap: 0 5rem;
			max-width: 100vw;
			overflow-y: auto;
			margin: 8.3rem 0 0 0;
			padding: 3rem 1rem 0 3rem;

			@media (max-width: 1300px) {
				padding: 3rem 1rem 0 9rem;
			}
			@media (max-width: 1023px) {
				grid-template-columns: 1fr;
				grid-gap: 5rem 0;
				padding: 3rem 1rem 0 3rem;
			}
			@media (max-width: 560px) {
				grid-gap: 4rem 0;
				padding: 1.5rem 1rem 0 1rem;
			}
		}
		&__side-bar {
			@media (max-width: 1300px) {
				position: absolute;
			}
		}
	}
	.author {
		display: grid;
		grid-template-rows: max-content min-content min-content;
		justify-items: center;
		grid-gap: 2rem 0;
		padding: 0;
		overflow: visible;
		@media (max-width: 1024px) {
			justify-items: start;
		}
		&__avatar {
			user-select: none;
			width: 200px;
			height: 200px;
			border-radius: 50%;
			-o-object-fit: cover;
			object-fit: cover;
		}
		&__name,
		&__surname {
			font-size: 2.4rem;
			font-weight: 500;
			height: fit-content;
		}
	}
	.parse-content {
		&__title {
			font-size: 5.4rem;
			line-height: 1.5;
			font-weight: 600;
			margin: 0 0 5rem 0;
			@media (max-width: 700px) {
				font-size: 4.4rem;
				margin: 0 0 4rem 0;
			}
			@media (max-width: 560px) {
				font-size: 3.8rem;
				margin: 0 0 3rem 0;
			}
			@media (max-width: 375px) {
				font-size: 3.2rem;
				margin: 0 0 2.5rem 0;
			}
		}
		&__article {
			font-size: 3rem;
			line-height: 1.5;
			font-weight: 400;
			@media (max-width: 700px) {
				font-size: 2.5rem;
			}
			@media (max-width: 560px) {
				font-size: 2.3rem;
			}
			@media (max-width: 375px) {
				font-size: 2rem;
			}
		}
	}
	.social-share {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		gap: 1.5rem;
		padding: 1.5rem;
		border-radius: 1rem;
		background-color: rgba($white, 0.5);
		transition: all 0.2s ease-in;
		&_minimize {
			background-color: transparent;
			border-radius: 50%;
			width: fit-content;

			&:hover {
				background-color: rgba($white, 0.3);
				cursor: pointer;
				path {
					fill-opacity: 1;
				}
			}
		}
		&__open-button {
			path {
				fill: $white;
				fill-opacity: 0.5;
			}
		}
	}
</style>
