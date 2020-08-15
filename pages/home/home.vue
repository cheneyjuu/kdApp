<template>
	<view>
		<view class="main">
			<view class="container">
				<view class="boxes">
					<view class="box-container" @click="goToActivityIntro">
						<view class="box-item">
							<view class="eosfont">&#xe603;</view>
						</view>
						<view class="text-white  text-lg margin-top-sm">活动介绍</view>
					</view>
					<view class="box-container" @click="goToNotice">
						<view class="box-item">
							<view class="eosfont">&#xe616;</view>
						</view>
						<view class="text-white text-lg margin-top-sm">
							活动通知
						</view>
					</view>
					<view class="box-container" @click="goToWorkShow">
						<view class="box-item">
							<view class="eosfont">&#xe67f;</view>
						</view>
						<view class="text-white text-lg margin-top-sm">
							作品展示
						</view>
					</view>
					<view class="box-container" @click="goToAwarded">
						<view class="box-item">
							<view class="eosfont">&#xe631;</view>
						</view>
						<view class="text-white text-lg margin-top-sm">
							获奖作品
						</view>
					</view>
				</view>
			</view>
			<view class="menu-items">
				<view class="menu-item" @click="goToHome">
					<view class="cuIcon cuIcon-home"></view>
					首页
				</view>
				<view class="menu-item" @click="goToProfile">
					<view class="cuIcon cuIcon-my"></view>
					个人中心
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goToHome: function() {
			uni.reLaunch({
				url: '/pages/home/home'
			})
		},
		goToProfile: function() {
			uni.navigateTo({
				url: '/pages/profile/profile'
			})
		},
		goToActivityIntro: function() {
			console.log('goToActivityIntro');
			uni.navigateTo({
				url: '/pages/activity-intro/activity-intro'
			})
		},
		goToNotice: function() {
			uni.navigateTo({
				url: '/pages/notice/notice'
			})
		},
		goToWorkShow: function() {
			uni.navigateTo({
				url: '/pages/work-show/work-show'
			})
		},
		goToAwarded: function() {
			uni.navigateTo({
				url: '/pages/awarded/awarded'
			})
		}
	}
};
</script>

<style>
@import url('./home-background.css');
@import url('./home.css');
</style>
