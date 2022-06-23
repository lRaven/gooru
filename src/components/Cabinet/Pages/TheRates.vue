<template>
  <section class="the-rates">
    <template v-if="!user.rate">
      <h2 class="the-rates__title">Выберите тариф</h2>
      <div class="the-rates__body">
        <rate-card
          v-for="rate in rates"
          :key="rate.id"
          :rate="rate"
          color="white"
          ButtonText="Оплатить"
          @selectRate="select_rate"
        ></rate-card>

        <div class="the-rates__brief">
          <div class="the-rates__brief-col">
            <p class="the-rates__brief-text">
              <span class="the-rates__brief-text-big">не знаете,</span>
              что вам подходит?
            </p>
            <p class="the-rates__brief-text-big">Мы вам поможем!</p>
            <p class="the-rates__brief-text">
              Для этого ответьте на 8 простых вопросов
            </p>
          </div>

          <r-button
            text="Ответить на вопросы"
            @click="this.$router.push({ name: 'brief' })"
          ></r-button>
        </div>

        <div class="the-rates__help">
          <div class="the-rates__help-row">
            <h4 class="the-rates__help-text-bold">Получить<br />помощь</h4>
            <h4 class="the-rates__help-text">от менеджера</h4>
          </div>

          <r-button
            text="Написать менеджеру"
            color="white"
            @click="
              this.$router.push({
                name: 'appeals',
                query: { page: 1 },
              })
            "
          ></r-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="rate-info-cards the-rates__rate-info-cards">
        <h2
          class="rate-info-cards__title rate-info-cards__title_area_first-title"
        >
          Статистика за сегодня
        </h2>
        <rate-info-card
          :cardItems="cardItems[0]"
          cardClass="rate-info-card rate-info-cards__rate-info-card_area_today-stats"
          cardItemClass="rate-info-item rate-info-card__rate-info-item"
          cardItemTitleClass="rate-info-item__title"
          cardItemValueClass="rate-info-item__value"
        />

        <h2
          class="rate-info-cards__title rate-info-cards__title_area_second-title"
        >
          Общая статистика
        </h2>
        <rate-info-card
          :cardItems="cardItems[1]"
          cardClass="rate-info-card rate-info-cards__rate-info-card_area_total-stats"
          cardItemClass="rate-info-item rate-info-card__rate-info-item"
          cardItemTitleClass="rate-info-item__title"
          cardItemValueClass="rate-info-item__value"
        />

        <h2
          class="rate-info-cards__title rate-info-cards__title_area_third-title rate-info-cards__title_current-rate"
        >
          Текущий тариф
        </h2>
        <rate-info-card
          :cardItems="cardItems[2]"
          :hasTitle="true"
          cardTitle="«Ознакомительный»"
          cardClass="rate-info-card rate-info-card_current-rate rate-info-cards__rate-info-card_area_current-rate"
          cardTitleClass="rate-info-card__title"
          cardItemClass="rate-info-item rate-info-item_inline rate-info-card__rate-info-item_inline"
          cardItemTitleClass="rate-info-item__title_inline"
          cardItemValueClass="rate-info-item__value_inline"
        />
        <div
          class="rate-info-cards__buttons rate-info-cards__buttons_area_contol-buttons"
        >
          <r-button
            class="rate-info-cards__pay-button"
            text="Перейти к оплате"
          />
          <r-button
            class="rate-info-cards__change-rate-button"
            color="bordered"
            text="Сменить тариф"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import RateCard from "@/components/Rates/RateCard.vue";
