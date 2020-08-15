<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">活动通知</block></cu-custom>
		<view class="cards">
			<view class="card-item">
				<view class="image" @click="viewDetails"><image src="https://s1.ax1x.com/2020/08/03/aUrq8f.png"></image></view>
				<view class="content" @click="viewDetails">
					<view class="title text-cut padding-bottom-xs">2019第十六届上海教育博览会迈向新</view>
					<view class="intro">2030的“城市、职业、教育”展于上海展览中心开幕</view>
				</view>
				<view class="info">
					<text class="flex align-center">2019.04.26</text>
					<!-- <button class="bg-gradual-red cu-btn margin-right-sm sm" @click="joinActivity">立即参与</button> -->
				</view>
			</view>
			<view class="card-item margin-top-sm">
				<view class="image" @click="viewDetails"><image src="https://s1.ax1x.com/2020/08/03/aUrq8f.png"></image></view>
				<view class="content" @click="viewDetails">
					<view class="title text-cut padding-bottom-xs">2019第十六届上海教育博览会迈向新</view>
					<view class="intro">2030的“城市、职业、教育”展于上海展览中心开幕</view>
				</view>
				<view class="info">
					<text class="flex align-center">2019.04.26</text>
					<!-- <button class="bg-gradual-red cu-btn margin-right-sm sm" @click="joinActivity">立即参与</button> -->
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="nav">
				<view class="nav-item" @click="goToHome">
					<view class="cuIcon cuIcon-home"></view>
					<view class="">首页</view>
				</view>
				<view class="nav-item" @click="goToProfile">
					<view class="cuIcon cuIcon-my"></view>
					<view class="">我的</view>
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
		viewDetails: function() {
			uni.navigateTo({
				url: '/pages/notice/details'
			})
		},
		joinActivity: function() {
			uni.navigateTo({
				url: '/pages/work/work'
			})
		},
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
	}
};
</script>

<style>
@import url('./notice.css');
@import url('/common/footer.css');
</style>
