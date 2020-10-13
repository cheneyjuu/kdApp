<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="container">
			<view class="header">
			</view>
			<view class="content">
				<view class="title">文学与教育类</view>
				<view class="desc-container">
					<view class="desc-item">
						<view class="title">文学类</view>
						<view class="desc">
							以“行走2020”为主题，根据个人所见、所闻、所历、所思，将生活体验与生命感受撰写成文，不拘格套，倡导真感情与活性灵。体裁不限，可诗歌、散文、随笔、杂文、小说等多种文学形式，字数以1500-5000字为宜（诗歌除外）。
						</view>
					</view>
					<view class="desc-item">
						<view class="title">教育类</view>
						<view class="desc">
							以“学前儿童健康发展与家庭教育”为主题，根据专业所学与教育实践，撰写读书心得（小论文）、案例分析、活动设计（教学方案），或制作创意手工作品（可以图片形式上传）。参赛内容关注学前幼儿健康成长、亲子互动、学习与游戏行为、家庭教育等，重在教育实践的分析与创新尝试。
						</view>
					</view>
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
					url: '/pages/submit-type/submit-type?type=edu'
				})
			},
			toWorkShow: function() {
				uni.navigateTo({
					url: '/pages/work-show/edu'
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
@import url("edu.css");
</style>
