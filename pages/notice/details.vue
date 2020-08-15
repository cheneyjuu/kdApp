<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">活动详情</block></cu-custom>
		<view class="container">
			<!-- <view class="moon"></view> -->
			<view class="article">
				<view class="title">活动详情</view>
				<view class="article-item">
					<view class="sub-title">
						一、活动简介：
					</view>
					<view class="intro">
						你渴望在演讲台上挥斥方遒吗？你想在大学生涯中体验演讲的魅力吗？你想赢得热烈的掌声吗？只要你想，我们就给你舞台！那么你们还在等什么？
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						二、活动形式：
					</view>
					<view class="intro">
						命题演讲，以“创新、就业&创业、法制、污染问题、价值观”（五个任选其一）为主题，以“关注两会热点，争做时代先锋”为演讲题目。
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						三、活动对象：
					</view>
					<view class="intro">
						全日制本科大一、大二、大三学生。
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						四、活动目的：
					</view>
					<view class="intro">
						本次活动旨在感受优良校园和谐氛围，展现生动、活泼、健康的校园文化，发挥学生的创造性，丰富校园生活，加强同学们对时事的关注，锻炼学生们的演讲能力和口头表达能力。
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						一、活动简介：
					</view>
					<view class="intro">
						你渴望在演讲台上挥斥方遒吗？你想在大学生涯中体验演讲的魅力吗？你想赢得热烈的掌声吗？只要你想，我们就给你舞台！那么你们还在等什么？
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						二、活动形式：
					</view>
					<view class="intro">
						命题演讲，以“创新、就业&创业、法制、污染问题、价值观”（五个任选其一）为主题，以“关注两会热点，争做时代先锋”为演讲题目。
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						三、活动对象：
					</view>
					<view class="intro">
						全日制本科大一、大二、大三学生。
					</view>
				</view>
				<view class="article-item">
					<view class="sub-title">
						四、活动目的：
					</view>
					<view class="intro">
						本次活动旨在感受优良校园和谐氛围，展现生动、活泼、健康的校园文化，发挥学生的创造性，丰富校园生活，加强同学们对时事的关注，锻炼学生们的演讲能力和口头表达能力。
					</view>
				</view>
			</view>
			<view class="btn-container">
				<button class="bg-gradual-red" @click="joinActivity">立即参与</button>
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
			return {
				
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style>
	@import url("./details.css");
	@import url("/common/footer.css");
</style>
