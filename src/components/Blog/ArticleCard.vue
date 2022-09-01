<template>
	<div class="article-card">
		<img
			v-if="article.author_avatar"
			class="article-card__author-img"
			:src="authorAvatar"
			alt="Фото автора"
		/>
		<h3 class="article-card__author-name">{{ article.author_name }}</h3>
		<div class="article-card__content">
			<div v-if="article.image" class="article-card__image-wrapper">
				<img
					class="article-card__image"
					:src="article.image"
					alt="Изображение связанное со статьей"
				/>
			</div>
			<h2 class="article-card__title">{{ article.title }}</h2>
			<p class="article-card__preview">{{ articlePreview }}</p>
			<r-button
				@click="handleViewButton(article.id)"
				text="Читать"
			></r-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ArticleCard",
		props: {
			article: {
				type: Object,
				required: true,
			},
		},
		computed: {
			articlePreview() {
				return (this.article.content.slice(0, 200) + "...").replace(/\<\w+>/gm,""); // eslint-disable-line
			},
			authorAvatar() {
				if (this.article.author_avatar.includes("http")) {
					return this.article.author_avatar;
				} else {
					return (
						`${process.env.VUE_APP_BACK_URL}` +
						this.article.author_avatar
					);
				}
			},
			authorName() {
				if (this.article.author_name) {
					return this.article.author_name;
				} else {
					return "Автор";
				}
			},
		},
		methods: {
			handleViewButton(articleId) {
				this.$router.push({
					name: "blog-article",
					params: {
						articleId: articleId,
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.article-card {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: max-content;
		grid-auto-flow: column;
		grid-gap: 2rem 4rem;
		border-radius: 1rem;
		padding: 0 1rem 0 0;
		@media (min-width: 1500px) {
			max-width: 1500px;
		}
		@media (max-width: 800px) {
			grid-gap: 1.5rem 3rem;
		}

		&__title {
			font-weight: 500;
			margin-bottom: 3rem;
		}
		&__preview {
			font-size: 2.4rem;
			margin-bottom: 3.5rem;
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			grid-row: 1/4;

			.r-button {
				width: 30%;
				align-self: flex-end;
				padding: 1.5rem;
			}
		}
		&__image-wrapper {
			overflow: hidden;
			margin-bottom: 3rem;
			border-radius: 1rem;
		}
		&__image {
			width: 100%;
			max-width: 1100px;
			transition: all 0.3s linear;
			&:hover {
				transform: scale(1.15);
				
			}
		}
		&__author-img {
			width: 100%;
			max-width: 370px;
			border-radius: 50%;
		}
		&__author-name {
			text-align: center;
			grid-row: 2/3;
		}
	}
</style>
