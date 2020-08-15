<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">{{navTitle}}</block></cu-custom>
		<view class="page">
			<view class="image-container">
				<view class="backdrop"></view>
				<image src="https://kdapp.oss-cn-shanghai.aliyuncs.com/art-bg.png" mode="center" style="width: 300%;"></image>
			</view>
			<view class="qr-container">
				<image src="https://kdapp.oss-cn-shanghai.aliyuncs.com/%E4%BA%8C%E7%BB%B4%E7%A0%81.jpeg" class="qrcode"></image>
				<view class="info margin-top-sm text-white">扫码关注</view>
			</view>
			<view class="container">
				<view class="header">
					<view class="logo">
						<image src="../../static/images/logo.png" mode="widthFix"></image>
					</view>
					<view class="title">
						投稿方式
					</view>
				</view>
				<view class="content">
					<view class="title">一、活动对象</view>
					<view class="desc">上海开放大学系统注册学生。</view>
					<view class="title">二、投稿时间</view>
					<view class="desc">2020年9月1日-11月31日</view>
					<view class="title">三、作品要求：</view>
					<view class="sub-desc">
						<view class="title">（一）视频作品文件要求</view>
						<view class="desc">1、视频画质：建议拍摄分辨率不低于1280×720；彩色视频素材每帧图像颜色均为真彩色，图像清晰，播放流畅，声音清楚。</view>
						<view class="desc">2、格式：视频最终输出格式为支持多终端的mp4；时长不超过3分钟，文件大小不超过50M；</view>
					</view>
					<view class="sub-desc">
						<view class="title">（二）音频作品文件要求</view>
						<view class="desc">1、音频播放流畅，声音清晰，噪音低，回响小。</view>
						<view class="desc">2、语音采用标准的普通话、美式或英式英语配音，特殊语言学习和材料除外。</view>
						<view class="desc">3、建议优先采用MP3格式，或WMA等格式。时长不超过3分钟，文件大小不超过20M。</view>
					</view>
					<view class="sub-desc">
						<view class="title">（三）文档作品文件要求</view>
						<view class="desc">1、文档类格式标题黑体小二，正文宋体小四，行距固定23。分层序号样式如：一、（一）、1.（1）等展开。参考文献应标注明晰。</view>
						<view class="desc">2、格式为word、ppt、pdf等格式。</view>
					</view>
					<view class="sub-desc">
						<view class="title">（四）图片/图形/图像文件要求</view>
						<view class="desc">1、画面贴近主题，真实、清晰、美观，色彩和谐。</view>
						<view class="desc">2、采用常见存储格式，如GIF、PNG、JPG等。彩色图像颜色数不低于真彩（24位色），灰度图像的灰度级不低于256级。屏幕分辨率不低于1024×768，扫描图像的扫描分辨率不低于72dpi。</view>
						<view class="desc">3、文件大小不超过20M。</view>
					</view>
				</view>
				<view class="btn-container">
					<!-- <button class="cu-btn bg-gradual-green round" @click="register">报名注册</button> -->
					<button class="cu-btn round" @click="myWork">我的作品</button>
					<button class="cu-btn round" @click="submitWork(type)">在线投稿</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTitle: '投稿方式',
				type: ''
			}
		},
		methods: {
			register: () => {
				uni.navigateTo({
					url: '/pages/profile/profile'
				})
			},
			myWork: function() {
				uni.navigateTo({
					url: '/pages/profile/my-work'
				})
			},
			submitWork: (type) => {
				uni.navigateTo({
					url: `/pages/work/work?type=${type}`
				})
			},
			showWork: () => {
				uni.navigateTo({
					url: '/pages/awarded/awarded'
				})
			}
		},
		onLoad: function(param) {
			this.type = param.type;
			console.log(param);
		}
	}
</script>

<style>
/* @import url("bg.css"); */
@import url("submit-type.css");
</style>
