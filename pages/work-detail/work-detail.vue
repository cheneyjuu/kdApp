<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">{{navTitle}}</block></cu-custom>
		<view class="page">
			<image src="https://s1.ax1x.com/2020/08/10/aH01SJ.png" mode="scaleToFill"></image>
			<view class="container">
				<view class="header">
					<view class="title">上海开放大学</view>
					<view class="title">人文学院学生作品展示评选活动</view>
					<view class="title">（{{navTitle}}）</view>
				</view>
				<view class="content">
					<view class="desc" v-if="navTitle === '外语类'">
						以“我和开大有个故事”为主题，要用英文诉说自己和开放大学的点点滴滴，并用演讲的形式呈现出来（视频或音频）。演讲内容可以是“我”和开大有关的人、事、物之间的故事，应符合庆祝母校60周年主题，文体不限，推荐适合演讲的小品文、记叙文。
					</view>
					<view  v-if="navTitle === '艺术类'">
						<view class="title">视觉艺术作品</view>
						<view class="desc">以“行走在2020”或“校庆60周年”为主题。作品包括：绘画、海报、书法、漫画、摄影等，以图片形式提交。</view>
						<view class="title">音乐类作品</view>
						<view class="desc">以“想对您说”为主题为母校庆贺、献礼，录制演唱、演奏的作品。作品可以是独奏（唱）、重奏（唱）人、合奏（唱）等，以视频或音频形式提交。</view>
						<view class="title">舞蹈类作品</view>
						<view class="desc">以“2020与你同行舞由心生”为主题，录制舞蹈作品。舞种不限，可独舞，也可群舞。作品以视频形式提交。</view>
					</view>
					<view v-if="navTitle === '文学与教育类'">
						<view class="title">文学类</view>
						<view class="desc">以“行走2020”为主题，根据个人所见、所闻、所历、所思，将生活体验与生命感受撰写成文，不拘格套，倡导真感情与活性灵。体裁不限，可诗歌、散文、随笔、杂文、小说等多种文学形式，字数以1500-5000字为宜（诗歌除外）。</view>
						<view class="title">教育类</view>
						<view class="desc">以“学前儿童健康发展与家庭教育”为主题，根据专业所学与教育实践，撰写读书心得（小论文）、案例分析、活动设计（教学方案），或制作创意手工作品（可以图片形式上传）。参赛内容关注学前幼儿健康成长、亲自互动、学习与游戏行为、家庭教育等，重在教育实践的分析与创新尝试。</view>
					</view>
				</view>
				<view class="btn-container">
					<button class="cu-btn bg-gradual-red round" @click="joinNow">立即参与</button>
					<button class="cu-btn bg-gradual-green round" @click="showWork">作品展示</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTitle: ''
			}
		},
		methods: {
			joinNow: function() {
				uni.navigateTo({
					url: `/pages/submit-type/submit-type?title=${this.navTitle}`
				})
			},
			showWork: function() {
				uni.navigateTo({
					url: '/pages/work-show/work-show'
				})
			}
		},
		onLoad: function(param) {
			this.navTitle = param.title;
		}
	}
</script>

<style>
@import url("work-detail.css");
</style>
