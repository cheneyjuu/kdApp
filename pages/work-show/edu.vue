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
						<!-- <view class="author padding-left margin-top-xs">
							<text>作者：</text>
							李四（xx 年级）
						</view> -->
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
@import url('edu.css');
</style>
