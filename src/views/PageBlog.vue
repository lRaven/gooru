<template>
	<div class="page-blog theme-container">
		<the-header
			class="bg"
			:isMenuMinimized="isMenuMinimize"
			:isBlogVersion="true"
			@open_menu="handleOpenMenu"
			@close_menu="handleCloseMenu"
		/>
		<side-bar
			class="page-blog__sidebar-panel"
			:isSideBarMinimized="isMenuMinimize"
			@close-bar="handleCloseMenu"
			@open-bar="handleOpenMenu"
		>
			<navigation-panel-r
				:tabs="blogTabs"
				:tabIcons="tabIcons"
				:currentTab="currentTab"
				:isMenuMinimized="isMenuMinimize"
				@navigate-to="handleNavigate"
			>
			</navigation-panel-r>
			<template v-if="sharedArticle.length">
				<div
					class="social-media"
					:class="{ 'social-media_minimize': isMenuMinimize }"
					@click="handleOpenMenu"
				>
					<template v-if="isMenuMinimize">
						<svg
							width="24"
							height="24"
							viewBox="0 0 18 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="social-media__open-button"
						>
							<path
								d="M14.1901 18.9998C13.8958 18.9283 13.6054 18.8415 13.3201 18.7398C12.6843 18.4641 12.1636 17.9767 11.8464 17.3606C11.5292 16.7444 11.4351 16.0374 11.5801 15.3598C11.5758 15.3333 11.5758 15.3063 11.5801 15.2798C11.1001 15.0098 10.5801 14.7398 10.1501 14.4598L6.24013 12.2298C6.20274 12.1931 6.15246 12.1726 6.10011 12.1726C6.04776 12.1726 5.99751 12.1931 5.96013 12.2298C5.49183 12.6343 4.90987 12.8842 4.29402 12.945C3.67817 13.0059 3.05856 12.8749 2.52013 12.5698C1.98024 12.265 1.54806 11.8003 1.28303 11.2398C1.01801 10.6793 0.933134 10.0505 1.04012 9.4398C1.15055 8.82763 1.44856 8.26492 1.89287 7.82957C2.33718 7.39421 2.90583 7.10775 3.52013 7.00981C3.95485 6.93375 4.40117 6.95723 4.82552 7.07847C5.24986 7.19971 5.64121 7.41558 5.97014 7.70982C6.002 7.74157 6.04515 7.75938 6.09013 7.75938C6.13512 7.75938 6.17826 7.74157 6.21013 7.70982L11.4901 4.70982H11.5701C11.3863 3.96269 11.4965 3.1735 11.878 2.50535C12.2596 1.8372 12.8833 1.34115 13.6201 1.11979C14.2938 0.913071 15.0187 0.950073 15.6678 1.22434C16.3169 1.49861 16.8488 1.99265 17.1701 2.61979C17.4911 3.24434 17.5829 3.96171 17.4294 4.64695C17.2759 5.33219 16.8869 5.94186 16.3301 6.36979C15.7392 6.81731 15.0035 7.03023 14.2649 6.96745C13.5263 6.90466 12.8371 6.57067 12.3301 6.02982L6.91014 9.11979C7.07992 9.69077 7.07992 10.2988 6.91014 10.8698L12.3301 13.9598C12.7259 13.5391 13.2317 13.2377 13.7901 13.0898C14.2339 12.9752 14.698 12.9638 15.1468 13.0565C15.5956 13.1492 16.0172 13.3435 16.3793 13.6244C16.7414 13.9054 17.0343 14.2656 17.2355 14.6773C17.4367 15.0891 17.5409 15.5415 17.5401 15.9998C17.547 16.7293 17.2878 17.4362 16.8111 17.9884C16.3344 18.5406 15.6728 18.9001 14.9501 18.9998H14.8601H14.1901Z"
								fill="currentColor"
							/>
						</svg>
					</template>
					<template v-else>
						<social-share-icon
							class="social-icon_background-color_white"
							network="odnoklassniki"
							:shareContentList="sharedArticle"
						/>
						<social-share-icon
							network="vk"
							:shareContentList="sharedArticle"
						/>
						<social-share-icon
							network="telegram"
							:shareContentList="sharedArticle"
						/>
					</template>
					<span v-if="isError" class="social-media__empty-error"
						>Необходимо просматривать статью!</span
					>
				</div>
			</template>
		</side-bar>
		<main class="page-blog__main">
			<router-view
				v-if="isBlogTabsLoaded && !isNotFoundBlogTab"
				v-slot="{ Component }"
			>
				<transition mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
			<r-loader v-else-if="!isBlogTabsLoaded" />
			<div class="not-found" v-else>
				<h2>Такого раздела в блоге не существует</h2>
				<button @click="backToAll">Вернуться ко всем разделам?</button>
			</div>
		</main>
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader.vue";
	import SideBar from "@/components/SideBar.vue";
	import NavigationPanelR from "@/components/NavigationPanelR.vue";
	import SocialShareIcon from "@/components/Cabinet/SocialShareIcon.vue";

	import InfinityIcon from "@/assets/icons/InfinityIcon.vue";
	import ParsingIcon from "@/assets/icons/ParsingIcon.vue";
	import TechnologyIcon from "@/assets/icons/TechnologyIcon.vue";
	import FileIcon from "@/assets/icons/FileIcon.vue";

	import { mapState, mapActions, mapMutations } from "vuex";
	import { getTabs } from "@/api/blog";
	import store from "@/store";

	const validPath = (blogTabs, supposeBlogSection) => {
		if (supposeBlogSection === "all") {
			return true;
		}
		return blogTabs.find((tab) => tab.id === +supposeBlogSection);
	};

	export default {
		components: {
			TheHeader,
			NavigationPanelR,
			SideBar,
			SocialShareIcon,
			ParsingIcon,
			TechnologyIcon,
			InfinityIcon,
			FileIcon,
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
				isBlogTabsLoaded: false,
				isNotFoundBlogTab: false,
				isMenuMinimize: false,
			};
		},
		watch: {
			documentWidth() {
				if (this.documentWidth <= 1023) {
					this.isMenuMinimize = true;
				}
			},
		},
		computed: {
			...mapState({
				blogTabs: (state) => state.navigation_panel.blogTabs,
				articles: (state) => state.blog.articles,
				documentWidth: (state) => state.document_width,
			}),
			tabIcons() {
				const iconObject = {};
				this.blogTabs.forEach((tab) => {
					switch (tab.text) {
						case "Все":
							iconObject[tab.text] = InfinityIcon;
							break;
						case "Парсинг":
							iconObject[tab.text] = ParsingIcon;
							break;
						case "Технологии":
							iconObject[tab.text] = TechnologyIcon;
							break;
						default:
							iconObject[tab.text] = FileIcon;
							break;
					}
				});
				return iconObject;
			},
			currentTab() {
				const currentRouteParams = this.$route.params;
				if (currentRouteParams?.id) {
					if (currentRouteParams.id === "all") {
						return this.blogTabs.find(
							(tab) => tab.params.id === currentRouteParams.id
						);
					}
					return this.blogTabs.find(
						(tab) => tab.params.id === +currentRouteParams.id
					);
				} else if (currentRouteParams?.articleId) {
					const matchedArticle = this.articles?.find(
						(article) =>
							article.id === +currentRouteParams.articleId
					);
					return this.blogTabs.find(
						(tab) => tab.params.id === matchedArticle?.topic
					);
				} else {
					return this.blogTabs[0];
				}
			},
			sharedArticle() {
				const currentRouteParams = this.$route.params;
				const matchedArticle = this.articles?.find(
					(article) => article.id === +currentRouteParams.articleId
				);
				if (matchedArticle) {
					const { title, id } = matchedArticle;
					const shareUrl = `${process.env.VUE_APP_FRONTEND_URL}${this.$route.fullPath}`;
					return [{ title, id, url: window.location, comment: { text: "", id: null }, shareUrl, },];
				}
				return [];
			},
		},
		methods: {
			...mapActions(["getBlogNavigation", "getArticles"]),
			...mapMutations(["SET_BLOG_TABS"]),
			setBlogTabs(tabs) {
				this.SET_BLOG_TABS(tabs);
				this.isBlogTabsLoaded = true;
			},
			backToAll() {
				this.isNotFoundBlogTab = false;
				this.$router.push({ name: "blog" });
			},
			handleNavigate(tabName) {
				const params = tabName.params ? tabName.params : {};
				this.$router.push({ name: tabName.name, params });
				if (this.documentWidth <= 1023) {
					this.isMenuMinimize = true;
				}
			},
			handleOpenMenu() {
				console.log('open')
				this.isMenuMinimize = false;
			},
			handleCloseMenu() {
				console.log('close')
				this.isMenuMinimize = true;
			},
			validPath,
		},
		created() {
			if (this.articles.length === 0) {
				this.getArticles();
			}
			this.isMenuMinimize = this.documentWidth <= 1023;
		},
		beforeRouteEnter(to, from, next) {
			// TODO: написать мидлвары для разрешения перехода по всем путям дочерних компонентов
			// убрать логику проверки статьи на существование из компонента PageArticle
			if (to.name === "blog-articles") {
				let supposeBlogId = to.params.id;
				if (store.state.navigation_panel.blogTabs.length === 1) {
					getTabs()
						.then((topics) => {
							const tabs = topics.reduce(
								(prev, { id, topic }) => {
									return [
										...prev,
										{
											id: id,
											text: topic,
											name: "blog-articles",
											params: { id },
										},
									];
								},
								[...store.state.navigation_panel.blogTabs]
							);
							if (validPath(topics, supposeBlogId)) {
								next((vm) => {
									vm.setBlogTabs(tabs);
								});
							} else {
								next((vm) => {
									vm.setBlogTabs(tabs);
									vm.isNotFoundBlogTab = true;
									vm.isBlogTabsLoaded = true;
								});
							}
						})
						.catch((error) => {
							next(error);
						});
				} else {
					next((vm) => {
						const tabs = store.state.navigation_panel.blogTabs;
						vm.setBlogTabs(tabs);
					});
				}
			} else {
				if (store.state.navigation_panel.blogTabs.length === 1) {
					getTabs().then((topics) => {
					const tabs = topics.reduce(
						(prev, { id, topic }) => {
							return [
								...prev,
								{
									id: id,
									text: topic,
									name: "blog-articles",
									params: { id },
								},
							];
						},
						[...store.state.navigation_panel.blogTabs]
					);
					next((vm) => {
						vm.setBlogTabs(tabs);
					});
				});
				} else {
					next((vm) => {
					vm.setBlogTabs(store.state.navigation_panel.blogTabs);
				});
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.page-blog {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100vh;
		overflow: hidden;
		background-color: $light-blue;
		&__main {
			max-width: 100vw;
			margin: 84px 0 0 0;
			padding: 2rem 4rem;
			overflow-y: auto;
			@media (max-width: 600px) {
				padding: 1.5rem 0rem;
			}
			@media (max-width: 450px) {
				padding: 1.5rem 0;
			}
		}
		&__sidebar-panel {
			@media (max-width: 1023px) {
				padding: 4rem 1.5rem 1.5rem 1.5rem;
			}
			@media (max-width: 560px) {
				padding: 2rem 1.5rem 1.5rem 1.5rem;
			}
			@media (max-width: 450px) {
				padding: 1.5rem 1.5rem 1.5rem 1.5rem;
			}
		}
	}
	.the-header {
		padding: 2rem 4rem;
		background-color: $white;
	}

	.social-media {
		margin: 20rem 0 0 0;
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
