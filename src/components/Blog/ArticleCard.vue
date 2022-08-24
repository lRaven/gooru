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
			<img
				v-if="article.image"
				class="article-card__image"
				:src="article.image"
				alt="Изображение связанное со статьей"
			/>
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
				return this.article.content.slice(0, 200) + "...";
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
					return 'Автор'
				}
			}
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
	.article-card {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: max-content;
		grid-auto-flow: column;
		grid-gap: 2rem 4rem;

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
		&__image {
			width: 100%;
			&:hover {
				transform: scale(1.01);
				transition: all 0.2s linear;
			}
		}
		&__author-img {
			width: 100%;
		}
		&__author-name {
			text-align: center;
			grid-row: 2/3;
		}
	}
</style>
