<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">我的作品</block></cu-custom>
		<view class="container">
			<view class="header">
			</view>
			<view v-if="!dataList || dataList.length === 0" class="flex justify-center align-center margin-top-sm text-xxl text-shadow text-light text-gray">
				<text class="cuIcon cuIcon-creative padding-lr-sm text-yellow"></text>快来投稿吧！
			</view>
			<view class="cu-card case no-card" v-for="(item, index) in dataList" :key="index" v-if="dataList && dataList.length > 0">
				<view class="cu-item shadow">
					<!-- <view class="margin-top-sm flex justify-end solid-bottom padding-bottom-sm padding-right" v-if="item.status === 0"> -->
						<!-- <text class="text-blue padding-right-sm" @tap="modify(item)">修改作品信息</text> -->
						<!-- <text class="text-blue" @tap="reUpload(item)">重新上传作品</text> -->
					<!-- </view> -->
					<view class="flex align-center padding-left padding-top"><view class="text-cut text-xl">{{item.worksName}}</view></view>
					<view class="desc margin-top-sm">
						<text>
							<text>创作说明：</text>
							{{item.workDesc}}
						</text>
					</view>
					
					<view class="image" v-if="item.worksType === '文档类'">
						<image
							src="https://kdapp.oss-cn-shanghai.aliyuncs.com/documents.png" mode="aspectFill"
						></image>
					</view>
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
					<view class="image audio-container" v-if="item.worksType === '音频类'">
						<image
							src="https://kdapp.oss-cn-shanghai.aliyuncs.com/audio2.png" mode="aspectFill"
						></image>
						<!-- <view class="backdrop"></view>
						<view class="play-btn" @click="playAudio(item)" v-if="isAudioPlayed === false">
							<text class="cuIcon cuIcon-playfill"></text>
						</view>
						<view class="play-btn" @click="stopAudio" v-if="isAudioPlayed === true">
							<text class="cuIcon cuIcon-stop"></text>
						</view> -->
					</view>
					
					<view class="cu-list menu-avatar">
						<view class="cus-activity">
							<view class="padding-left">上传日期：{{item.submitTime.substring(5, 16)}}</view>
							<view class="flex margin-right justify-end">								
								<button class="bg-gradual-red cu-btn margin-right-sm sm" @tap="modify(item)" v-if="item.status === 0">修改作品</button>
								<button class="cu-btn bg-blue sm" @click="openDocument(item)" v-if="item.worksType === '文档类' && item.isPic === false">查看详情</button>
								<button class="cu-btn bg-blue sm" @click="viewPic(item)" v-if="item.worksType === '文档类' && item.isPic === true">查看详情</button>
								<button class="cu-btn bg-blue sm" @click="viewDetail(item)" v-if="item.worksType !== '文档类'">查看详情</button>
							</view>
							
							<!-- <view class="activity-action btn-container"><button class="cu-btn round" @click="playVideo(item)" v-if="item.worksType === '视频类'">播放</button></view> -->
							<!-- <view class="activity-action btn-container"><button class="cu-btn round" @click="playAudio(item)" v-if="item.worksType === '音频类'">播放</button></view> -->
						</view>
					</view>
					<view class="padding-sm padding-left flex text-gray text-sm" v-if="item.teacher">
						<view class="padding-right-sm">指导老师：{{item.teacher}}</view>
						<view>指导老师所属学院：{{item.teacherCollege}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您还未登录，是否现在登录？</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as constants from '@/utils/constant.js';
	export default {
		data() {
			return {
				modalName: null,
				category: '',
				// 列表数据
				dataList: [],
				videoContext: null,
				innerAudioContext: null,
				isAudioPlayed: false
			};
		},
		methods: {
			openDocument: function(item) {
				console.log('查看文件', item.filePath);
				uni.downloadFile({
					url: item.filePath, //要预览的地址
					success: function(res) {
						console.log(res);
						if (res.statusCode === 200) {
							//成功
							const filePath = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
							console.log('Path', filePath);
							// wx.openDocument({
							// 	filePath: Path, //要打开的文件路径
							// 	success: function(res) {
							// 		console.log('打开PDF成功');
							// 	}
							// });
							uni.openDocument({
								filePath: filePath,
								fileType: item.fileSuffix,
								success:function(){
									console.log('打开成功');
								}
							})
						}
					},
					fail: function(res) {
						console.log(res); //失败
					}
				});
			},
			viewDetail: function(item) {
				uni.navigateTo({
					url: `/pages/work-show/detail/detail?item=${JSON.stringify(item)}`
				})
			},
			viewPic: function(item) {
				console.log('view pic');
				uni.navigateTo({
					url: `/pages/work-show/detail/pic-details?item=${JSON.stringify(item)}`
				})
			},
			modify: function(item) {
				uni.navigateTo({
					url: '../work/work?item=' + JSON.stringify(item)
				})
			},
			// reUpload: function(item) {},
			playVideo: function() {
				this.videoContext.play();
			},
			playAudio: function(item) {
				console.log('准备播放音频');
				const that = this;
				that.innerAudioContext = innerAudioContext;
				console.log(that.innerAudioContext);
				innerAudioContext.autoplay = true;
				innerAudioContext.src = item.filePath;
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				  that.isAudioPlayed = true;
				})
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				})
			},
			stopAudio: function() {
				console.log('准备停止音频');
				const that = this;
				console.log(that.innerAudioContext);
				that.innerAudioContext.stop();
				that.innerAudioContext.onStop(() => {
					console.log('音频停止成功');
					that.isAudioPlayed = false;
				});
			},
			videoErrorCallback: function(e) {
				console.log(e.detail.errMsg);
			},
			loadDate: function(category) {
				const that = this;
				const token = uni.getStorageSync('id_token');
				if (!token) {
					this.modalName = 'DialogModal1';
					return;
				}
				uni.request({
					url: `${constants.baseUrl}/works/user?category=${category}`,
					method: 'GET',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + token
					},
					success: function(res) {
						that.dataList = res.data.data;
						that.dataList.forEach(item => {
							if (item.fileSuffix === 'png' || item.fileSuffix === 'gif' || item.fileSuffix === 'jpg' || item.fileSuffix === 'jpeg') {
								item.isPic = true;
							} else {
								item.isPic = false;
							}
						});
					}
				});
			},
			wxGetUserInfo() {
				let that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log({
							userinfo: infoRes
						});
						that.loginInfo = infoRes;
						that.nickName = infoRes.userInfo.nickName;
						that.avatarUrl = infoRes.userInfo.avatarUrl;
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							that.login();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			login() {
				uni.removeStorageSync('sessionId');
				let that = this;
				const isCanUse = uni.getStorageSync('isCanUse');
				if (isCanUse === false) {
					uni.showLoading({
						title: '登录中...'
					});
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							if (!that.isCanUse) {
								//非第一次授权获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log({
											getUserInfo: infoRes
										});
										that.loginInfo = infoRes;
									}
								});
							}
							that.exchangeInfo(loginRes.code);
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			exchangeInfo(code) {
				const that = this;
				uni.request({
					url: `${constants.baseUrl}/global/login/app`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					data: {
						code: code,
						encryptedData: this.loginInfo.encryptedData,
						iv: this.loginInfo.iv
					},
					success: res => {
						const data = res.data;
						// retry
						if (res.statusCode === 500) {
							this.wxGetUserInfo();
							return;
						}
						console.dir(data);
						that.updateAccount(data);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			updateAccount(payload) {
				console.log('update account');
				console.log(payload);
				const that = this;
				uni.request({
					url: `${constants.baseUrl}/global/account`,
					method: 'POST',
					data: payload,
					success: res => {
						console.log(res);
						that.userInfo = payload;
						that.authentication(payload.openId);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			authentication(openId) {
				const that = this;
				uni.request({
					url: `${constants.baseUrl}/authenticate`,
					data: {
						username: openId,
						password: openId
					},
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						that.token = res.data.id_token;
						that.userInfo.avatarStyle = `background-image:url(${that.userInfo.avatarUrl})`;
						console.log(that.userInfo.avatarStyle);
						uni.setStorage({
							key: 'userInfo',
							data: that.userInfo
						});
						uni.setStorage({
							key: 'id_token',
							data: that.token,
							success: () => {
								that.modalName = null;
								uni.hideLoading();
								that.loadDate();
							}
						});
					}
				});
			}
		},
		onLoad: function(param) {
			this.loadDate(param.category);
			this.category = param.category;
		},
		onReady:function(){
			this.videoContext = wx.createVideoContext('myVideo');
		},
		onShow:function(){
			if (this.category) {
				this.loadDate(this.category);
			}
		}
	};
</script>

<style>
@import url('my-work.css');
</style>
