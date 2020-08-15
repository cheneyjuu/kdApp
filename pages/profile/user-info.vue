<template>
	<view>
		<cu-custom bgColor="bg-dark-blue" :isBack="true"><block slot="content">完善个人信息</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<view class="cu-form-group">
				<view class="title required">姓名</view>
				<input placeholder="学生姓名" name="input" @input="userNameInput"></input>
			</view>
			<view class="cu-form-group">
				<view class="title required">年级</view>
				<input placeholder="所在年级" name="input" @input="gradeInput"></input>
			</view>
			<view class="cu-form-group">
				<view class="title required">联系方式</view>
				<input placeholder="联系方式" name="input" @input="phoneNumberInput"></input>
			</view>
			<view class="cu-form-group">
				<view class="title required">电子邮箱</view>
				<input placeholder="电子邮箱" name="input" @input="emailInput"></input>
			</view>
			<view class="solid">
				
			</view>
			<view class="btn-container bg-white flex justify-center margin-top padding">
				<button class="cu-btn bg-gradual-red" @click="updateUserInfo">确定更新</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payload: {}
			};
		},
		methods: {
			userNameInput: function(e) {
				this.payload.userName = e.detail.value;
			},
			gradeInput: function(e) {
				this.payload.grade = e.detail.value;
			},
			phoneNumberInput: function(e) {
				const phoneNumber = e.detail.value;
				this.payload.phoneNumber = phoneNumber;
			},
			emailInput: function(e) {
				this.payload.email = e.detail.value;
			},
			updateUserInfo: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	};
</script>

<style>
</style>
