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

	import { mapState } from "vuex";

	export default {
		name: "PageArticles",
		components: {
			ArticleCard,
		},
		computed: {
			...mapState({
				articles: (state) => state.blog.articles,
			})
		}
	};
</script>

<style lang="scss" scoped>
	.page-articles {
    display: grid;
    grid-gap: 5rem 0;
    padding: 0;
	}
</style>
