<template>
	<li class="parser-content" v-click-away="stateReset">
		<div
			class="parser-content__row"
			@click="
				isCroppedText === true ? expandArticle() : minimizeArticle()
			"
		>
			<img
				:src="parser.img"
				alt="image"
				class="parser-content__image"
				v-if="parser.img"
			/>
			<div class="parser-content__col">
				<p
					class="parser-content__text"
					:class="{ cropped: isCroppedText }"
				>
					{{ parser.article }}
				</p>
				<a
					:href="parser.url"
					target="_blank"
					rel="noopener noreferrer"
					class="parser-content__link"
				>
					{{ parser.url }}
				</a>
			</div>
			<div class="parser-content__col">
				<svg
					width="20"
					height="17"
					viewBox="0 0 20 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					v-if="parser.messages"
					@click.stop="
						isMessagesOpen === true
							? (isMessagesOpen = false)
							: (isMessagesOpen = true)
					"
					ref="messages"
				>
					<path
						d="M19.8798 5.74017C19.8798 5.62017 19.8798 5.49017 19.8098 5.37017C19.7608 5.08712 19.6974 4.80679 19.6198 4.53021C19.1987 3.20057 18.3606 2.04194 17.2294 1.22601C16.0983 0.410074 14.7344 -0.0197728 13.3398 0.000175973H11.0298C9.56981 0.000175973 8.10983 0.000175973 6.63983 0.000175973C6.13579 -0.00615709 5.63263 0.0441829 5.13983 0.1502C3.67147 0.450708 2.35422 1.2547 1.4157 2.42327C0.477191 3.59185 -0.0236315 5.05156 -0.00018945 6.55016C-0.00018945 8.76016 -0.00018945 12.3902 -0.00018945 14.8802C0.000952678 15.2122 0.084747 15.5387 0.243615 15.8303C0.402484 16.1218 0.631431 16.3692 0.909814 16.5502C1.22992 16.7527 1.60099 16.8602 1.97982 16.8602C2.26955 16.8617 2.55616 16.8003 2.81982 16.6802L3.75982 16.2402L6.54983 14.9502C6.63743 14.9093 6.73316 14.8888 6.82983 14.8902H13.1998C13.4398 14.8902 13.6898 14.8902 13.9298 14.8902C15.3067 14.7908 16.615 14.251 17.6613 13.3506C18.7076 12.4501 19.4364 11.2369 19.7398 9.89019C19.7932 9.67686 19.8332 9.46685 19.8598 9.26019C20.023 8.09296 20.0297 6.90917 19.8798 5.74017ZM6.74981 8.68017C6.61895 8.81182 6.46303 8.9159 6.29128 8.98632C6.11953 9.05674 5.93543 9.0921 5.74981 9.0902C5.5642 9.0921 5.38009 9.05674 5.20834 8.98632C5.03659 8.9159 4.88067 8.81182 4.74981 8.68017C4.61816 8.54931 4.51408 8.39342 4.44366 8.22167C4.37324 8.04992 4.33791 7.86578 4.33981 7.68017C4.33847 7.49463 4.37404 7.3107 4.44442 7.13903C4.51481 6.96736 4.61862 6.81137 4.74981 6.68017C4.88117 6.54986 5.0374 6.44731 5.20919 6.37859C5.38098 6.30988 5.56482 6.27644 5.74981 6.28021C5.93056 6.27889 6.10978 6.31333 6.27715 6.38158C6.44453 6.44984 6.59675 6.55056 6.72503 6.67791C6.85331 6.80526 6.95512 6.95672 7.02459 7.12359C7.09406 7.29046 7.12982 7.46944 7.12982 7.6502C7.14279 7.83898 7.11563 8.02833 7.05013 8.20586C6.98464 8.3834 6.88229 8.54505 6.74981 8.68017ZM11.0698 8.68017C10.939 8.81182 10.783 8.9159 10.6113 8.98632C10.4395 9.05674 10.2554 9.0921 10.0698 9.0902C9.8842 9.0921 9.70009 9.05674 9.52834 8.98632C9.35659 8.9159 9.20068 8.81182 9.06982 8.68017C8.93951 8.54881 8.83696 8.39261 8.76824 8.22082C8.69953 8.04903 8.66605 7.86516 8.66982 7.68017C8.66619 7.49431 8.70068 7.30968 8.7712 7.13769C8.84172 6.96569 8.94677 6.80998 9.07983 6.68017C9.21118 6.54986 9.36739 6.44731 9.53918 6.37859C9.71097 6.30988 9.89484 6.27644 10.0798 6.28021C10.4432 6.28021 10.7916 6.42453 11.0485 6.68145C11.3055 6.93837 11.4498 7.28685 11.4498 7.6502C11.4667 7.83681 11.4443 8.02485 11.384 8.20226C11.3237 8.37968 11.2269 8.5425 11.0998 8.68017H11.0698ZM15.4298 8.68017C15.2984 8.81048 15.1422 8.91303 14.9705 8.98174C14.7987 9.05046 14.6148 9.08396 14.4298 9.08019C14.0663 9.07762 13.7183 8.93278 13.4604 8.67669C13.2024 8.4206 13.055 8.07365 13.0498 7.7102C13.0461 7.52521 13.0795 7.34134 13.1482 7.16955C13.2169 6.99776 13.3195 6.84155 13.4498 6.7102C13.7158 6.44639 14.0752 6.29833 14.4498 6.29833C14.8244 6.29833 15.1839 6.44639 15.4498 6.7102C15.5825 6.83977 15.6867 6.99568 15.7556 7.1679C15.8245 7.34012 15.8566 7.52484 15.8498 7.7102C15.8506 7.89359 15.8137 8.0752 15.7415 8.24377C15.6692 8.41234 15.5631 8.56427 15.4298 8.69018V8.68017Z"
						fill="#989898"
					/>
				</svg>
				<svg
					width="21"
					height="20"
					viewBox="0 0 21 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					@click.stop="
						isMessagesOpen === true
							? (isMessagesOpen = false)
							: (isMessagesOpen = true)
					"
					ref="messages"
					v-else
				>
					<path
						d="M19.8897 7.74017C19.8897 7.62017 19.8397 7.49017 19.8197 7.37017C19.7673 7.08697 19.7006 6.80664 19.6197 6.53021C19.1987 5.20057 18.3605 4.04194 17.2293 3.22601C16.0982 2.41007 14.7343 1.98023 13.3397 2.00018H11.0397C9.56974 2.00018 8.10973 2.00018 6.64973 2.00018C6.14236 1.99343 5.63587 2.04377 5.13975 2.1502C3.67234 2.45096 2.3563 3.25534 1.41944 4.42413C0.482591 5.59291 -0.0160934 7.05247 0.00974497 8.55016C0.00974497 10.7602 0.00974497 14.3902 0.00974497 16.8702C0.0103024 17.2048 0.0948018 17.5339 0.255534 17.8274C0.416265 18.121 0.648105 18.3695 0.929758 18.5502C1.24845 18.7559 1.62043 18.8637 1.99974 18.8602C2.28921 18.8593 2.57531 18.798 2.83973 18.6802L3.76975 18.2402L6.55973 16.9502C6.64765 16.9102 6.74317 16.8898 6.83973 16.8902H13.2197C13.4597 16.8902 13.6997 16.8902 13.9397 16.8902C15.3179 16.7914 16.6277 16.2519 17.6757 15.3516C18.7237 14.4512 19.4543 13.2377 19.7597 11.8902L19.8797 11.2602C20.0396 10.0925 20.043 8.90872 19.8897 7.74017ZM18.0397 10.1002C18.0397 10.3102 18.0397 10.5102 18.0397 10.7102C18.0273 11.0496 17.9701 11.3858 17.8697 11.7102C17.6026 12.6362 17.0478 13.4531 16.2855 14.0428C15.5233 14.6325 14.5931 14.9642 13.6297 14.9902C12.1497 14.9902 13.9698 14.9902 12.4898 14.9902H6.55973C6.39116 14.9884 6.22415 15.0225 6.06974 15.0902L3.28974 16.4402L2.75974 16.6802C2.67277 16.7292 2.5746 16.7551 2.47474 16.7551C2.37488 16.7551 2.27671 16.7292 2.18974 16.6802C2.10297 16.6266 2.0316 16.5515 1.98252 16.4621C1.93345 16.3727 1.90836 16.2721 1.90974 16.1702V8.62017C1.89587 7.60126 2.22293 6.60694 2.83897 5.79522C3.455 4.9835 4.32466 4.40098 5.30973 4.14019C5.72707 4.02853 6.15775 3.97466 6.58973 3.98016H13.5198C14.2753 3.9617 15.0232 4.13557 15.6931 4.48541C16.363 4.83525 16.9331 5.34958 17.3497 5.98016C17.9842 7.25437 18.2244 8.68876 18.0397 10.1002Z"
						fill="#989898"
					/>
					<path
						d="M5.79017 8.32988C5.60519 8.32611 5.42135 8.35955 5.24955 8.42827C5.07776 8.49698 4.92153 8.59953 4.79017 8.72984C4.65712 8.85965 4.5521 9.01536 4.48158 9.18736C4.41106 9.35935 4.37654 9.54398 4.38017 9.72984C4.3764 9.91483 4.40987 10.0987 4.47859 10.2705C4.5473 10.4423 4.64986 10.5985 4.78016 10.7298C4.91103 10.8615 5.06694 10.9656 5.23869 11.0361C5.41044 11.1065 5.59455 11.1418 5.78016 11.1399C5.96578 11.1418 6.14992 11.1065 6.32167 11.0361C6.49342 10.9656 6.6493 10.8615 6.78016 10.7298C6.91047 10.5985 7.01305 10.4423 7.08177 10.2705C7.15048 10.0987 7.18396 9.91483 7.18019 9.72984C7.18424 9.54572 7.15113 9.36272 7.08284 9.19169C7.01454 9.02066 6.91245 8.86517 6.7827 8.73448C6.65294 8.60379 6.49818 8.50059 6.32765 8.43107C6.15711 8.36156 5.97431 8.32714 5.79017 8.32988Z"
						fill="#989898"
					/>
					<path
						d="M13.4804 8.73997C13.3501 8.87133 13.2475 9.02753 13.1788 9.19932C13.1101 9.37111 13.0766 9.55498 13.0804 9.73997C13.083 10.1025 13.2281 10.4495 13.4845 10.7059C13.7409 10.9622 14.0878 11.1073 14.4504 11.11C14.6353 11.1137 14.8192 11.0803 14.991 11.0116C15.1628 10.9429 15.319 10.8403 15.4504 10.71C15.582 10.5791 15.6861 10.4232 15.7565 10.2514C15.827 10.0797 15.8623 9.89562 15.8604 9.71C15.8647 9.52494 15.8315 9.34092 15.7627 9.16905C15.694 8.99717 15.5911 8.84102 15.4604 8.71C15.1914 8.45619 14.834 8.31731 14.4643 8.32292C14.0945 8.32852 13.7415 8.47813 13.4804 8.73997Z"
						fill="#989898"
					/>
					<path
						d="M10.11 8.32997C9.92489 8.32562 9.74087 8.35881 9.569 8.42756C9.39713 8.49631 9.24097 8.59916 9.10995 8.72993C8.97492 8.85825 8.86858 9.01369 8.79791 9.18605C8.72725 9.3584 8.69386 9.54375 8.69995 9.72993C8.69382 9.91522 8.72619 10.0998 8.79504 10.2719C8.8639 10.4441 8.96772 10.6 9.09995 10.7299C9.23081 10.8616 9.38672 10.9657 9.55847 11.0361C9.73022 11.1066 9.91433 11.1419 10.0999 11.14C10.4741 11.1394 10.8331 10.9922 11.0999 10.7299C11.2303 10.5986 11.3328 10.4424 11.4015 10.2706C11.4702 10.0988 11.5037 9.91492 11.4999 9.72993C11.5026 9.54619 11.4686 9.36378 11.3998 9.19337C11.331 9.02297 11.2289 8.86803 11.0994 8.73762C10.9699 8.60722 10.8157 8.50397 10.6458 8.43397C10.4759 8.36397 10.2937 8.32862 10.11 8.32997Z"
						fill="#989898"
					/>
				</svg>

				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					@click="openConfirmPopup"
					v-if="isFavorited"
				>
					<path
						d="M12.8633 18C12.4141 17.9956 11.9722 17.8812 11.5738 17.6663L9.31735 16.4283C9.21869 16.378 9.11015 16.3518 9.00016 16.3518C8.89018 16.3518 8.78167 16.378 8.68301 16.4283L6.42653 17.6663C5.97167 17.9141 5.45891 18.0253 4.94623 17.9872C4.43355 17.9492 3.94138 17.7634 3.52531 17.451C3.10672 17.1407 2.78123 16.7145 2.58624 16.2213C2.39124 15.728 2.33468 15.1878 2.42306 14.6628L2.85978 12.0467C2.87526 11.9356 2.86546 11.8222 2.83116 11.7157C2.79686 11.6092 2.73901 11.5124 2.66221 11.4331L0.832073 9.58138C0.463164 9.2118 0.202169 8.74222 0.0789608 8.22629C-0.0442474 7.71035 -0.0247079 7.16893 0.135352 6.66396C0.289411 6.15503 0.580702 5.70224 0.97494 5.35894C1.36918 5.01563 1.84997 4.79612 2.36067 4.72617L4.88753 4.33856C4.9958 4.32385 5.0989 4.28179 5.18776 4.21608C5.27662 4.15037 5.3485 4.06306 5.39705 3.96179L6.53049 1.58258C6.75666 1.10613 7.10768 0.705098 7.54344 0.425273C7.97921 0.145448 8.48221 -0.00186543 8.99499 7.86826e-05C9.50954 -0.00389218 10.0147 0.142509 10.4525 0.422448C10.8903 0.702387 11.2429 1.10448 11.4698 1.58258L12.6033 3.96179C12.6511 4.06364 12.7228 4.15145 12.8118 4.21727C12.9008 4.28308 13.0043 4.32478 13.1128 4.33856L15.6397 4.72617C16.1491 4.79984 16.6281 5.0207 17.0217 5.36347C17.4153 5.70624 17.7076 6.157 17.865 6.66396C18.0226 7.1692 18.0409 7.70995 17.9178 8.22537C17.7947 8.74078 17.5351 9.21037 17.1683 9.58138L15.3381 11.4331C15.2576 11.5096 15.1973 11.6061 15.1628 11.7135C15.1282 11.8208 15.1205 11.9355 15.1405 12.0467L15.5669 14.6628C15.6633 15.1817 15.6169 15.7182 15.433 16.2112C15.2492 16.7042 14.9352 17.1337 14.527 17.451C14.0432 17.8131 13.4603 18.0055 12.8633 18Z"
						fill="#989898"
					/>
				</svg>
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					@click="updateFavoriteParser"
					v-else
				>
					<path
						d="M12.8633 18C12.4141 17.9956 11.9722 17.8812 11.5738 17.6663L9.31735 16.4283C9.21869 16.378 9.11015 16.3518 9.00016 16.3518C8.89018 16.3518 8.78167 16.378 8.68301 16.4283L6.42653 17.6663C5.97167 17.9141 5.45891 18.0253 4.94623 17.9872C4.43355 17.9492 3.94138 17.7634 3.52531 17.451C3.10672 17.1407 2.78123 16.7145 2.58624 16.2213C2.39124 15.728 2.33468 15.1878 2.42306 14.6628L2.85978 12.0467C2.87526 11.9356 2.86546 11.8222 2.83116 11.7157C2.79686 11.6092 2.73901 11.5124 2.66221 11.4331L0.832073 9.58138C0.463164 9.2118 0.202169 8.74222 0.0789608 8.22629C-0.0442474 7.71035 -0.0247079 7.16893 0.135352 6.66396C0.289411 6.15503 0.580702 5.70224 0.97494 5.35894C1.36918 5.01563 1.84997 4.79612 2.36067 4.72617L4.88753 4.33856C4.9958 4.32385 5.0989 4.28179 5.18776 4.21608C5.27662 4.15037 5.3485 4.06306 5.39705 3.96179L6.53049 1.58258C6.75666 1.10613 7.10768 0.705098 7.54344 0.425273C7.97921 0.145448 8.48221 -0.00186543 8.99499 7.86826e-05C9.50954 -0.00389218 10.0147 0.142509 10.4525 0.422448C10.8903 0.702387 11.2429 1.10448 11.4698 1.58258L12.6033 3.96179C12.6511 4.06364 12.7228 4.15145 12.8118 4.21727C12.9008 4.28308 13.0043 4.32478 13.1128 4.33856L15.6397 4.72617C16.1491 4.79984 16.6281 5.0207 17.0217 5.36347C17.4153 5.70624 17.7076 6.157 17.865 6.66396C18.0226 7.1692 18.0409 7.70995 17.9178 8.22537C17.7947 8.74079 17.5351 9.21037 17.1683 9.58138L15.3381 11.4331C15.2576 11.5096 15.1973 11.6061 15.1628 11.7135C15.1282 11.8208 15.1205 11.9355 15.1405 12.0467L15.5669 14.6628C15.6633 15.1817 15.6169 15.7182 15.433 16.2112C15.2492 16.7042 14.9352 17.1337 14.527 17.451C14.0432 17.8131 13.4603 18.0055 12.8633 18ZM8.99499 2.15319C8.86886 2.1496 8.74446 2.18437 8.63725 2.25326C8.53004 2.32215 8.44472 2.42212 8.39185 2.54073L7.25841 4.90917C7.06173 5.32578 6.76923 5.68601 6.4066 5.95819C6.04397 6.23037 5.62231 6.4062 5.17869 6.47018L2.65183 6.84695C2.52552 6.86661 2.40701 6.92235 2.30964 7.00794C2.21228 7.09352 2.13993 7.20557 2.10071 7.33142C2.06376 7.45518 2.0607 7.58714 2.09191 7.71259C2.12313 7.83804 2.18736 7.95203 2.27746 8.04191L4.10763 9.89362C4.42701 10.2155 4.66586 10.6131 4.80356 11.052C4.94125 11.491 4.97365 11.958 4.89793 12.4127L4.46118 15.018C4.43786 15.1476 4.45096 15.2814 4.49888 15.4035C4.5468 15.5257 4.62755 15.6309 4.73155 15.707C4.83707 15.777 4.95977 15.8143 5.0851 15.8143C5.21044 15.8143 5.33314 15.777 5.43865 15.707L7.70554 14.469C8.10253 14.2566 8.54292 14.1457 8.98979 14.1457C9.43666 14.1457 9.87701 14.2566 10.274 14.469L12.5305 15.707C12.636 15.777 12.7587 15.8143 12.8841 15.8143C13.0094 15.8143 13.1321 15.777 13.2376 15.707C13.3416 15.6309 13.4224 15.5257 13.4703 15.4035C13.5182 15.2814 13.5313 15.1476 13.508 15.018L13.0816 12.4127C13.0041 11.9579 13.0356 11.4904 13.1734 11.0511C13.3112 10.6119 13.5511 10.2145 13.8719 9.89362L15.7021 8.04191C15.7936 7.95307 15.858 7.83853 15.8876 7.71232C15.9171 7.58612 15.9105 7.45377 15.8685 7.33142C15.8334 7.20511 15.7636 7.09204 15.6676 7.00603C15.5716 6.92003 15.4535 6.86478 15.3277 6.84695L12.8009 6.47018C12.3578 6.40441 11.9369 6.22787 11.5746 5.95589C11.2122 5.68391 10.9193 5.32465 10.7211 4.90917L9.5981 2.54073C9.54523 2.42212 9.4599 2.32215 9.3527 2.25326C9.24549 2.18437 9.12112 2.1496 8.99499 2.15319Z"
						fill="#989898"
					/>
				</svg>

				<svg
					width="18"
					height="19"
					viewBox="0 0 18 19"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					@click.stop="
						isShareOpen === true
							? (isShareOpen = false)
							: (isShareOpen = true)
					"
					ref="share"
				>
					<path
						d="M14.1901 18.9998C13.8958 18.9283 13.6054 18.8415 13.3201 18.7398C12.6843 18.4641 12.1636 17.9767 11.8464 17.3606C11.5292 16.7444 11.4351 16.0374 11.5801 15.3598C11.5758 15.3333 11.5758 15.3063 11.5801 15.2798C11.1001 15.0098 10.5801 14.7398 10.1501 14.4598L6.24013 12.2298C6.20274 12.1931 6.15246 12.1726 6.10011 12.1726C6.04776 12.1726 5.99751 12.1931 5.96013 12.2298C5.49183 12.6343 4.90987 12.8842 4.29402 12.945C3.67817 13.0059 3.05856 12.8749 2.52013 12.5698C1.98024 12.265 1.54806 11.8003 1.28303 11.2398C1.01801 10.6793 0.933134 10.0505 1.04012 9.4398C1.15055 8.82763 1.44856 8.26492 1.89287 7.82957C2.33718 7.39421 2.90583 7.10775 3.52013 7.00981C3.95485 6.93375 4.40117 6.95723 4.82552 7.07847C5.24986 7.19971 5.64121 7.41558 5.97014 7.70982C6.002 7.74157 6.04515 7.75938 6.09013 7.75938C6.13512 7.75938 6.17826 7.74157 6.21013 7.70982L11.4901 4.70982H11.5701C11.3863 3.96269 11.4965 3.1735 11.878 2.50535C12.2596 1.8372 12.8833 1.34115 13.6201 1.11979C14.2938 0.913071 15.0187 0.950073 15.6678 1.22434C16.3169 1.49861 16.8488 1.99265 17.1701 2.61979C17.4911 3.24434 17.5829 3.96171 17.4294 4.64695C17.2759 5.33219 16.8869 5.94186 16.3301 6.36979C15.7392 6.81731 15.0035 7.03023 14.2649 6.96745C13.5263 6.90466 12.8371 6.57067 12.3301 6.02982L6.91014 9.11979C7.07992 9.69077 7.07992 10.2988 6.91014 10.8698L12.3301 13.9598C12.7259 13.5391 13.2317 13.2377 13.7901 13.0898C14.2339 12.9752 14.698 12.9638 15.1468 13.0565C15.5956 13.1492 16.0172 13.3435 16.3793 13.6244C16.7414 13.9054 17.0343 14.2656 17.2355 14.6773C17.4367 15.0891 17.5409 15.5415 17.5401 15.9998C17.547 16.7293 17.2878 17.4362 16.8111 17.9884C16.3344 18.5406 15.6728 18.9001 14.9501 18.9998H14.8601H14.1901Z"
						fill="#989898"
					/>
				</svg>

				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="parser-content__icon"
					@click.stop="
						isDownloadOpen === true
							? (isDownloadOpen = false)
							: (isDownloadOpen = true)
					"
					ref="download"
				>
					<path
						d="M10.1903 1H10.2704C10.5215 1.05555 10.7456 1.19665 10.9043 1.39911C11.063 1.60157 11.1464 1.85288 11.1403 2.11005V10.77C11.1981 10.725 11.2517 10.6748 11.3004 10.6201L13.2104 8.72003C13.3509 8.57689 13.5272 8.47412 13.721 8.42242C13.9148 8.37073 14.1189 8.37199 14.3121 8.42615C14.5052 8.4803 14.6802 8.58536 14.8189 8.73029C14.9575 8.87521 15.0548 9.05467 15.1003 9.25C15.1494 9.44847 15.1436 9.65658 15.0838 9.85205C15.0239 10.0475 14.9121 10.2231 14.7603 10.36L11.7603 13.36L10.8503 14.27C10.7453 14.3875 10.6166 14.4816 10.4727 14.546C10.3288 14.6103 10.173 14.6436 10.0153 14.6436C9.85772 14.6436 9.70187 14.6103 9.55798 14.546C9.41409 14.4816 9.28541 14.3875 9.18036 14.27L5.25033 10.35C5.09841 10.2093 4.98886 10.029 4.93408 9.82928C4.8793 9.6296 4.88147 9.41855 4.94034 9.22003C4.98657 9.02344 5.08851 8.84434 5.23395 8.70422C5.37939 8.5641 5.56216 8.46893 5.76034 8.43005C5.95485 8.38036 6.15924 8.38482 6.35138 8.44299C6.54352 8.50116 6.71606 8.61078 6.85034 8.76001L8.72034 10.63C8.76251 10.6757 8.79942 10.7261 8.83035 10.78H8.89035V10.59C8.89035 7.88003 8.89035 5.16 8.89035 2.44C8.84426 2.13062 8.91215 1.81506 9.08139 1.552C9.25063 1.28894 9.50968 1.09631 9.81033 1.01001L10.1903 1Z"
						fill="#989898"
					/>
					<path
						d="M1 17.6999L1.06 17.55C1.1328 17.3386 1.26669 17.1535 1.4447 17.0182C1.62271 16.883 1.83683 16.8035 2.06 16.79H17.79C18.0622 16.7723 18.3316 16.8537 18.5485 17.0191C18.7653 17.1845 18.9151 17.4228 18.97 17.6899C19.0016 17.8452 19.0001 18.0054 18.9658 18.16C18.9314 18.3147 18.865 18.4604 18.7707 18.5877C18.6764 18.715 18.5564 18.821 18.4184 18.8989C18.2805 18.9768 18.1277 19.0249 17.97 19.04H2.42001C2.11191 19.0856 1.79772 19.0174 1.53632 18.848C1.27492 18.6787 1.08423 18.4198 1 18.12V17.6999Z"
						fill="#989898"
					/>
				</svg>
			</div>
		</div>

		<div class="parser-content__row" v-if="isMessagesOpen === true">
			<div
				v-if="parser.comment.text && !isEditComment"
				class="parser-content__comment"
			>
				<p class="parser-content__comment-subtitle">Комментарий:</p>
				<p class="parser-content__comment-text">
					{{ parser.comment.text }}
				</p>
				<div class="parser-content__controls">
					<svg
						class="parser-content__control-edit-button"
						@click.stop="handleEditClick"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20.9991 10.0457V20.3159C20.9991 21.5221 20.0985 22.4998 18.9876 22.4998H3.5115C2.4006 22.4998 1.5 21.5221 1.5 20.3159V4.81178C1.5 3.60563 2.4006 2.62793 3.5115 2.62793H13.9528"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
						<path
							d="M21.8333 4.5408L13.4576 13.1538C13.0311 13.5937 11.7549 13.98 10.5407 14.4252C10.0262 14.6139 9.53041 14.1336 9.70291 13.6134C10.1049 12.4006 10.4559 11.0982 10.8822 10.6582L19.2579 2.04525C19.947 1.3341 21.0822 1.31625 21.7934 2.0055C22.5045 2.6946 22.5224 3.82965 21.8333 4.5408Z"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
						<path
							d="M17.8301 3.51855L20.4054 6.0141"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
					</svg>
					<svg
						class="parser-content__control-remove-button"
						@click.stop="handleDeleteComment"
						width="20"
						height="21"
						viewBox="0 0 15 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.9722 6.24219C12.9722 6.24219 12.5685 11.2484 12.3344 13.3572C12.2229 14.3643 11.6007 14.9545 10.5817 14.9731C8.64237 15.0081 6.70084 15.0103 4.76228 14.9694C3.78186 14.9493 3.17011 14.3517 3.06085 13.3624C2.82522 11.235 2.42383 6.24219 2.42383 6.24219"
							stroke="#989898"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M13.9996 3.84236H1.39453"
							stroke="#989898"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M11.5717 3.84244C10.9882 3.84244 10.4858 3.4299 10.3713 2.85829L10.1907 1.95443C10.0792 1.53743 9.70158 1.24902 9.2712 1.24902H6.12477C5.69439 1.24902 5.31679 1.53743 5.20529 1.95443L5.02467 2.85829C4.9102 3.4299 4.40772 3.84244 3.82422 3.84244"
							stroke="#989898"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>
			<template v-else>
				<textarea
					class="parser-content__textarea"
					:placeholder="
						parser.comment.text
							? 'Редактировать комментарий...'
							: 'Написать комментарий...'
					"
					v-model="comment"
				></textarea>
				<p
					class="parser-content__control-edit-button parser-content__control-edit-button_text parser-content__control-edit-button_align_end"
					v-if="parser.comment.text"
					@click.stop="handleEditClick"
				>
					Отменить
				</p>
				<r-button
					@click="handleSubmitComment"
					text="Сохранить"
					color="bordered"
					:disabled="isDisabledCommentButton"
				></r-button>
			</template>
		</div>

		<div class="parser-content__row" v-if="isShareOpen === true">
			<div class="parser-content__social">
				<p class="parser-content__social-description">
					Поделиться в социальных сетях:
				</p>
				<ul class="parser-content__social-list">
					<li class="parser-content__social-list-item">
						<ShareNetwork
							network="odnoklassniki"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/ok.svg" alt="ok" />
						</ShareNetwork>
					</li>
					<li class="parser-content__social-list-item">
						<ShareNetwork
							network="vk"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/vk.svg" alt="vk" />
						</ShareNetwork>
					</li>
					<li class="parser-content__social-list-item">
						<ShareNetwork
							network="twitter"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
							:hashtags="shareContent.hashtags"
						>
							<img
								src="/img/icon/cabinet/twtr.svg"
								alt="twitter"
							/>
						</ShareNetwork>
					</li>
					<li class="parser-content__social-list-item">
						<ShareNetwork
							network="telegram"
							:url="shareContent.url"
							:title="shareContent.title"
							:description="shareContent.description"
							:media="shareContent.image"
						>
							<img src="/img/icon/cabinet/tg.svg" alt="tg" />
						</ShareNetwork>
					</li>
				</ul>
			</div>
			<r-button text="Отправить" color="bordered"></r-button>
		</div>

		<div class="parser-content__row" v-if="isDownloadOpen === true">
			<div class="parser-content__download">
				<p class="parser-content__download-description">
					Выберите формат
				</p>
				<ul class="parser-content__download-list">
					<li class="parser-content__download-list-item">
						<r-checkbox
							description="Excel"
							name="xls"
							:checked="downloadFormatFiles.excel"
							v-model="downloadFormatFiles.excel"
						></r-checkbox>
					</li>
					<li class="parser-content__download-list-item">
						<r-checkbox
							description="CSV"
							name="csv"
							:checked="downloadFormatFiles.csv"
							v-model="downloadFormatFiles.csv"
						></r-checkbox>
					</li>
				</ul>
			</div>
			<r-button
				:disabled="isDisabledDownloadButton"
				@click="handleClickDownload"
				text="Скачать"
				color="bordered"
			></r-button>
		</div>
	</li>
	<transition mode="out-in" name="fade">
		<r-confirm-popup
			v-if="isDeleteFavoritePopupVisible"
			:text="`Вы действительно хотите удалить «${parserProp.article}» из избранного?`"
			@action_confirm="updateFavoriteParser"
			@close_popup="isDeleteFavoritePopupVisible = false"
		/>
	</transition>
