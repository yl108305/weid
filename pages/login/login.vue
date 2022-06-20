<template>
	<view class="content">
		<image src="../../static/back.jpg" mode="heightFix"></image>
		<view class="back">
			<input type="number" v-model="user" placeholder-style="color:#ffffff" placeholder="请输入分配账号" />
			<input type="password" v-model="password" placeholder-style="color:#ffffff" placeholder="请输入密码" />
			<view class="sub" @click="sub">点击登陆</view>
		</view>
	</view>
</template>

<script>
	let that
	export default {
		data() {
			return {
				user: "181018",
				password: "181018"
			}
		},
		onLoad() {
			
			that = this;
			uni.getStorage({
				key: "user",
				success: function(res) {
					that.user = res.data
				}
			})
			uni.getStorage({
				key: "password",
				success: function(res) {
					that.password = res.data
				}
			})
		},
		methods: {
			sub() {
				uni.showLoading({
					title: "登录ing"
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						uni.request({
							url: that.$api_url + "merchant/openid",
							data: {
								code: loginRes.code
							},
							success(res) {
								uni.setStorage({
									key: "openid",
									data: res.data.data.openid
								})
								if (res.data.msg == "success") {
									uni.request({
										url: that.$api_url + "merchant/login",
										data: {
											openid: res.data.data.openid,
											user: that.user,
											password: that.password
										},
										method: "post",
										header: {
											'custom-header': 'hello' //自定义请求头信息
										},
										success(res) {
											console.log(res.data.msg)
											uni.hideLoading()
											if (res.data.msg == "登陆成功") {
												uni.navigateTo({
													url: "../home/index"
												})
												uni.setStorage({
													key: "user",
													data: that.user
												})
												uni.setStorage({
													key: "password",
													data: that.password
												})
											} else {
												uni.showModal({
													title: res.data.msg
												})
											}
										}
									})
								}

							}
						})
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		position: relative;
		height: 100vh;
		overflow: hidden;
	}

	.content image {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
	}

	.back {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 70rpx;
		left: 0;
	}

	.sub {
		width: 200rpx;
		height: 70rpx;
		background: #0f83da;
		z-index: 9999;
		color: #FFFFFF;
		text-align: center;
		line-height: 70rpx;
		border-radius: 10rpx;
	}
</style>
