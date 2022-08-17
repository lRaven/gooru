<template>
  <div class="page-share">
    <the-header />
    <main class="page-share__content">
      <section class="author" v-if="isAuthorDataLoaded">
        <img class="author__avatar" src="/img/icon/cabinet/no-avatar.svg"/>
        <p class="author__name"></p>
        <p class="author__surname"></p>
      </section>
      <r-loader v-else />
      <section class="meta-info">
        <button class="meta-info__source"></button>
        <div class="social-share">
          <social-share-icon network="odnoklassniki" :shareContentList="[content]"></social-share-icon>
          <social-share-icon network="vk" :shareContentList="[content]"></social-share-icon>
          <social-share-icon network="telegram" :shareContentList="[content]"></social-share-icon>
        </div>
      </section>
      <section class="parse-content" v-if="isContentDataLoaded">
        <img class="parse-content__image" />
        <h2 class="parse-content__title"></h2>
        <p class="parse-content__article"></p>
      </section>
      <r-loader v-else />
    </main>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import SocialShareIcon from "@/components/Cabinet/SocialShareIcon.vue"

import { getParser } from "@/api/parser";

export default {
  name: "PageShare",
  components: {
    TheHeader,
    SocialShareIcon,
  },
  data() {
    return {
      content: null,
      author: null,
      isAuthorDataLoaded: false,
      isContentDataLoaded: false,
    }
  },
  async created() {
    try {

      this.content = await getParser(this.$route.params.id);
      this.isContentDataLoaded = true;
      // пока пишем пользователь gooru, т.к. этот момент ещё не решен
      // думаю, позже будем затягивать данные о пользователе из базы через публичный роут
      this.author = { name: 'Пользователь', surname: 'Gooru' };
      this.isAuthorDataLoaded = true;
    } catch (error) {
      console.log(error);
      this.isContentDataLoaded = true;
      this.isAuthorDataLoaded = true;
    }
  },
  setup() {

  }
}
</script>

<style>

</style>