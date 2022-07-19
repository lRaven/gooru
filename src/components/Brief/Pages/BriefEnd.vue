<template>
	<section class="brief-end">
		<h1 class="brief-end__title">СПАРСИБО!</h1>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	import { send_brief } from "@/api/brief";
	import { useToast } from "vue-toastification";

	export default {
		name: "BriefEnd",
		computed: {
			...mapState({
				client_status: (store) => store.brief.client_status,

				fields_of_activity: (store) => store.brief.fields_of_activity,

				site_types: (store) => store.brief.site_types,

				additional_parameters: (store) =>
					store.brief.additional_parameters,
				number_of_positions: (store) => store.brief.number_of_positions,
				source: (store) => store.brief.source,
				user_contacts: (store) => store.brief.user_contacts,
			}),

			brief() {
				return {
					client_status: this.client_status.value,
					client_status_self_option: this.client_status.self_option,

					fields_of_activity: this.fields_of_activity.value,
					fields_of_activity_self_option:
						this.fields_of_activity.self_option,

					site_types: this.site_types.value,
					site_types_self_option: this.site_types.self_option,

					additional_parameters: this.additional_parameters,
					number_of_positions: this.number_of_positions,
					source: this.source,
					user_contacts: this.user_contacts,
				};
			},
		},
		methods: {
			async send_form() {
				try {
					const response = await send_brief(this.brief);
					if (response.status === 201) {
						this.toast.success("Бриф отправлен");
						console.log("Brief sent");
					}
				} catch (err) {
					this.toast.error("Ошибка отправки брифа");
					throw new Error(err);
				}
			},
		},
		mounted() {
			this.send_form();
			setTimeout(() => {
				this.$router.push({ name: "home" });
			}, 5000);
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-end {
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
	}

	@media (max-width: 540px) {
		.brief-end {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			&__title {
				&::before {
					width: 100%;
				}
			}
		}
	}
</style>
