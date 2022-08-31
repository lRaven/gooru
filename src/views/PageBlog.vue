<template>
	<div class="page-blog theme-container">
		<the-header />
		<!-- <navigation-panel /> -->
		<navigation-panel-r
			:tabs="blogTabs"
			:tabIcons="tabIcons"
			:currentTab="currentTab"
			:isMenuMinimized="isMenuMinimize"
			@navigate-to="handleNavigate"
			@open-menu="handleOpenMenu"
			@close-menu="handleCloseMenu">
			<template #social-media>
				<div class="social-media" :class="{ 'social-media_minimize': isMenuMinimize}" @click="handleOpenMenu">
					<template v-if="isMenuMinimize">
						<technology-icon />
					</template>
					<template v-else>
						<social-share-icon network="odnoklassniki" :shareContentList="[]"/>
						<social-share-icon network="vk" :shareContentList="[]"/>
						<social-share-icon network="telegram" :shareContentList="[]"/>
					</template>
					
				</div>
			</template>
			</navigation-panel-r>
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
			SocialShareIcon,
			ParsingIcon,
			TechnologyIcon,
			InfinityIcon,
			FileIcon,
		},
		data() {
			return {
				isBlogTabsLoaded: false,
				isNotFoundBlogTab: false,
				isMenuMinimize: false,
			};
		},
		computed: {
			...mapState({
				blogTabs: (state) => state.navigation_panel.blogTabs,
				articles: (state) => state.blog.articles,
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
				const currentRouteParam = this.$route.params.id;
				if (currentRouteParam === "all") {
					return this.blogTabs.find(
						(tab) => tab.params.id === currentRouteParam
					);
				}
				return this.blogTabs.find(
					(tab) => tab.params.id === +currentRouteParam
				);
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
			},
			handleOpenMenu() {
				this.isMenuMinimize = false;
			},
			handleCloseMenu() {
				this.isMenuMinimize = true;
			},
			validPath,
		},
		created() {
			if (this.articles.length === 0) {
				this.getArticles();
			}
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
							console.error("smth went wrong", error);
						});
				} else {
					next((vm) => {
						const tabs = store.state.navigation_panel.blogTabs;
						vm.setBlogTabs(tabs);
					});
				}
			} else {
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
			margin-top: 8.3rem;
			padding: 2rem 4rem;
			overflow-y: auto;
		}
	}
	.the-header {
		padding: 2rem 4rem;
		background-color: $white;
	}
	.navigation-panel {
		padding-top: 8.3rem;
	}
	.social-media {
		margin: 20rem 0 0 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.5rem;
		border-radius: 1rem;
		background-color: rgba($white, 0.5);
		&_minimize {
			background-color: rgba($white, 0.3);
			border-radius: 50%;
			width: fit-content;
			&:hover{
				cursor: pointer;
			}
		}
	}
</style>
