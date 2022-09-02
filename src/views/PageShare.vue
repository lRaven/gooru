<template>
	<div class="page-share theme-container">
		<the-header class="bg"/>
    <section class="meta-info">
				<button class="meta-info__source"></button>
				<div class="social-share">
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
				</div>
        <img class="meta-info__gooru-image" src="/img/icon/cabinet/goo.svg" />
			</section>
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
				<p class="parse-content__article">{{ content.article }}</p>
			</article>
			<r-loader v-else />
		</main>
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader.vue";
	import SocialShareIcon from "@/components/Cabinet/SocialShareIcon.vue";

	import { getSharedParser } from "@/api/parser";

	export default {
		name: "PageShare",
		components: {
			TheHeader,
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
				isAuthorDataLoaded: false,
				isContentDataLoaded: false,
			};
		},
		computed: {
			authorAvatar() {
				return `${process.env.VUE_APP_BACK_URL}${this.content.user.avatar}`;
			},
		},
		async created() {
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
    }
  }
	.author {
    display: grid;
    grid-template-rows: max-content min-content min-content;
    justify-items: center;
    grid-gap: 2rem 0;
    padding: 0;
		&__avatar {
			user-select: none;
			width: 100%;
      max-width: 30rem;
			border-radius: 50%;
			-o-object-fit: cover;
			object-fit: cover;
		}
    &__name, &__surname {
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
    }
    &__article {
      font-size: 3rem;
      line-height: 1.5;
      font-weight: 400;
    }
  }
  .meta-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
    height: 100%;
    margin: 8.3rem 0 0 0;
    padding: 3rem 1rem 0 1rem;
    background: linear-gradient(
			350.85deg,
			#542f7d -40.69%,
			#338dd0 109.26%
		);
    &__gooru-image {
      width: 19rem;
			margin: auto 0 8rem 0;
			@media (max-width: 1023px) {
				display: none;
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
  }
</style>
