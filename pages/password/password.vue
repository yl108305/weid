<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">新密码</view>
			<input placeholder="请输入新密码" v-model="send.password"></input>
		</view>
		<button class="in cu-btn round lg bg-orange shadow" @click="senddata()">确认修改</button>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				send: {
					password: "",
					user:""
				}
			}
		},
		methods: {
			senddata() {
				if (that.send.password=="") {
					return uni.showModal({
						title: "有未填项,请检查后重新提交"
					})
				}
				uni.request({
					url: that.$api_url + "merchant/user/up",
					data: that.send,
					method: "post",
					header: {
						'custom-header': 'hello'
					},
					success: (res) => {
						if (res.data.msg == "success") {
							uni.showModal({
								title: "修改成功",
								success() {
									uni.navigateBack({

									})
								}
							})
						} else {
							uni.showModal({
								title: "修改失败，请稍后重试",
								success() {}
							})
						}
					}
				});

			}
		},
		onLoad(e) {
			that = this
			uni.getStorage({
				key: "user",
				success: function(res) {
					that.send.user = res.data
				}
			})
		}

	}
</script>

<style>
	.in {
		position: fixed;
		bottom: 100rpx;
		right: 100rpx;
	}

	.de {
		position: fixed;
		bottom: 100rpx;
		left: 100rpx;
	}
</style>
