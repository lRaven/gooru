<template>
	<section class="page-articles">
		<article-card
			v-for="article in articles"
			:article="article"
			:key="article.id"
		/>
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
				if (currentParam === 'all') {
					return store.state.blog.articles;
				}
				return this.getArticlesByTopic(+currentParam);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.page-articles {
    display: grid;
    grid-gap: 5rem 0;
    padding: 0;
		justify-content: center;
		@media (max-width: 600px) {
			padding: 0 1rem;
		}
	}
</style>
