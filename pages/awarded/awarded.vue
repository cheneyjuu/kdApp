<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">作品展示</block></cu-custom>
		<scroll-view scroll-y="true" >
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 文学类
				</view>
			</view>
			<view class="work-container">
				<view class="works">
					<view class="ranking">
						<image src="../../static/ranking/no1.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="work-item padding-sm">
						<view class="title text-lg text-bold">作品名称</view>
						<view class="info flex justify-between margin-top-sm text-gray">
							<text>张三</text>
							<text>2020-04-16</text>
						</view>
					</view>
					<view class="work-item btn-container">
						<button class="bg-gradual-red" @click="openDocument">查看</button>
					</view>
				</view>
				<view class="works">
					<view class="ranking">
						<image src="../../static/ranking/no2.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="work-item padding-sm">
						<view class="title text-lg text-bold">作品名称</view>
						<view class="info flex justify-between margin-top-sm text-gray">
							<text>李四</text>
							<text>2020-04-16</text>
						</view>
					</view>
					<view class="work-item btn-container">
						<button class="bg-gradual-red" @click="openDocument">查看</button>
					</view>
				</view>
				<view class="works">
					<view class="ranking">
						<image src="../../static/ranking/no3.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="work-item padding-sm">
						<view class="title text-lg text-bold">作品名称</view>
						<view class="info flex justify-between margin-top-sm text-gray">
							<text>王五</text>
							<text>2020-04-16</text>
						</view>
					</view>
					<view class="work-item btn-container">
						<button class="bg-gradual-red" @click="openDocument">查看</button>
					</view>
				</view>
				<view class="works">
					<view class="ranking">
						<view class="cu-avatar round">4</view>
					</view>
					<view class="work-item padding-sm">
						<view class="title text-lg text-bold">作品名称</view>
						<view class="info flex justify-between margin-top-sm text-gray">
							<text>赵六</text>
							<text>2020-04-16</text>
						</view>
					</view>
					<view class="work-item btn-container">
						<button class="bg-gradual-red" @click="openDocument">查看</button>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 舞蹈类
				</view>
			</view>
			<view class="work-container">
				<view class="works">
					<view class="ranking">
						<image src="../../static/ranking/no1.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="work-item padding-sm">
						<view class="title text-lg text-bold">作品名称</view>
						<view class="info flex justify-between margin-top-sm text-gray">
							<text>李四</text>
							<text>2020-04-16</text>
						</view>
					</view>
					<view class="work-item btn-container">
						<button class="bg-gradual-red" @click="openDocument">查看</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("awarded.css");
</style>
