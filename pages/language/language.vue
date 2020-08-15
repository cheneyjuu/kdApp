<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="container">
			<view class="header"></view>
			<view class="content">
				<view class="title">外语类</view>
				<view class="desc">
					以“我和开大有个故事”为主题，要用英文诉说自己和开放大学的点点滴滴，并用演讲的形式呈现出来（视频或音频）。演讲内容可以是“我”和开大有关的人、事、物之间的故事，应符合庆祝母校60周年主题，文体不限，推荐适合演讲的小品文、记叙文。
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
					url: '/pages/submit-type/submit-type?type=language'
				})
			},
			toWorkShow: function() {
				uni.navigateTo({
					url: '/pages/work-show/language'
				})
			}
		}
	}
</script>

<style>
@import url("language.css");
</style>
