<template>
	<view class="page">
		<image src="https://kdapp.oss-cn-shanghai.aliyuncs.com/index_bg.png" class="page-bg"></image>
		<view class="sub-title">
			为庆祝上海开放大学60周年校庆， 展示上海开放大学人文学院专业教学魅力及教学成果， 上海开放大学人文学院举办在线学生作品展示评选活动。
		</view>
		<button class="cu-btn round language shadow-lg" @click="goToLanguage">外语类</button>
		<button class="cu-btn round art shadow-lg" @click="goToArt">艺术类</button>
		<button class="cu-btn round edu shadow-lg" @click="goToEdu">文学与教育类</button>
		<!-- <view class="main">
			<view class="circle-container blue">
				<view class="small-circle blue"></view>
				<view class="large-circle blue" @click="goToDetail('外语类')">外语类</view>
			</view>
			<view class="circle-container pink">
				<view class="small-circle pink"></view>
				<view class="large-circle pink" @click="goToDetail('艺术类')">艺术类</view>
			</view>
			<view class="circle-container green">
				<view class="small-circle green"></view>
				<view class="large-circle green" @click="goToDetail('文学与教育类')">文学与教育类</view>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'basics'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		},
		goToHome: function() {
			uni.reLaunch({
				url: '/pages/home/home'
			})
		},
		goToLanguage: function() {
			uni.navigateTo({
				url: '/pages/language/language'
			})
		},
		goToArt: function() {
			uni.navigateTo({
				url: '/pages/art/art'
			})
		},
		goToEdu: function() {
			uni.navigateTo({
				url: '/pages/edu/edu'
			})
		},
		goToDetail: (title) => {
			uni.navigateTo({
				url: `/pages/work-detail/work-detail?title=${title}`
			})
		}
	}
};
</script>

<style>
@import url("./index.css");
/* @import url("./index-bg.css"); */
</style>
