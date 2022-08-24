<template>
	<div class="page-blog theme-container">
		<the-header />
		<navigation-panel />
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
	import NavigationPanel from "@/components/Cabinet/NavigationPanel.vue";

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
		components: { TheHeader, NavigationPanel },
		data() {
			return {
				isBlogTabsLoaded: false,
				isNotFoundBlogTab: false,
			};
		},
		computed: {
			...mapState({
				blogTabs: (state) => state.navigation_panel.blogTabs,
				articles: (state) => state.blog.articles,
			}),
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
											tab: topic,
											selected: false,
											icon_fill: "",
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
									(vm) => vm.setBlogTabs(tabs);
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
							return [ ...prev, { id: id, tab: topic, selected: false, icon_fill: "", }, ];
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
</style>
