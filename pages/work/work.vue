<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">提交作品</block></cu-custom>
		<view class="tips margin text-red text-bold">
			<view>上传作品步骤：</view>
			<view>1. 将文件发送给微信的“文件传输助手”</view>
			<view>2. 点击上传按钮，选择“文件上传助手”中的文件</view>
		</view>
		<view class="bg-white padding-bottom-sm">
			<view class="cu-form-group">
				<view class="title required">作者姓名</view>
				<input placeholder="姓名至少2个字符" name="input" @input="authorInput" :value="payload.author" />
			</view>
			<view class="cu-form-group">
				<view class="title required">所属学院/分校</view>
				<input placeholder="请填写" name="input" @input="collegeInput" :value="payload.college" />
			</view>
			<view class="cu-form-group">
				<view class="title required">专业/年级</view>
				<input placeholder="请填写" name="input" @input="gradeInput" :value="payload.grade" />
			</view>
			<view class="cu-form-group">
				<view class="title required">联系方式</view>
				<input placeholder="请填写手机号码" name="input" @input="phoneNumberInput" :value="payload.phoneNumber" />
			</view>
			<view class="cu-form-group">
				<view class="title required">作品名称</view>
				<input placeholder="请填写" name="input" @input="workInput" :value="payload.worksName" />
			</view>
			<view class="cu-form-group">
				<view class="title required">创作说明</view>
				<input placeholder="请填写" name="input" @input="workDescInput" :value="payload.workDesc" />
			</view>
			<view class="cu-form-group">
				<view class="title none-required">指导老师</view>
				<input placeholder="选填,可以为空" name="input" @input="teacherInput" :value="payload.teacher" />
			</view>
			<view class="cu-form-group">
				<view class="title none-required">指导老师所属学院</view>
				<input placeholder="选填,可以为空" name="input" @input="teacherCollegeInput" :value="payload.teacherCollege" />
			</view>
			<!-- <view class="cu-form-group">
				<view class="title required">作品类别</view>
				<picker :disabled="true" :value="index" :range="workCategory">
					<view class="picker">{{ workCategoryIndex > -1 ? workCategory[workCategoryIndex] : '请选择' }}</view>
				</picker>
			</view> -->
			<view class="cu-form-group">
				<view class="title required">作品类型</view>
				<picker @change="workTypeChange" :value="index" :range="workType">
					<view class="picker">{{ workTypeIndex > -1 ? workType[workTypeIndex] : '请选择' }}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title required">提交方式</view>
				<picker @change="submitTypeChange" :value="index" :range="submitType">
					<view class="picker">{{ submitTypeIndex > -1 ? submitType[submitTypeIndex] : '请选择' }}</view>
				</picker>
			</view>

			<view v-if="submitTypeIndex == 0 && doesSubmittedFlag === false">
				<view class="cu-bar bg-white solid-top none-required">
					<view class="action">作品上传 </view>
					<!-- <view class="action">{{ fileList.length }}/1</view> -->
				</view>
				<view class="cu-form-group">
					<text class="text-green none-required" v-if="progress">已完成：{{progress + '%'}}</text>
					<view class="grid col-4 grid-square flex-sub" v-if="!progress">
						<view class="bg-img" v-for="(item, index) in fileList" :key="index" @tap="ViewImage" :data-url="fileList[index]">
							<image :src="fileList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="uploadMeidaFile" v-if="fileList.length < 1"><text class="cuIcon-add"></text></view>
					</view>
				</view>
			</view>

			<view class="mail-info margin-top text-red" v-if="submitTypeIndex == 1">
				<view>
					请提交表单，并将您的作品发送给
					<text class="mail-address">shangkairenwen@163.com</text>
				</view>
				<view class="margin-top-sm">
					<view class="text-bold">
						邮件格式：
					</view>
					<text>主题：姓名#学院#专业/年级</text>
				</view>
				<view>
					<text>附件：作品</text>
				</view>
			</view>

			<view class="btn-container flex justify-center">
				<button class="cu-btn bg-gradual-red round" :disabled="doesSubmittedFlag" @click="submitWork">提交作品</button>
			</view>
		</view>
		<view class="footer margin-top padding text-gray">
			使用中如果有疑问或问题，请联系技术人员：
			<view class="contact">手机: 18021558561</view>
			<view class="contact">微信: 18021558561</view>
		</view>
		
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="gotoPrev"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">提交成功</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="gotoPrev">确定</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalNameLogin == 'DialogModalLogin' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">查看作品和在线投稿须先登录</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">立即登录</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalNameWork == 'DialogModalWork' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您已上传过作品，是否现在查看您的作品？</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideWorkModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="gotoWork">立即查看</button>
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
			type: '',
			workCategoryIndex: -1,
			workCategory: ['外语类', '艺术类', '文学与教育类'],
			workTypeIndex: -1,
			workType: ['视频类', '音频类', '文档类'],
			submitTypeIndex: 0,
			submitType: ['小程序提交', '邮件提交'],
			fileList: [],
			payload: {},
			progress: null,
			modalName: null,
			modalNameLogin: null,
			modalNameWork: null,
			doesSubmittedFlag: true
		};
	},
	methods: {
		viewCode: function() {
			wx.previewImage({
				current: 'https://kdapp.oss-cn-shanghai.aliyuncs.com/2020-09-08_18-15-51.png',
				urls: ['https://kdapp.oss-cn-shanghai.aliyuncs.com/2020-09-08_18-15-51.png']
			})
		},
		authorInput: function(e) {
			this.payload.author = e.detail.value;
		},
		collegeInput: function(e) {
			this.payload.college = e.detail.value;
		},
		gradeInput: function(e) {
			this.payload.grade = e.detail.value;
		},
		phoneNumberInput: function(e) {
			this.payload.phoneNumber = e.detail.value;
		},
		workInput: function(e) {
			this.payload.worksName = e.detail.value;
		},
		workDescInput: function(e) {
			this.payload.workDesc = e.detail.value;
		},
		teacherInput: function(e) {
			this.payload.teacher = e.detail.value;
		},
		teacherCollegeInput: function(e) {
			this.payload.teacherCollege = e.detail.value;
		},
		workCategoryChange: function(e) {
			this.workCategoryIndex = e.detail.value;
			this.payload.workCategory = this.workCategory[this.workCategoryIndex];
		},
		workTypeChange: function(e) {
			this.workTypeIndex = e.detail.value;
			this.payload.worksType = this.workType[this.workTypeIndex];
		},
		submitTypeChange: function(e) {
			this.submitTypeIndex = e.detail.value;
			this.payload.submitType = this.submitTypeIndex;
			console.log('submitTypeIndex', this.submitTypeIndex);
		},
		uploadMeidaFile: function() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			
			wx.chooseMessageFile({
				count: 1,
				type: 'all',
				extension: ['mp3', 'mp4', 'doc', 'docx', 'ppt', 'pptx', 'gif', 'png', 'jpg', 'jpeg'],
				success: function(res) {
					console.log('enter choose file');
					if (!that.payload || !that.payload.worksType) {
						uni.showToast({
							icon: 'none',
							title: '请选择作品类型'
						})
						return;
					}
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFiles;
					that.payload.fileName = tempFilePaths[0].name;
					console.log('tempFilePaths', tempFilePaths);
					const fileExt = that.payload.fileName.substring(that.payload.fileName.lastIndexOf('.') + 1, that.payload.fileName.length);
					console.log('file ext', fileExt);
					console.log('payload worksType', that.payload.worksType);
					let fileSize = 20 * 1024 * 1024;
					let fileSizeDesc = '文件不能超过20M';
					if (that.payload.worksType === '音频类') {
						if (fileExt.toUpperCase() !== 'MP3' || fileExt.toUpperCase() !== 'M4A' || fileExt.toUpperCase() !== 'AAC' || fileExt.toUpperCase() !== 'WAV' || fileExt.toUpperCase() !== 'FLAC') {
							uni.showToast({
								icon: 'none',
								title: ' 作品文件类型不正确'
							})
							return;
						}
					}
					
					if (that.payload.worksType === '视频类') {
						fileSize = 50 * 1024 * 1024;
						fileSizeDesc = '文件不能超过50M';
						if (fileExt.toUpperCase() !== 'MP4') {
							uni.showToast({
								icon: 'none',
								title: ' 作品文件类型不正确'
							})
							return;
						}
					}
					
					if (that.payload.worksType === '文档类') {
						if (fileExt.toUpperCase() === 'MP3' || fileExt.toUpperCase() === 'MP4') {
							uni.showToast({
								icon: 'none',
								title: ' 作品文件类型不正确'
							})
							return;
						}
					}
					
					wx.getFileInfo({
						filePath: tempFilePaths[0].path,
						success: function(rst) {
							console.log('file info');
							console.log(rst);
							if (rst.size > fileSize) {
								uni.showToast({
									icon: 'none',
									title: fileSizeDesc
								})
							} else {
								const uploadTask = uni.uploadFile({
									url: `${constants.baseUrl}/uploadMedia`,
									filePath: tempFilePaths[0].path,
									name: 'file',
									formData: {
										Authorization: 'Bearer ' + token
									},
									success: (uploadFileRes) => {
										const data = uploadFileRes.data;
										const {fileDownloadUri, duration, durationDesc} = JSON.parse(data);
										that.payload.filePath = fileDownloadUri;
										that.payload.duration = duration;
										that.payload.durationDesc = durationDesc;
									}
								});
								
								uploadTask.onProgressUpdate((res) => {
									that.progress = res.progress;
									console.log('上传进度' + res.progress);
									console.log('已经上传的数据长度' + res.totalBytesSent);
									console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
								});
							}
						}
					})
				}
			});
		},
		submitWork: function() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			console.log({payload: this.payload});
			const phoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
			const charRegex = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
			const numRegex = /^\d{1,}$/;
			if (!this.payload.author) {
				uni.showToast({
					icon: 'none',
					title: '请填写作者'
				});
				return;
			}
			if (charRegex.test(this.payload.author) || numRegex.test(this.payload.author)) {
				console.log('123123123123');
				uni.showToast({
					icon: 'none',
					title: '作者填写有误'
				});
				return;
			}
			if (this.payload.author && this.payload.author.length < 2) {
				uni.showToast({
					icon: 'none',
					title: '作者填写有误'
				});
				return;
			}
			if (this.payload.author && this.payload.author.length > 10) {
				uni.showToast({
					icon: 'none',
					title: '作者填写有误'
				});
				return;
			}
			if (!this.payload.grade) {
				uni.showToast({
					icon: 'none',
					title: '请填写专业/年级'
				});
				return;
			}
			if (charRegex.test(this.payload.grade)) {
				uni.showToast({
					icon: 'none',
					title: '年级填写有误'
				});
				return;
			}
			if (this.payload.grade && this.payload.grade.length < 2) {
				uni.showToast({
					icon: 'none',
					title: '年级填写有误'
				});
				return;
			}
			if (this.payload.grade && this.payload.grade.length > 15) {
				uni.showToast({
					icon: 'none',
					title: '年级填写有误'
				});
				return;
			}
			if (!this.payload.phoneNumber) {
				uni.showToast({
					icon: 'none',
					title: '请填写联系方式'
				});
				return;
			}
			if (!phoneRegex.test(this.payload.phoneNumber)) {
				uni.showToast({
					icon: 'none',
					title: '手机号填写有误'
				})
				return;
			}
			if (!this.payload.worksName) {
				uni.showToast({
					icon: 'none',
					title: '请填写作品名称'
				});
				return;
			}
			if (this.payload.worksName && this.payload.worksName.length < 2) {
				uni.showToast({
					icon: 'none',
					title: '作品名称填写有误'
				});
				return;
			}
			if (!this.payload.workDesc) {
				uni.showToast({
					icon: 'none',
					title: '请填写创作说明'
				});
				return;
			}
			if (this.payload.workDesc && this.payload.workDesc.length < 1) {
				uni.showToast({
					icon: 'none',
					title: '创作说明填写有误'
				});
				return;
			}
			if (!this.payload.workCategory) {
				uni.showToast({
					icon: 'none',
					title: '请选择作品类别'
				});
				return;
			}
			if (!this.payload.worksType) {
				uni.showToast({
					icon: 'none',
					title: '请选择作品类型'
				});
				return;
			}
			// 如果是小程序提交，则需要判断是否上传了附件
			if (this.payload.submitType === 0) {
				if (!this.payload.fileName || !this.payload.filePath) {
					uni.showToast({
						icon: 'none',
						title: '请上传作品'
					});
					return;
				}
			}
			
			uni.request({
				url: `${constants.baseUrl}/works`,
				method: 'POST',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				data: this.payload,
				success: function(rst) {
					console.log('作品提交完成');
					console.log(rst);
					if (rst.data.code === 200) {
						that.modalName = 'DialogModal1';
					}
				}
			});
		},
		gotoPrev: function() {
			this.modalName = null;
			uni.navigateBack({
				delta: 1
			})
		},
		gotoWork: function() {
			const that = this;
			this.modalNameWork = null;
			uni.navigateTo({
				url: '../profile/my-work?category=' + that.payload.workCategory
			})
		},
		hideWorkModal: function() {
			this.modalNameWork = null;
		},
		doesSubmitted: function() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			let category;
			if (this.type === 'language') {
				category = '外语类';
			}
			if (this.type === 'art') {
				category = '艺术类';
			}
			if (this.type === 'edu') {
				category = '文学与教育类';
			}
			uni.request({
				url: `${constants.baseUrl}/works/check/${category}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: function(rst) {
					if (rst.data.code === 401) {
						that.modalNameLogin = 'DialogModalLogin';
						return;
					} else {
						that.doesSubmittedFlag = rst.data.data;
						if (that.doesSubmittedFlag === true) {
							that.modalNameWork = 'DialogModalWork';
						}
					}
				}
			})
		},
		wxGetUserInfo() {
			let that = this;
			that.modalName = null;
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
							that.modalNameLogin = null;
							uni.hideLoading();
							// uni.navigateTo({
							// 	url: `/pages/work/work?type=${this.type}`
							// })
						}
					});
				}
			});
		},
		hideModal: function() {
			this.modalNameLogin = null;
		}
	},
	onLoad: function(param) {
		console.log('in work page');
		console.log(param);
		const that = this;
		const token = uni.getStorageSync('id_token');
		if (!token) {
			that.modalNameLogin = 'DialogModalLogin';
			return;
		}
		
		this.type = param.type;
		if (this.type === 'language') {
			this.workCategoryIndex = 0;
		}
		if (this.type === 'art') {
			this.workCategoryIndex = 1;
		}
		if (this.type === 'edu') {
			this.workCategoryIndex = 2;
		}
		this.payload.workCategory = this.workCategory[this.workCategoryIndex];
		this.payload.submitType = 0;
		if (null != param.item) {
			this.payload = JSON.parse(param.item);
			if (this.payload.worksType === '视频类') {
				this.workTypeIndex = 0;
			}if (this.payload.worksType === '音频类') {
				this.workTypeIndex = 1;
			}if (this.payload.worksType === '文档类') {
				this.workTypeIndex = 2;
			}
			// this.payload.worksType = this.workType[this.workTypeIndex];
			this.doesSubmittedFlag = false;
		}
		if (!param.item) {
			this.doesSubmitted();
		}
	},
	onShow:function(param){
		console.log('on show');
		console.log(param);
	}
};
</script>

<style>
@import url('work.css');
</style>
