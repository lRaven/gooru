<template>
	<ul class="r-progressbar" :class="direction">
		<li class="r-progressbar__item" v-for="item in progress" :key="item.id">
			<span
				class="r-progressbar__item-tick"
				:class="item.checked"
				ref="tick"
			></span>
		</li>
	</ul>
</template>

<script>
	export default {
		name: "rProgressbar",
		props: {
			direction: {
				value: String,
				default: "vertical",
			},
			progress: {
				value: Array,
				default: [
					{ id: 1, checked: "checked" },
					{ id: 2, checked: false },
					{ id: 3, checked: false },
					{ id: 4, checked: false },
					{ id: 5, checked: false },
					{ id: 6, checked: false },
				],
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-progressbar {
		display: flex;
		gap: 0.2rem;
		&.vertical {
			flex-direction: column-reverse;
		}
		&.horizontal {
			flex-direction: row;
		}
		&__item {
			width: 2rem;
			height: 2rem;
			background-color: $white;
			border: 0.2rem solid $secondary;
			border-radius: 50%;
			overflow: hidden;
			padding: 0.2rem;

			&-tick {
				border-radius: 50%;
				display: block;
				background-color: transparent;
				height: 100%;
				transition: all 0.2s ease;
				&.checked {
					background-color: $secondary;
				}
			}
		}
	}
</style>
