<template>
	<view class="page">
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">作品展示</block></cu-custom>
		<view class="container">
			<view class="body">
				
				<view v-if="item.worksType === '视频类'">
					<video 
						  id="myVideo" 
						  :src="item.filePath" 
						  @error="videoErrorCallback" 
						  :show-center-play-btn='false' 
						  :show-play-btn="true" 
						  controls
						></video>
				</view>
				
				<view v-if="item.worksType === '音频类'" class="margin-top margin-bottom">
					<!-- <audio poster="https://kdapp.oss-cn-shanghai.aliyuncs.com/audio.png" :name="item.fileName" :author="item.author" :src="item.filePath" id="myAudio" controls></audio> -->
					<!-- <button class="cu-btn bg-gradual-blue" @click="playAudio">播放</button> -->
					<!-- <view class="imt-audio" style="width: 90vw;">
						<view class="audio-wrapper">
							<view class="audio-number">{{currentTime}}</view>
							<slider class="audio-slider" :activeColor="color" block-size="16" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
							 @change="change"></slider>
							<view class="audio-number">{{durationTime}}</view>
						</view>
						<view class="audio-control-wrapper" :style="{color:color}">
							<view class="audio-control audio-control-prev" v-if="control" :style="{borderColor:color}" @click="prev">&#xe601;</view>
							<view class="audio-control audio-control-switch" :class="{audioLoading:loading}" :style="{borderColor:color}" @click="operation">{{loading?'&#xe600;':(paused?'&#xe865;':'&#xe612;')}}</view>
							<view class="audio-control audio-control-next" v-if="control" :style="{borderColor:color}" @click="next">&#xe601;</view>
						</view>
					</view> -->
					<imt-audio :src="audio[now]" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1" @next="now = now === audio.length-1?0:now+1"></imt-audio>
				</view>
			</view>
			<view class="title-box flex flex-direction justify-start">
				<view>{{item.worksName}}</view>
				<view class="author text-sm text-gray">作者：{{item.author}}・{{item.college}}・{{item.grade}}</view>
			</view>
			<view class="header">
				<view class="teacher text-red" v-if="item.teacher">指导老师：{{item.teacher}}・{{item.teacherCollege}}</view>
				<!-- <view class="author-info flex flex-direction"> -->
					<!-- <view class="author">作者：{{item.author}}・{{item.college}}・{{item.grade}}</view> -->
					<!-- <view class="college text-sm text-gray margin-top-xs">{{item.submitTime.substring(5, 10)}}</view> -->
				<!-- </view> -->
				<view>
					创作说明：{{item.workDesc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imtAudio from 'components/imt-audio/imt-audio'
	export default {
		components: {
			imtAudio
		},
		data() {
			return {
				item: null,
				videoContext: null,
				src: null,
				timer: null,
				audio: [],
				now: 0
			}
		},

		methods: {
			playVideo: function() {
				this.videoContext.play();
			}
		},
		onLoad: function(param){
			console.log('loaded');
			const work = JSON.parse(param.item);
			
			this.item = work;
			
			this.src = this.item.filePath;
			// this.duration = this.item.duration;
			// this.paused = true;
			// this.autoplay = false;
			this.audio.push(this.src);
		},
		onUnload: function() {
			// this.audio.destroy();
		}
	}
</script>

<style>
@import url("detail.css");
@font-face {
	font-family: 'icon';
	src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot');
	src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff') format('woff'),
		url('//at.alicdn.com/t/font_1104838_fxzimc34xw.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1104838_fxzimc34xw.svg#iconfont') format('svg');
}

.imt-audio {
	padding: 30upx;
	background: #fff;
	border-radius: 20upx;
}

.audio-wrapper {
	display: flex;
	align-items: center;
}

.audio-number {
	font-size: 24upx;
	line-height: 1;
	color: #333;
}

.audio-slider {
	flex: 1;
	margin: 0 30upx;
}

.audio-control-wrapper {
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "icon" !important;
}

.audio-control {
	font-size: 32upx;
	line-height: 1;
	border: 4upx solid;
	border-radius: 50%;
	padding: 16upx;
}

.audio-control-next {
	transform: rotate(180deg);
}

.audio-control-switch {
	font-size: 40upx;
	margin: 0 80upx;
}

.audioLoading {
	animation: loading 2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes loading {
	to {
		transform: rotate(360deg);
	}
}
</style>
