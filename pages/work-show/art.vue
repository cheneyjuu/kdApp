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
			<scroll-view scroll-y="true" class="content bg-white margin-top">
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top"><view class="text-cut text-xl">作品名称</view></view>
						<view class="desc">
							<text>
								<text>创作说明：</text>
								为艺术而人生，为人生而艺术，吾以吾法表达吾之审美理想，天马行空地思考，自由自在地表达，方法手段无拘无束，材料媒介没有界限，突破抽象与具象的藩篱，于冥冥之中揣摩到美的极光，体味心灵的自由。
							</text>
						</view>
						<view class="image">
							<image
								src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597060339166&di=5080a3aa445e7810887d6e40ccf3456d&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150119%2F0006019059970869_b.jpg"
							></image>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info flex flex-direction">
									<view class="user flex padding-left"><view class="author">作者：李四（xx 年级）</view></view>
									<view class="text-gray">上传日期：2020-08-20</view>
								</view>
								<view class="activity-action btn-container"><button class="cu-btn round">查看详情</button></view>
							</view>
						</view>
						<view class="padding-sm padding-left flex text-gray text-sm">
							<view class="padding-right-sm"> 50 展现</view>
							<view> 20 阅读</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- <view class="container"> -->
		<!-- <view class="header"></view> -->
		<!-- <scroll-view scroll-y="true" class="content">
				
				
				<view class="cu-bar solid-bottom text-red no-card">
					<view class="action">
						<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
						<text class="text-lg text-bold">文学类</text>
					</view>
				</view>
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="text-cut text-xl">文学类作品标题</view>
						</view>
						<view class="image"><image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1921475000,2994854366&fm=26&gp=0.jpg"></image></view>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info solid-bottom padding">
									<view class="user">张三</view>
									<view class="text-dark-blue">
										2020-08-20
									</view>
								</view>
								<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
							</view>
						</view>
					</view>
					
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="text-cut text-xl">文学类作品标题</view>
						</view>
						<view class="image"><image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597060339166&di=5080a3aa445e7810887d6e40ccf3456d&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150119%2F0006019059970869_b.jpg"></image></view>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info solid-bottom padding">
									<view class="user">李四</view>
									<view class="text-gray">
										2020-08-20
									</view>
								</view>
								<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-bar solid-bottom text-red no-card">
					<view class="action">
						<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
						<text class="text-lg text-bold">艺术类</text>
					</view>
				</view>
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="text-cut text-xl">艺术类作品标题</view>
						</view>
						<video 
						  id="myVideo" 
						  src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" 
						  binderror="videoErrorCallback" 
						  show-center-play-btn='true'
						  controls
						></video>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info solid-bottom padding">
									<view class="user">王五</view>
									<view class="text-gray">
										2020-08-20
									</view>
								</view>
								<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-bar solid-bottom text-red no-card">
					<view class="action">
						<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
						<text class="text-lg text-bold">文学与教育类</text>
					</view>
				</view>
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="text-cut text-xl">文学与教育类作品标题</view>
						</view>
						<video 
						  id="myVideo" 
						  src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" 
						  binderror="videoErrorCallback" 
						  show-center-play-btn='true'
						  controls
						></video>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info solid-bottom padding">
									<view class="user">赵六</view>
									<view class="text-gray">
										2020-08-20
									</view>
								</view>
								<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
							</view>
						</view>
					</view>
					
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="text-cut text-xl">文学与教育类作品标题</view>
						</view>
						<view class="image"><image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597060339166&di=5080a3aa445e7810887d6e40ccf3456d&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150119%2F0006019059970869_b.jpg"></image></view>
						<view class="cu-list menu-avatar">
							<view class="cu-item cus-activity">
								<view class="activity-info solid-bottom padding">
									<view class="user">孙七</view>
									<view class="text-gray">
										2020-08-20
									</view>
								</view>
								<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view> -->
		<!-- </view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		openDocument: function() {
			wx.downloadFile({
				url: 'http://**.*****.***/reshaiwai/demo.pdf', //要预览的PDF的地址
				success: function(res) {
					console.log(res);
					if (res.statusCode === 200) {
						//成功
						var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
						wx.openDocument({
							filePath: Path, //要打开的文件路径
							success: function(res) {
								console.log('打开PDF成功');
							}
						});
					}
				},
				fail: function(res) {
					console.log(res); //失败
				}
			});
		}
	}
};
</script>

<style>
@import url('art.css');
</style>
