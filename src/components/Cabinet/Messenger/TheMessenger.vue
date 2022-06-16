<template>
	<div class="the-messenger"></div>
</template>

<script>
	export default {
		name: "TheMessenger",
		props: {
			ticket_id: Number,
		},
		data() {
			return {
				message: "",
				messages: [],
				chatSocket: new WebSocket(
					`ws://${window.location.host}/appeal/chat/${this.ticket_id}/`
				),
			};
		},
	};
</script>

<style lang="scss" scoped></style>
