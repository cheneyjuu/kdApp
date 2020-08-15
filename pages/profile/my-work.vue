<template>
	<view>
		<cu-custom bgColor="nav-bg-color" :isBack="true"><block slot="content">我的作品</block></cu-custom>
		<view class="container">
			<view class="header"></view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="flex align-center padding-left padding-top"><view class="text-cut text-xl">我和我的祖国</view></view>
					<video
						id="myVideo"
						src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
						binderror="videoErrorCallback"
						show-center-play-btn="true"
						controls
					></video>
					<view class="cu-list menu-avatar">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<view class="user">上传日期</view>
								<view class="text-gray">2020-08-20</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red">查看详情</button></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style>
@import url('my-work.css');
</style>
