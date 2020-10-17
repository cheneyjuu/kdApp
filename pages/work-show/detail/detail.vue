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
					<imt-audio autoplay continue :src="audio[now]" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1" @next="now = now === audio.length-1?0:now+1"></imt-audio>
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
				// audio: uni.createInnerAudioContext(),
				timer: null,
				currentTime: '', //当前播放时间
				durationTime: '', //总时长
				current: '', //slider当前进度
				loading: false, //是否处于读取状态
				paused: true, //是否处于暂停状态
				seek: false ,//是否处于拖动状态,
				audio: ['https://kdwx.iamedu.cn:8443/api/downloadFile/video/Introduction1601966461088.mp3'],
				now: 0
			}
		},
		props: {
			src: String, //音频链接
			autoplay: Boolean, //是否自动播放
			duration: Number, //总时长（单位：s）
			durationDesc: String, //总时长（单位：s）
			control: {
				type:Boolean,
				default:true
			}, //是否需要上一曲/下一曲按钮
			continue:Boolean,//播放完成后是否继续播放下一首，需定义@next事件
			color: {
				type:String,
				default:'#169af3'
			}
		},
		methods: {
			playVideo: function() {
				this.videoContext.play();
			},
			//返回prev事件
			prev() {
				this.$emit('prev')
			},
			//返回next事件
			next() {
				this.$emit('next')
			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//播放/暂停操作
			operation() {
				if (this.audio.paused) {
					this.audio.play()
					this.loading = false
				} else {
					this.audio.pause()
				}
			},
			//完成拖动事件
			change(e) {
				audio.seek(e.detail.value)
			}
		},
		created() {
			// this.audio = uni.createInnerAudioContext();
			console.log('created');
			this.audio.src = this.src
			this.current = 0
			this.durationTime = this.format(this.duration)
			this.audio.obeyMuteSwitch = false
			this.audio.autoplay = false
			//音频进度更新事件
			this.audio.onTimeUpdate(() => {
				if (!this.seek) {
					this.current = this.audio.currentTime
				}
			})
			//音频播放事件
			this.audio.onPlay(() => {
				this.audio.paused = false
				this.audio.loading = false
			})
			//音频暂停事件
			this.audio.onPause(() => {
				this.audio.paused = true
			})
			//音频结束事件
			this.audio.onEnded(() => {
				if (this.continue) {
					this.next()
				} else {
					this.audio.paused = true
					this.current = 0
				}
			})
			//音频完成更改进度事件
			this.audio.onSeeked(() => {
				this.seek = false
			})
		},
		watch: {
			//监听音频地址更改
			src(e) {
				this.audio.src = e
				this.current = 0
				this.audio.play()
				this.loading = true;
				this.audio.onCanplay(() => {
					this.loading = false;
				});
			},
			//监听总时长改变
			duration(e) {
				this.durationTime = this.format(e)
			},
			//监听当前进度改变
			current(e) {
				this.currentTime = this.format(e)
			}
		},
		onLoad: function(param){
			console.log('loaded');
			const work = JSON.parse(param.item);
			
			this.item = work;
			
			this.src = this.item.filePath;
			this.duration = this.item.duration;
			// this.paused = true;
			// this.autoplay = false;
			this.audio.push(src);
		},
		onUnload: function() {
			this.audio.destroy();
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
