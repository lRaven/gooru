<template>
  <p class="the-favorites__right-panel-counter-wrapper">
    <span class="the-favorites__right-panel-counter">{{ totalSelected }}</span>
    материала
  </p>
  <r-spoiler title="Выложить в соц.сети" arrowType="gray">
    <template v-slot>
      <div class="the-favorites__right-panel-social">
        <ShareNetwork
          network="facebook"
          :url="shareContent.url"
          :title="shareContent.title"
          :description="shareContent.description"
          :media="shareContent.image"
          :quote="shareContent.quote"
          :hashtags="shareContent.hashtags"
        >
          <img src="img/icon/cabinet/fb.svg" alt="facebook" />
        </ShareNetwork>

        <ShareNetwork
          network="odnoklassniki"
          :url="shareContent.url"
          :title="shareContent.title"
          :description="shareContent.description"
          :media="shareContent.image"
        >
          <img src="img/icon/cabinet/ok.svg" alt="ok" />
        </ShareNetwork>

        <ShareNetwork
          network="vk"
          :url="shareContent.url"
          :title="shareContent.title"
          :description="shareContent.description"
          :media="shareContent.image"
        >
          <img src="img/icon/cabinet/vk.svg" alt="vk"  ref="vk"/>
        </ShareNetwork>

        <ShareNetwork
          network="twitter"
          :url="shareContent.url"
          :title="shareContent.title"
          :description="shareContent.description"
          :media="shareContent.image"
          :hashtags="shareContent.hashtags"
        >
          <img src="img/icon/cabinet/twtr.svg" alt="twitter" />
        </ShareNetwork>

        <ShareNetwork
          network="telegram"
          :url="shareContent.url"
          :title="shareContent.title"
          :description="shareContent.description"
          :media="shareContent.image"
        >
          <img src="img/icon/cabinet/tg.svg" alt="tg" />
        </ShareNetwork>
      </div>
    </template>
  </r-spoiler>

  <r-spoiler title="Скачать" arrowType="gray">
    <template v-slot>
      <div class="the-favorites__right-panel__checkboxes">
        <r-checkbox
          @update:modelValue="handleDownloadCheckBox"
          :disabled="downloadCheckBoxState['Excel'].isDisabled"
          description="Excel"
        ></r-checkbox>
        <r-checkbox
          @update:modelValue="handleDownloadCheckBox"
          :disabled="downloadCheckBoxState['CSV'].isDisabled"
          description="CSV"
        ></r-checkbox>
        <r-checkbox
          @update:modelValue="handleDownloadCheckBox"
          :disabled="downloadCheckBoxState['Google Sheets'].isDisabled"
          description="Google Sheets"
        ></r-checkbox>
      </div>
      <r-button
        @click="handleClickDownload"
        text="Скачать"
        :disabled="isDisabledDownlaodButton || !selectedParsources.length"  
      ></r-button>
    </template>
  </r-spoiler>

  <r-spoiler title="Удалить" arrowType="gray">
    <template v-slot>
      <div class="the-favorites__right-panel__checkboxes">
        <r-checkbox
          @update:modelValue="handleRemoveButtonCheckBox"
          description="Подтверждаете удаление"
        ></r-checkbox>
      </div>
      <r-button
        @click="handleClickRemoveButton"
        :disabled="!confirmRemoveValue || !selectedParsources.length"
        text="Удалить"
      ></r-button>
    </template>
  </r-spoiler>
</template>

<script>
import rSpoiler from "@/components/r-spoiler";
import rCheckbox from "@/components/r-checkbox";
import rButton from "@/components/r-button";

import { mapState, mapActions } from "vuex";

import { multiaction_delete } from "@/api/multiaction_delete";
import { downloadFile } from "@/api/parserApi";

