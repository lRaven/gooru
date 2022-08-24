

<script>
import { h } from '@vue/runtime-core'
export default {
  render() {
    
    return h('div', { class: 'article' }, [
      h('h1', { class: 'article__title' }, this.article.title),
    ] )
  },
  name: 'TheArticle',
  props: {
    article: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
  }
}
</style>