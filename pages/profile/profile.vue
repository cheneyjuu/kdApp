<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">个人中心</block></cu-custom>
		<scroll-view scroll-y class="page">
			<view class="cu-card case bg-dark-blue" :class="'no-card'">
				<view class="user-box flex justify-center align-center">
					<view class="flex flex-direction align-center" v-if="!token">
						<view
							class="cu-avatar xl radius"
							style="background-image:url(http://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png);"
						></view>
					</view>

					<view class="flex flex-direction align-center" v-else-if="token">
						<view class="cu-avatar xl radius" :style="userInfo.avatarStyle"></view>
						<view class="margin-top-sm text-df">{{ userInfo.nickName }}</view>
					</view>
				</view>
			</view>

			<!-- 我的作品 -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 我的作品
				</view>
			</view>
			<view class="cu-list grid col-3 no-border">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<6">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="btn-container" v-if="token">
				<button class="lg cu-btn bg-gradual-red" @click="logout">退出登录</button>
			</view>

			<view class="margin-top flex justify-center flex-direction bg-white" :class="token ? 'animation-fade' : ''" v-if="!token">
				<view class="flex justify-center margin-top margin-bottom text-gray">使用微信帐号登录小程序</view>
				<view class="margin-bottom-sm" style="width: 80%; margin-left: 10%;">
					<view class="flex justify-between" style="width: 100%;">
						<button class="cu-btn shadow" style="width: 40%;">取消</button>
						<button
							class="cu-btn bg-gradual-orange shadow"
							style="width: 40%;"
							open-type="getUserInfo"
							withCredentials="true"
							lang="zh_CN"
							@getuserinfo="wxGetUserInfo"
						>
							授权
						</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			loginInfo: {},
			userInfo: uni.getStorageSync('userInfo'),
			cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '外语类'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '视觉艺术'
				}, {
					cuIcon: 'musicfill',
					color: 'yellow',
					badge: 0,
					name: '音乐类'
				}, {
					cuIcon: 'evaluate',
					color: 'olive',
					badge: 22,
					name: '舞蹈类'
				}, {
					cuIcon: 'discoverfill',
					color: 'cyan',
					badge: 0,
					name: '文学类'
				}, {
					cuIcon: 'selection',
					color: 'blue',
					badge: 0,
					name: '教育类'
				}],
		};
	},
	methods: {
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
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/profile/user-info'
							})
						}
					});
				}
			});
		},
		logout: function() {
			uni.removeStorageSync('id_token');
			uni.removeStorageSync('userInfo');
			this.token = null;
		}
	}
};
</script>

<style>
@import url("profile.css");
</style>
