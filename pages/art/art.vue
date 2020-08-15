<template>
	<view>
		<!-- <cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">艺术类评选活动</block></cu-custom> -->
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="container">
			<view class="header"></view>
			<view class="content">
				<view class="title">艺术类</view>
				<view class="desc-container">
					<view class="desc-item">
						<view class="title">视觉艺术作品</view>
						<view class="desc">
							以“行走在2020”或“校庆60周年”为主题。作品包括：绘画、海报、书法、漫画、摄影等，以图片形式提交。
						</view>
					</view>
					<view class="desc-item">
						<view class="title">音乐类作品</view>
						<view class="desc">
							以“想对您说”为主题为母校庆贺、献礼，录制演唱、演奏的作品。作品可以是独奏（唱）、重奏（唱）人、合奏（唱）等，以视频或音频形式提交。
						</view>
					</view>
					<view class="desc-item">
						<view class="title">舞蹈类作品</view>
						<view class="desc">
							以“2020与你同行舞由心生”为主题，录制舞蹈作品。舞种不限，可独舞，也可群舞。作品以视频形式提交。
						</view>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<button class="round" @click="toSubmitType">了解详情</button>
				<button class="round" @click="toWorkShow">作品展示</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toSubmitType: function() {
				uni.navigateTo({
					url: '/pages/submit-type/submit-type?type=art'
				})
			},
			toWorkShow: function() {
				uni.navigateTo({
					url: '/pages/work-show/art'
				})
			}
		}
	}
</script>

<style>
@import url("art.css");
</style>
