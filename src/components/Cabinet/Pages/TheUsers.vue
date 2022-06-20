<template>
	<section class="the-users">
		<h2 class="the-users__title">Пользователи</h2>
	</section>
</template>

<script>
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "TheUsers",
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getParsources({
						page_number: this.page,
						page_size: this.parsources_in_page,
					});
				}
			},

			// selectAll() {
			// 	this.selectAll === true
			// 		? this.SELECT_ALL_PARSOURCES()
			// 		: this.UNSELECT_ALL_PARSOURCES();
			// },
			// deleteSelected() {
			// 	if (this.deleteSelected === true) {
			// 		this.DELETE_SELECTED_PARSOURCES();
			// 		setTimeout(() => {
			// 			this.deleteSelected = false;
			// 		}, 1000);
			// 	}
			// },
			// parsources: {
			// 	handler: function () {
			// 		if (this.parsources.length === 0) {
			// 			this.selectAll = false;
			// 		}
			// 	},
			// 	deep: true,
			// },
		},
		computed: {
			...mapState({
				parsources: (state) => state.parsers.parsources,
				parsources_pagination: (state) =>
					state.parsers.parsources_pagination,
			}),
			page() {
				return +this.$route.query.page;
			},
			count() {
				return this.parsources_pagination.count;
			},

			number_of_pages() {
				return Math.ceil(this.count / this.parsources_in_page);
			},
		},
		data() {
			return {
				path: this.$route.path,

				selectAll: false,
				postponeSelected: false,
				deleteSelected: false,
				sortBy: "none",

				parsources_in_page: 10,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
		},
		created() {
			this.SET_TAB("users");
		},
	};
</script>

<style lang="scss" scoped>
	.the-users {
		&__title {
			font-weight: 400;
		}
	}
</style>
