<template>
	<section class="brief-source">
		<div class="brief-source__row">
			<h1 class="brief-source__title">
				Источник<br />
				парса
			</h1>
			<p class="brief-source__description">
				Введите в поле один или несколько адресов-<br />
				источников парса данных
			</p>
			<div class="brief-source__inputs">
				<r-input-url
					v-for="source in sources"
					:key="source.id"
					v-model="source.description"
					v-model:valid="source.valid"
				></r-input-url>
			</div>
		</div>

		<div class="brief-source__row brief-source__buttons">
			<r-button
				:disabled="isDisabledBtn"
				description="Добавить"
				@click="
					SET_SOURCES(selected_sources);
					this.$emit('moveToNextPage');
				"
			></r-button>
			<r-button
				description="Пропустить"
				@click="this.$emit('moveToNextPage')"
			></r-button>
		</div>
	</section>
</template>

<script>
	import rInputUrl from "@/components/Brief/r-input-url";
	import rButton from "@/components/Brief/r-button";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefSource",
		components: {
			rInputUrl,
			rButton,
		},
		watch: {
			sources: {
				handler: function () {
					const invalid_list = this.sources.find(
						(source) => source.valid === false
					);

					invalid_list === undefined
						? (this.isDisabledBtn = false)
						: (this.isDisabledBtn = true);
				},
				deep: true,
			},
		},
		data: () => ({
			isDisabledBtn: true,

			sources: [
				{ id: 1, description: "", valid: null },
				{ id: 2, description: "", valid: null },
				{ id: 3, description: "", valid: null },
				{ id: 4, description: "", valid: null },
				{ id: 5, description: "", valid: null },
				{ id: 6, description: "", valid: null },
				{ id: 7, description: "", valid: null },
			],
		}),
		computed: {
			selected_sources() {
				let result = this.sources.filter((source) => {
					return (
						source.valid !== false && source.description.length > 0
					);
				});

				return result;
			},
		},
		methods: {
			...mapMutations(["SET_SOURCES"]),
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-source {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		justify-content: space-between;
		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 5rem;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 70%;
				height: 0.6rem;
				background-color: $white;
			}
		}

		&__description {
			font-size: 2.4rem;
			line-height: 1.3;
			margin-bottom: 3rem;
		}
		&__inputs {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			max-width: 63rem;
		}

		&__buttons {
			display: flex;
			align-items: center;
			gap: 3.5rem;
		}
	}
</style>
