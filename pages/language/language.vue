<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="container">
			<view class="header">
			</view>
			<view class="content">
				<view class="title">外语类</view>
				<view class="desc">
					以“我和开大有个故事”为主题的英文演讲展示活动，献礼母校成立60周年。让我们用饱含深情的英文写下自己和母校之间的点点滴滴，并用演讲的形式呈现出来（视频或音频）。演讲内容可以是“我”和母校有关的人、事、物之间的故事、情怀、感受，文体不限，推荐适合演讲的小品文、记叙文。
				</view>
			</view>
			<view class="btn-container" v-if="openFlag">
				<button class="round" @click="toSubmitType">了解详情</button>
				<button class="round" @click="toWorkShow">作品展示</button>
			</view>
		</view>
	</view>
</template>

<script>
	const { loadEntryStatus } = require('../common/entry.js')
	export default {
		data() {
			return {
				openFlag: false
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
		},
		onLoad: function() {
			const that = this;
			const entryPromise = loadEntryStatus();
			entryPromise.then((res) => {
				console.log(res);
				that.openFlag = res.data;
			});
		}
	}
</script>

<style>
@import url("language.css");
</style>
