<template>
	<section class="page-articles">
		<template v-if="articles.length">
			<article-card
				v-for="article in articles"
				:article="article"
				:key="article.id"
			/>
		</template>
		<div v-else class="empty">
			<span  class="empty__text">Здесь пока пусто</span>
			<img class="empty__image" src="/img/blog/emptyBlog.svg" alt="картинка пустых папок" />
		</div>
		
	</section>
</template>

<script>
	import ArticleCard from "@/components/Blog/ArticleCard.vue";

	import { mapGetters } from "vuex";
	import store from "@/store";

	export default {
		name: "PageArticles",
		components: {
			ArticleCard,
		},
		computed: {
			...mapGetters(["getArticlesByTopic"]),
			articles() {
				const currentParam = this.$route.params.id;
				if (currentParam === "all") {
					return store.state.blog.articles;
				}
				return this.getArticlesByTopic(+currentParam);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.page-articles {
		display: grid;
		grid-gap: 5rem 0;
		padding: 0;
		justify-content: center;
		@media (max-width: 600px) {
			padding: 0 1rem;
		}
	}
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rem 0 0 0;
		&__text {
			font-size: 2.4rem;
			font-weight: 500;
			margin: 0 0 5rem 0;
			color: $dark
		}
		&__image {
			width: 100%;
			object-fit: contain;
			object-position: center;
		}
	}
</style>