import RateInfoCard from "@/components/Rates/RateInfo/RateInfoCard.vue";
import rButton from "@/components/r-button.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TheRates",
  components: {
    RateCard,
    RateInfoCard,
    rButton,
  },
  data() {
    return {
      cardItems: [
        [
          { id: 1, title: "Парсеров выполняется", value: 3 },
          { id: 2, title: "Парсеров завершено", value: 0 },
          { id: 3, title: "Обработанно источников", value: 1458 },
          { id: 4, title: "Найдено новых", value: 8 },
        ],
        [
          { id: 1, title: "Парсеров запущено", value: 23 },
          { id: 2, title: "Парсеров завершено", value: 0 },
          { id: 3, title: "Обработанно источников", value: 1458 },
          { id: 4, title: "Найдено новых", value: 8 },
        ],
        [
          { id: 1, title: "Дата оплаты:", value: "15.04.2021" },
          { id: 2, title: "Суммы оплаты:", value: "15 500 р." },
          { id: 3, title: "Повтор оплаты:", value: "16.04.2022" },
          { id: 4, title: "Сумма к оплате:", value: "16 000 р." },
        ],
      ],
    };
  },
  computed: {
    ...mapState({
      rates: (state) => state.rates.rates,
      user: (state) => state.cabinet.user,
    }),
  },
  methods: {
    ...mapMutations(["SET_TAB"]),

    select_rate(id) {
      return id;
    },
  },
  created() {
    this.SET_TAB("rates");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.the-rates {
  padding: 4rem;

  &__title {
    font-weight: 400;
    grid-column: 1/3;
    margin-bottom: 4rem;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(4, 30rem);
    grid-gap: 4rem 3rem;
  }

  &__brief {
    display: flex;
    justify-content: space-between;
    border-radius: 2rem;
    padding: 3rem 3rem 3rem 4rem;
    grid-column: 1/4;
    background: url("/public/img/brief/brief-bg.png") center / 120% auto
      no-repeat;
    background-position: 0 70%;
    &-text {
      color: $white;
      font-size: 2.4rem;
      font-weight: 600;
      &:first-child {
        margin-bottom: 1rem;
      }
      &:last-child {
        margin-bottom: 1.2rem;
      }

      &-big {
        text-transform: uppercase;
        color: $white;
        font-size: 3.2rem;
        font-weight: 600;
        &:nth-child(2) {
          margin-bottom: 1rem;
          margin-left: auto;
        }
      }
    }

    &-col {
      display: flex;
      flex-direction: column;
    }
    .r-button {
      margin-top: auto;
      padding: 1.2rem 3rem;
      height: max-content;
    }
  }
  &__help {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    background-color: $secondary;
    border-radius: 2rem;
    padding: 2rem 2rem 3rem 2rem;
    &-text {
      color: $white;
      line-height: 1.2;
      &-bold {
        font-weight: 600;
        color: $white;
        line-height: 1.2;
      }
    }

    .r-button {
      padding: 1.2rem 3rem;
      width: 100%;
      margin-top: auto;
    }
  }
  .rate-info-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, min-content);
    grid-column-gap: 14.1rem;
    column-gap: 14.1rem;
    grid-template-areas:
      "firstTitle secondTitle"
      "todayStats totalStats"
      "thirdTitle ."
      "currentRate controlButtons";
    &__title {
      font-size: 3.2rem;
      font-weight: 400;
      line-height: 4.5rem;
      text-align: left;
      margin: 0 0 3rem 0;
      &_area {
        &_first-title {
          grid-area: firstTitle;
        }
        &_second-title {
          grid-area: secondTitle;
        }
        &_third-title {
          grid-area: thirdTitle;
        }
      }
      &_current-rate {
        margin: 6.8rem 0 4rem 0;
      }
    }
    &__rate-info-card {
      &_area {
        &_today-stats {
          grid-area: todayStats;
        }
        &_total-stats {
          grid-area: totalStats;
        }
        &_current-rate {
          grid-area: currentRate;
        }
      }
    }
    &__pay-button {
      max-width: 21.7rem;
      max-height: 5.4rem;
      border-radius: 0.8rem;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 2.1rem;
      text-align: center;
      margin: 0 0 2rem 0;
    }
    &__change-rate-button {
      max-width: 17rem;
      max-height: 4.1rem;
      border-radius: 1rem;
      opacity: 0.8;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.1rem;
      text-align: center;
      padding: 1rem 2.8rem;
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      &_area {
        &_contol-buttons {
          grid-area: controlButtons;
        }
      }
    }
  }
}
</style>
