<template>
	<Datepicker
		v-model="date"
		:range="range"
		:modelType="modelType"
		:clearable="false"
		:format="format"
		:enableTimePicker="false"
		:disabled="isDisabled"
		locale="ru"
		cancelText="Закрыть"
		selectText="Выбрать"
		placeholder="Выберите дату"
		class="r-date-range-picker"
		inputClassName="r-date-range-picker__input"
	>
		<template #input-icon>
			<img
				class="input-slot-image"
				src="/img/icon/cabinet/calendar.svg"
			/>
		</template>
	</Datepicker>
</template>

<script>
	import { ref, onMounted } from "vue";
	import Datepicker from "@vuepic/vue-datepicker";
	import "@vuepic/vue-datepicker/dist/main.css";

	export default {
		name: "rDateRangePicker",
		components: { Datepicker },
		props: {
			isDisabled: {
				type: Boolean,
				default: false,
			},
			range: { type: Boolean, default: true },
			modelType: { type: String, default: "yyyy-MM-dd" },
		},
		emits: {
			"update:modelValue": null,
		},
		watch: {
			date() {
				this.$emit("update:modelValue", this.date);
			},
		},
		setup(props) {
			const date = ref(new Date());

			const format = (date) => {
				//* формат диапазона дат
				if (props.range) {
					const startDateDay = date.getDate();
					const startDateMonth = date.getMonth() + 1;
					const startDateYear = date.getFullYear();

					const endDateDay = date.getDate();
					const endDateMonth = date.getMonth() + 1;
					const endDateYear = date.getFullYear();

					return `${startDateDay}.${startDateMonth}.${startDateYear} - ${endDateDay}.${endDateMonth}.${endDateYear}`;
				} else {
					const startDateDay = date.getDate();
					const startDateMonth = date.getMonth() + 1;
					const startDateYear = date.getFullYear();
					return `${startDateDay}.${startDateMonth}.${startDateYear}`;
				}
			};

			onMounted(() => {
				//* дефолтный диапазон дат
				if (props.range) {
					const startDate = new Date();
					const endDate = new Date(
						new Date().setDate(startDate.getDate() + 7)
					);
					date.value = [startDate, endDate];
				} else {
					date.value = "";
				}
			});
			return {
				date,
				format,
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>
<style lang="scss">
	// TODO: достилизовать календарь
	.r-date-range-picker {
		.dp__input_icon {
			left: initial;
			right: 1rem;
		}
		&__input {
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			padding: 1rem;
			font-size: 1.6rem;
		}
	}
</style>
