<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">提交作品</block></cu-custom>
		<view class="tips margin text-gray">
			<view>上传作品步骤：</view>
			<view>1. 将文件发送给微信的“文件传输助手”</view>
			<view>2. 点击上传按钮，选择“文件上传助手”中的文件</view>
		</view>
		<view class="bg-white padding-bottom-sm">
			<view class="cu-form-group">
				<view class="title required">作者姓名</view>
				<input placeholder="请填写" name="input" @input="authorInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">所属学院</view>
				<input placeholder="请填写" name="input" @input="collegeInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">专业/年级</view>
				<input placeholder="请填写" name="input" @input="gradeInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">联系方式</view>
				<input placeholder="请填写" name="input" @input="phoneNumberInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">作品名称</view>
				<input placeholder="请填写" name="input" @input="workInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">创作说明</view>
				<input placeholder="请填写" name="input" @input="workDescInput" />
			</view>
			<view class="cu-form-group">
				<view class="title none-required">指导老师</view>
				<input placeholder="请填写" name="input" @input="teacherInput" />
			</view>
			<view class="cu-form-group">
				<view class="title none-required">指导老师所属学院</view>
				<input placeholder="请填写" name="input" @input="teacherCollegeInput" />
			</view>
			<view class="cu-form-group">
				<view class="title required">作品类别</view>
				<picker disabled="true" :value="index" :range="workCategory">
					<view class="picker">{{ workCategoryIndex > -1 ? workCategory[workCategoryIndex] : '请选择' }}</view>
				</picker>
			</view>
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

			<view v-if="submitTypeIndex == 0">
				<view class="cu-bar bg-white margin-top solid-top">
					<view class="action none-required">作品上传 </view>
					<view class="action">{{ fileList.length }}/1</view>
				</view>
				<view class="cu-form-group">
					<text class="text-green" v-if="progress">已完成：{{progress + '%'}}</text>
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
					请将您的作品以下面格式发送给
					<text class="mail-address">xxx@sample.com</text>
				</view>
				<view class="margin-top-sm">
					<text class="text-bold">主题：</text>
					<text class="padding-lr">姓名#作品类别#作品类型</text>
				</view>
				<view>
					<text class="text-bold">附件：</text>
					<text class="padding-lr">作品</text>
				</view>
			</view>

			<view class="btn-container flex justify-center">
				<button class="cu-btn bg-gradual-red round" :disabled="submitTypeIndex == 1" @click="submitWork">提交作品</button>
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
				<view class="padding-xl">作品上传成功</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="gotoPrev">确定</button>
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
		};
	},
	methods: {
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
				extension: ['mp3', 'mp4', 'doc', 'docx'],
				success: function(res) {
					console.log('enter choose file');
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFiles;
					that.payload.fileName = tempFilePaths[0].name;
					console.log('tempFilePaths', tempFilePaths);
					
					wx.getFileInfo({
						filePath: tempFilePaths[0].path,
						success: function(rst) {
							console.log('file info');
							console.log(rst);
							if (rst.size > (20 * 1024 * 1024)) {
								uni.showToast({
									icon: 'none',
									title: '文件不能超过20M'
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
			console.log({payload: this.payload});
			if (!this.payload.fileName || !this.payload.filePath) {
				uni.showToast({
					title: '请上传作品'
				});
				return;
			}
			if (!this.payload.author) {
				uni.showToast({
					title: '请填写作者'
				});
				return;
			}
			if (!this.payload.grade) {
				uni.showToast({
					title: '请填写专业/年级'
				});
				return;
			}
			if (!this.payload.phoneNumber) {
				uni.showToast({
					title: '请填写联系方式'
				});
				return;
			}
			if (!this.payload.worksName) {
				uni.showToast({
					title: '请填写作品名称'
				});
				return;
			}
			if (!this.payload.workDesc) {
				uni.showToast({
					title: '请填写创作说明'
				});
				return;
			}
			if (!this.payload.workCategory) {
				uni.showToast({
					title: '请选择作品类别'
				});
				return;
			}
			if (!this.payload.worksType) {
				uni.showToast({
					title: '请选择作品类型'
				});
				return;
			}
			
			uni.request({
				url: `${constants.baseUrl}/works`,
				method: 'POST',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
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
		}
	},
	onLoad: function(param) {
		console.log('in work page');
		console.log(param);
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
	}
};
</script>

<style>
@import url('work.css');
</style>
