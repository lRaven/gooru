export const paginationMixin = {
	watch: {
		page() {
			if (this.$route.path === this.pagination.path) {
				this.pagination.load_next_cards
					?
					this.getNextCards({
						page_number: this.page,
						page_size: this.pagination.cards_in_page,
						nextPage: true,
					})
					:
					this.getCards({
						page_number: this.page,
						page_size: this.pagination.cards_in_page,
						nextPage: false,
					});

				this.pagination.load_next_cards = false;
			}
		},

		cards: {
			handler: function () {
				this.pagination.cards_list = [...this.cards];
			},
			deep: true,
		},
	},
	computed: {
		page() { return +this.$route.query.page; },
		count() { return this.pagination_data.count; },
		number_of_pages() { return Math.ceil(this.count / this.pagination.cards_in_page); },
	},
	data() {
		return {
			pagination: {
				path: this.$route.path,
				cards_in_page: 10,
				cards_list: [],
				load_next_cards: false,
			},
		}
	},
}