export default {
  components: {
    rSpoiler,
    rCheckbox,
    rButton,
  },
  props: {
    totalSelected: {
      type: [Number, String],
      default: 0,
    },
    selectedParsources: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      confirmRemoveValue: false,
      downloadCheckBoxState: {
        Excel: {
          isSelected: false,
          isDisabled: false,
        },
        CSV: {
          isSelected: false,
          isDisabled: false,
        },
        "Google Sheets": {
          isSelected: false,
          isDisabled: false,
        },
      },
      shareContent: {
        url: window.location.href,
        title: "",
        description: "",

        // *fb only
        quote: "",
        //*fb, twtr only
        hashtags: "",
      },
    };
  },
  computed: {
    ...mapState({
      favorites: (state) => state.favotites.favotites,
    }),
    ...mapActions(["getFavoriteParsers"]),
    isDisabledDownlaodButton() {
      return !Object.values(this.downloadCheckBoxState).find(
        (currentCheckBoxState) => {
          return currentCheckBoxState.isSelected === true;
        }
      );
    },
  },
  methods: {
    handleDownloadCheckBox(checkboxData) {
      Object.keys(this.downloadCheckBoxState).forEach((key) => {
        if (key === checkboxData.description) {
          this.downloadCheckBoxState[`${key}`].isSelected =
            checkboxData.isSelected;
        } else {
          this.downloadCheckBoxState[`${key}`].isSelected = false;
          this.downloadCheckBoxState[`${key}`].isDisabled =
            checkboxData.isSelected;
        }
      });
    },
    handleRemoveButtonCheckBox(isConfirmed) {
      this.confirmRemoveValue = isConfirmed.isSelected;
    },
    
    async handleClickDownload() {
      try {
        let selectedCheckBox = null;
        Object.keys(this.downloadCheckBoxState).forEach((key) => {
          if (this.downloadCheckBoxState[`${key}`].isSelected) {
            selectedCheckBox = key;
            return;
          }
        });
        let dataFileType = null;
        switch (selectedCheckBox) {
          case "Excel":
            dataFileType = "xls";
            break;
          case "CSV":
            dataFileType = "csv";
            break;
          default:
            dataFileType = "json";
            break;
        }
        const fileData = await downloadFile({ type: dataFileType });

        const downloadUrl = window.URL.createObjectURL(fileData);
        const linkForDownload = document.createElement("a");
        linkForDownload.href = downloadUrl;
        linkForDownload.download = `favoritesParsersData.${dataFileType}`;
        document.body.appendChild(linkForDownload);
        linkForDownload.click();
        linkForDownload.remove();

      } catch (error) {
        console.log(error);
      }
    },
    async handleClickRemoveButton() {
      try {
        //  найти объект источника парсинга в сторе
        //  отфильтровать его парсеры по выбраным
        // сохранить обновленный стор
        /* this.selectedParsources.forEach( selectedParsource => {
                    const matchedIndex = this.favorites.findIndex( favoriteParsource => {
                        return favoriteParsource.id === selectedParsource.parsourceId;
                    });
                    selectedParsource.selectedParsers.map( parserToRemove => {
                        const indexToRemove = this.favorites[matchedIndex].parsers.findIndex()
                    })
                    const filteredParsers = this.favorites[matchedIndex].parsers.filter( parser => {
                        return parser.id !== 
                    } )
                }); */
        this.selectedParsources.forEach(async (selectedParsource) => {
          try {
            await multiaction_delete({
              model: "favorites",
              ids: selectedParsource.selectedParsers,
            });
          } catch (error) {
            console.log(error);
          }
        });
        await this.getFavoriteParsers();
        this.confirmRemoveValue = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scopd lang="scss">
.the-favorites {
  &__right-panel {
    &-counter {
      font-size: 3.6rem;
      &-wrapper {
        margin-bottom: 2rem;
        margin-top: -2rem;
      }
    }
    &-social {
        display: flex;
        justify-content: space-between;
    }
    &__checkboxes {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .r-button {
      width: 100%;
      font-size: 1.4rem;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  }
}
</style>
