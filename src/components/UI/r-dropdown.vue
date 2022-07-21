<template>
	<div
		class="r-dropdown"
		:class="list.length === 0 || isDisabled ? 'disabled' : ''"
		v-click-away="closeDropdown"
	>
		<div
			class="r-dropdown__header"
			@click="
				isContentVisible === true || isDisabled
					? closeDropdown()
					: openDropdown()
			"
		>
			<p
				class="r-dropdown__selected"
				ref="selected"
				:title="selected_item"
			>
				{{ selected_item }}
			</p>

			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="r-dropdown__arrow"
				ref="arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#323232"
				/>
			</svg>
		</div>

		<transition mode="out-in">
			<ul class="r-dropdown__list" v-show="isContentVisible">
				<li
					class="r-dropdown__list-item"
					v-for="item in list"
					:key="item.id"
					@click="
						selectValue(item[sendValue] || item, item[showedValue])
					"
					:title="item[showedValue]"
				>
					{{ item[showedValue] }}
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
	import { directive } from "vue3-click-away";

	export default {
		name: "rDropdown",
		props: {
			isDisabled: {
				value: Boolean,
				default: false,
			},
			selected_item: {
				value: String,
				default: "Selected/placeholder",
			},
			list: {
				value: Array,
				default: [
					{ id: 1, description: "item-1" },
					{ id: 2, description: "item-2" },
					{ id: 3, description: "item-3" },
				],
			},
			sendValue: {
				value: [String, Number],
				default: "id",
			},
			showedValue: {
				value: String,
				default: "description",
			},
		},
		data: () => ({ isContentVisible: false }),
		methods: {
			selectValue(sendValue, text) {
				this.$refs.selected.textContent = text;
				this.$emit("update:modelValue", sendValue);
				this.closeDropdown();
			},
			openDropdown() {
				if (this.list.length > 0) {
					this.isContentVisible = true;
					this.$refs.arrow.classList.add("open");
				}
			},
			closeDropdown() {
				this.isContentVisible = false;
				this.$refs.arrow.classList.remove("open");
			},
		},

		directives: { ClickAway: directive },
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-dropdown {
		position: relative;
		user-select: none;
		&.disabled {
			.r-dropdown {
				&__header {
					cursor: default;
					opacity: 0.5;
				}
			}
		}

		&__header {
			cursor: pointer;
			display: grid;
			grid-template-columns: 1fr max-content;
			align-items: center;
			justify-content: space-between;
			background-color: $white;
			padding: 1rem;
			gap: 3rem;
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			border-radius: 0.6rem;
			min-height: 4rem;
		}
		&__selected {
			font-size: 1.6rem;
			font-weight: 500;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		&__arrow {
			transition: all 0.2s ease;
			width: 1rem;
			min-width: 1rem;
			&.open {
				transform: rotate(180deg);
			}
		}

		&__list {
			position: absolute;
			left: 0;
			right: 0;
			top: calc(100% + 0.5rem);
			background-color: $white;
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			border-radius: 0.6rem;
			z-index: 2;
			max-height: calc(14.6rem);
			overflow-y: auto;
			overflow-x: hidden;
			&-item {
				cursor: pointer;
				padding: 1rem;
				font-size: 1.6rem;
				font-weight: 500;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				transition: all 0.2s ease;
				&:hover {
					background-color: rgba($primary, $alpha: 0.15);
				}
			}
		}
	}
</style>
