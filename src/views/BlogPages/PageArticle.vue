<template>
	<section class="page-article">
		<template v-if="isArticleLoaded && !isArticleNotFound">
			<the-article class="page-article__article" :article="article" ref="article"/>
			<feedback-card @open-appeal-popup="handleOpenNewAppeal" @new-order="handleNewOrder"/>
		</template>
		<r-loader v-else-if="!isArticleLoaded" />
		<div class="not-found" v-else>
			<h2>Такой статьи не существует</h2>
			<button @click="backToAll">Вернуться ко всем разделам?</button>
		</div>
		<!-- <r-modal v-if="isOpenNewAppeal">
			<template v-slot>
				<form 
			</template>
		</r-modal> -->
	</section>
</template>

<script>
	import TheArticle from "@/components/Blog/Article/TheArticle.vue";
	import FeedbackCard from "@/components/Blog/Article/FeedbackCard.vue";

	import { mapState } from "vuex";

	export default {
		name: "PageArticle",
		components: {
			TheArticle,
			FeedbackCard,
		},
		computed: {
			...mapState({
				articles: (state) => state.blog.articles,
			}),
			article() {
				const articleId = +this.$route.params.articleId;
				return (
					this.articles?.find(
						(article) => article.id === articleId
					) || null
				);
			},
			isArticleLoaded() {
				return this.articles.length > 0;
			},
			isArticleNotFound() {
				return this.articles.length !== 0 && this.article === null;
			},
		},
		methods: {
			backToAll() {
				this.$router.push({ name: "blog" });
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-article {
		padding: 0;
		&__article {
			margin: 0 0 5rem 0;
		}
	}
</style>
