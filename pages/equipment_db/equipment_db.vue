<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">设备名</view>
			<input placeholder="点击右侧扫描二维码获取设备号" v-model="send.SN"></input>
			<text class='cuIcon-qrcode text-orange' @click="scanCode()"></text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注</view>
			<textarea maxlength="-1" :disabled="modalName!=null" v-model="send.con"
				placeholder="请输入设备备注"></textarea>
		</view>
		<!-- <button class="in cu-btn round lg bg-orange shadow" @click="senddata()" v-if="id">确认修改</button>
		<button class="in cu-btn round lg bg-orange shadow" @click="senddata()" v-else>确认插入</button>
		<button class="de cu-btn round lg bg-red shadow" @click="de()" v-if="id">确认删除</button> -->
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				id: "",
				send: {
					SN: "",
					con:""
				}
			}
		},
		methods: {
			getid() {
				uni.request({
					url: that.$api_url + "merchant/equipment/getid",
					data: {
						id: that.id
					},
					success(res) {
						that.send = res.data.data
						console.log(res.data.data)
					}
				})
			},
			scanCode() {
				uni.showLoading({
					title:"读取中ing"
				})
				uni.scanCode({
					scanType:"qrcode",
					success(res) {
						uni.hideLoading()
						that.send.SN=res.result
						console.log(res)
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			check() {
				for (let key in that.send) {
					if (that.send[key] == "") {
						return false
					}
				}
			},
			de() {
				uni.showModal({
					title: "是否确认删除?",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: that.$api_url + "merchant/equipment/de",
								data: {
									id: that.id
								},
								method: "post",
								header: {
									'custom-header': 'hello'
								},
								success(res) {
									if (res.data.msg == "success") {
										uni.showModal({
											title: "删除成功",
											success() {
												uni.navigateBack({
													
												})
											}
										})
									} else {
										uni.showModal({
											title: "删除失败，请稍后重试"
										})
									}
									console.log(res)
								}
							})
						}
					}
				})
			},
			senddata() {
				var a = that.check()
				if (a == false) {
					return uni.showModal({
						title: "有未填项,请检查后重新提交"
					})
				}
				if (that.id) {
					uni.request({
						url: that.$api_url + "merchant/equipment/up",
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
				} else {
					uni.request({
						url: that.$api_url + "merchant/equipment/in",
						data: that.send,
						method: "post",
						header: {
							'custom-header': 'hello'
						},
						success: (res) => {
							if (res.data.msg == "success") {
								uni.showModal({
									title: "插入成功",
									success() {
										uni.navigateBack({

										})
									}
								})
							}
							 else {
								if(res.data.msg=="error")
								{
									uni.showModal({
										title: "插入失败，请稍后重试",
										success() {}
									})
								}
								else{
									uni.showModal({
										title: res.data.msg,
										success() {}
									})
								}
							}
						}
					});
				}

			}
		},
		onLoad(e) {
			that = this;
			if (e.id) {
				that.id = e.id
				that.getid()
			}
			uni.getStorage({
				key: "openid",
				success: function(res) {
					that.send.openid = res.data
					uni.getStorage({
						key: "user",
						success: function(res) {
							that.send.user = res.data
						}
					})
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