</template>

<script>
	import { useToast } from "vue-toastification";

	import { directive } from "vue3-click-away";
	import { mapState, mapActions } from "vuex";

	import {
		createComment,
		updateComment,
		deleteComment,
		downloadFile,
	} from "@/api/parser";

	export default {
		name: "ParserContent",
		props: { parserProp: Object },
		watch: {
			isMessagesOpen() {
				if (this.isMessagesOpen === true) {
					(this.isShareOpen = false), (this.isDownloadOpen = false);
					this.$refs.messages.classList.add("selected");
				} else {
					this.$refs.messages.classList.remove("selected");
				}
			},
			isShareOpen() {
				if (this.isShareOpen === true) {
					(this.isMessagesOpen = false),
						(this.isDownloadOpen = false);
					this.$refs.share.classList.add("selected");
				} else {
					this.$refs.share.classList.remove("selected");
				}
			},
			isDownloadOpen() {
				if (this.isDownloadOpen === true) {
					(this.isMessagesOpen = false), (this.isShareOpen = false);
					this.$refs.download.classList.add("selected");
				} else {
					this.$refs.download.classList.remove("selected");
				}
			},
		},
		computed: {
			...mapState({
				favorites: (state) => state.favorites.favorites,
				user: (state) => state.cabinet.user,
			}),

			isFavorited() {
				let find = false;
				this.favorites.forEach((parsource) => {
					parsource.parsers.forEach((parser) => {
						if (parser.id === this.parser.id) {
							find = true;
							this.parser.favoriteId = parser.favoriteId;
						}
					});
				});

				return find;
			},
			isDisabledCommentButton() {
				return this.comment.length > 0 ? false : true;
			},
			isDisabledDownloadButton() {
				return !Object.values(this.downloadFormatFiles).find(
					(downloadFormatFile) => downloadFormatFile === true
				);
			},
		},
		data() {
			return {
				isMessagesOpen: false,
				isShareOpen: false,
				isDownloadOpen: false,
				isEditComment: false,
				isCroppedText: true,
				isDeleteFavoritePopupVisible: false,

				parser: this.parserProp,

				comment: this.parserProp.comment.text,
				downloadFormatFiles: { excel: false, csv: false },

				shareContent: {
					url: this.parserProp.url,
					title: this.parserProp.title,
					description: this.parserProp.article,
					image: "https://gitlab.com/uploads/-/system/project/avatar/32004440/Vue.js_Logo_2.svg.png",
					// *fb only
					quote: "",
					// *fb, twtr only
					hashtags: "",
				},
			};
		},

		methods: {
			...mapActions(["getFavoriteParsers", "updateFavorites"]),
			hideAllExtras() {
				this.isMessagesOpen = false;
				this.isShareOpen = false;
				this.isDownloadOpen = false;
			},

			expandArticle() {
				this.isCroppedText = false;
			},

			minimizeArticle() {
				this.isCroppedText = true;
			},

			stateReset() {
				this.minimizeArticle();
				this.hideAllExtras();
			},
			openConfirmPopup() {
				this.isDeleteFavoritePopupVisible = true;
			},
			async updateFavoriteParser() {
				try {
					await this.updateFavorites({
						parserToUpdate: this.parserProp,
						userId: this.user.id,
						isFavorite: this.isFavorited,
					});
					console.log("after await", this.isFavorited);
					if (this.isFavorited) {
						this.toast.success(
							`Парсер «${this.parserProp.article}» добавлен в избранное!`
						);
					} else {
						this.toast.success(
							`Парсер «${this.parserProp.article}» удален из избранного!`
						);
					}
					setTimeout(
						() => (this.isDeleteFavoritePopupVisible = false),
						1000
					);
				} catch (err) {
					if (this.isFavorited) {
						this.toast.error(
							`Не удалось удалить «${this.parserProp.article}» из избранного!`
						);
					} else {
						this.toast.error(
							`Не удалось добавить «${this.parserProp.article}» в избранное!`
						);
					}
					throw new Error(err);
				}
			},
			handleEditClick() {
				this.isEditComment = !this.isEditComment;
				if (this.isEditComment === false) {
					this.comment = this.parser.comment.text;
				}
			},
			async handleSubmitComment() {
				try {
					if (this.parser.comment.text === "") {
						const { comment, id } = await createComment({
							comment: this.comment,
							parser: this.parser.id,
						});
						this.parser.comment = { text: comment, id };
						this.isEditComment = false;
					} else {
						const { comment } = await updateComment({
							comment: this.comment,
							parser: this.parser.id,
							id: this.parser.comment.id,
						});
						this.parser.comment.text = comment;
						this.isEditComment = false;
					}
				} catch (err) {
					this.toast.error("Что-то пошло не так!");
					throw new Error(err);
				}
			},
			async handleDeleteComment() {
				try {
					await deleteComment({ id: this.parser.comment.id });
					this.parser.comment = { text: "", id: null };
					this.comment = "";
				} catch (err) {
					this.toast.error("Что-то пошло не так!");
					throw new Error(err);
				}
			},
			async handleClickDownload() {
				try {
					const downloadFilesQueue = [];
					Object.keys(this.downloadFormatFiles).forEach((key) => {
						if (this.downloadFormatFiles[key] === true) {
							downloadFilesQueue.push(
								downloadFile({
									type: key === "excel" ? "xls" : key,
								})
							);
						}
					});
					const responses = await Promise.allSettled(
						downloadFilesQueue
					);
					responses.forEach((response) => {
						if (response.status === "fulfilled") {
							const downloadUrl = window.URL.createObjectURL(
								response.value
							);
							let dataFileType =
								response.value.type.split("/")[1];
							// преобразование mime-типов ответа в расширение
							if (
								dataFileType ===
								"vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							) {
								dataFileType = "xlsx";
							} else if (
								dataFileType === "application/vnd.ms-excel"
							) {
								dataFileType = "xls";
							}
							const linkForDownload = document.createElement("a");
							linkForDownload.href = downloadUrl;
							linkForDownload.download = `${this.parser.title}ParserData.${dataFileType}`;
							document.body.appendChild(linkForDownload);
							linkForDownload.click();
							linkForDownload.remove();
						}
					});
				} catch (err) {
					this.toast.error("Что-то пошло не так!");
					throw new Error(err);
				}
			},
		},

		directives: { ClickAway: directive },
		created() {
			this.getFavoriteParsers();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.parser-content {
		list-style: none;
		border-top: 0.1rem solid #999;
		padding: 1rem 3rem;
		background-color: $white;

		&__row {
			display: flex;
			justify-content: space-between;
			+ .parser-content__row {
				margin-top: 2rem;
			}
			&:first-child {
				cursor: pointer;
				align-items: center;
				gap: 1rem;
			}
			&:last-child {
				gap: 2rem;
			}
			.r-button {
				align-self: flex-end;
				padding: 0.8rem 2.8rem;
				font-size: 1.4rem;
				font-weight: 500;
				height: max-content;
			}
		}

		&__col {
			&:first-child {
				max-width: 90%;
				overflow: hidden;
			}
			&:last-child {
				display: flex;
				align-items: center;
				gap: 1.2rem;
				width: max-content;
			}
		}

		&__image {
			max-width: 7rem;
			width: 100%;
			max-height: 5rem;
			object-fit: contain;
		}
		&__text {
			font-size: 1.6rem;
			line-height: 1.3;
			margin-bottom: 0.5rem;
			word-break: break-word;
			&.cropped {
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}
		&__link {
			text-decoration: underline;
			color: $primary;
			font-size: 1.4rem;
		}

		&__icon {
			cursor: pointer;

			&.selected {
				path {
					fill: $primary;
				}
			}

			path {
				transition: all 0.2s ease;
			}
			&:hover {
				path {
					fill: $primary;
				}
			}
		}

		&__comment {
			display: flex;
			flex-direction: column;
			&-subtitle {
				font-weight: 500;
				margin: 0 0 0.5rem 0;
			}
			&-text {
				font-size: 1.4rem;
				font-style: italic;
				margin: 0 0 1rem 0;
			}
		}

		&__textarea {
			width: 100%;
			height: 7rem;
			border: 0.1rem solid #d5d5d5;
			resize: none;
			border-radius: 0.6rem;
			padding: 1rem;
			font-size: 1.2rem;
			color: $black;
			&::placeholder {
				user-select: none;
				color: $black;
			}
		}
		&__controls {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
		&__control-edit-button {
			cursor: pointer;

			width: 2rem;
			height: 2rem;
			&_text {
				background: none;
				width: fit-content;
				height: fit-content;
				padding: 0.5rem;
				font-size: 1.4rem;
				font-weight: 500;
			}
			&_align_end {
				align-self: flex-end;
			}
			path {
				stroke: $black;
			}
			&:hover {
				path {
					stroke: $primary;
				}
			}
		}
		&__control-remove-button {
			cursor: pointer;
			width: 2rem;
			height: 2rem;
			path {
				stroke: $black;
			}
			&:hover {
				path {
					stroke: $primary;
				}
			}
		}

		&__social {
			&-description {
				font-size: 1.2rem;
				margin-bottom: 1.3rem;
			}
			&-list {
				display: flex;
				gap: 1rem;
				&-item {
					cursor: pointer;
					width: 3.2rem;
					height: 3.2rem;
					border: 0.1rem solid transparent;
					border-radius: 50%;
					overflow: hidden;
					transition: all 0.2s ease;
					&:hover {
						border-color: $primary;
					}
					img {
						padding: 0.1rem;
						width: 100%;
						object-fit: contain;
					}
				}
			}
		}

		&__download {
			&-description {
				font-size: 1.2rem;
				margin-bottom: 1.3rem;
			}
			&-list {
				display: flex;
				gap: 5rem;
				&-item {
					.r-checkbox__description {
						font-weight: 500;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	.parser-content {
		&__download {
			&-list {
				&-item {
					.r-checkbox__description {
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
