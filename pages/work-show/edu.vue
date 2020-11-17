<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">作品展示</block></cu-custom>
		<view class="header"></view>
		<!-- <view class="reg-infos">
			<view class="author-info">
				<text>作者姓名：张三</text>
				<text>所属院校：xxx</text>
			</view>
			<view>
				<text>专业年级：xxx</text>
			</view>
			<view class="teacher-info">
				<text>指导老师：李四</text>
				<text>指导老师所属学院：xxx</text>
			</view>
		</view> -->
		<view class="container">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="cu-card case no-card" v-for="(item, index) in dataList" :key="index">
					<view class="ranking" v-if="item.workRank && item.workRank < 100000">
						<image v-if="item.workRank === 1" src="../../static/ranking/no1.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
						<image v-else-if="item.workRank === 2" src="../../static/ranking/no2.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
						<image v-else-if="item.workRank === 3" src="../../static/ranking/no3.png" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
						<view v-else class="cu-avatar round">{{item.workRank}}</view>
					</view>
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top"><view class="text-cut text-xl">{{item.worksName}}</view></view>
						<view class="flex margin-top-sm text-sm padding-left">
							<view class="flex flex-direction">
								<view>作者：{{item.author}}</view>
								<view class="text-cut text-gray">{{item.submitTime.substring(5, 16)}}・{{item.college}}・{{item.grade}}</view>
							</view>
						</view>
						
						<view class="image" v-if="item.worksType === '文档类'">
							<image @click="openDocument(item)"
								src="https://kdapp.oss-cn-shanghai.aliyuncs.com/documents.png" mode="aspectFill"
							></image>
						</view>
						<view v-if="item.worksType === '视频类'">
							<video @click="viewDetail(item)"
							      id="myVideo" 
							      :src="item.filePath" 
							      @error="videoErrorCallback" 
							      :show-center-play-btn='false' 
							      :show-play-btn="true" 
							      controls
							    ></video>
						</view>
						<view class="image audio-container" v-if="item.worksType === '音频类'">
							<image @click="viewDetail(item)"
								src="https://kdapp.oss-cn-shanghai.aliyuncs.com/audio2.png" mode="aspectFill"
							></image>
						</view>
						
						<view class="work-desc">
							<text>创作说明：{{item.workDesc}}</text>
						</view>
						
						<view class="btn-container">
							<button @click="openDocument(item)" v-if="item.worksType === '文档类'">查看详情</button>
							<button @click="viewDetail(item)" v-if="item.worksType !== '文档类'">查看详情</button>
						</view>
						<view class="padding-sm padding-left flex text-gray text-sm" v-if="item.teacher">
							<view class="padding-right-sm">指导老师：<text v-if="item.teacher">{{item.teacher}}・{{item.teacherCollege}}</text></view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; 
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		MescrollBody
	},
	data() {
		return {
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					// num: -1,
					size: 20 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
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
						uni.showLoading({
							title: '正在打开...'
						})
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
								uni.hideLoading();
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
		playVideo: function() {
			this.videoContext.play();
		},
		playAudio: function(item) {
			console.log('准备播放音频');
			const that = this;
			const innerAudioContext = wx.createInnerAudioContext();
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
		downCallback(){
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num - 1; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${constants.baseUrl}/works?category=文学与教育类&page=${pageNum}&size=${pageSize}`,
				success: (res) => {
					const data = res.data;
					const totalCount = res.header['X-Total-Count'];
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data; 
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = data.length; 
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = totalCount / 20; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = totalCount; 
					// 接口返回的是否有下一页 (true/false)
					let hasNext = data.length > 0; 
					//设置列表数据
					if(page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage); 
				},
				fail: () => {
					//  请求失败,隐藏加载状态
					this.mescroll.endErr()
				}
			})
		}
	}
};
</script>

<style>
@import url('edu.css');
</style>
