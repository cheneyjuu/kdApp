<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">作品展示</block></cu-custom>
		<view class="container">
			<view class="header">
				<view class="title text-xl text-bold">{{item.worksName}}</view>
				<view class="author text-gray">作者：{{item.author}}・{{item.college}}・{{item.grade}}</view>
			</view>
			<view class="content">
				<view class="intro">
					创作说明：{{item.workDesc}}
				</view>
				<view class="image margin-top">
					<image :src="item.filePath" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: null
			}
		},
		methods: {
			
		},
		onLoad: function(param){
			console.log('loaded');
			const work = JSON.parse(param.item);
			this.item = work;
		}
	}
</script>

<style>
	.nav-bg-color {
		background: linear-gradient(to right, #d5c6d3, #0b1f23);
		color: white;
	}
	.container {
		width: 100vw;
		height: 100vh;
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx 0;
	}
</style>
