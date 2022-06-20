<template>
	<view class="top">
		<block v-for="(item,index) in list" :key="index">
			<view class="box" @click="go(item.SN)" :class="item.statue==1?'bg-green':'bg-grey'">
				<view class="box_name">{{item.SN}}&nbsp;&nbsp;设备收益:{{item.rmb}}</view>
				<view class="box_introduction">{{item.con}}</view>
				<view class="box_date">{{item.date}}</view>
				<view style="margin-left: 10rpx;display: flex;flex-direction: row;align-items: center;" v-if="item.statue==1">
					<text class="cuIcon-roundcheck" style="font-size: 60rpx;"></text>
					设备在线
				</view>
				<view style="margin-left: 10rpx;display: flex;flex-direction: row;align-items: center;" v-else>
					<text class="cuIcon-roundclose" style="font-size: 60rpx;"></text>
					设备离线
				</view>
			</view>
		</block>
		<!-- <view class="add_box">
			<text class='add cuIcon-add text-red' @click="gourl()"></text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: "",
				list: []
			}
		},
		onLoad() {
			const that = this;
			uni.getStorage({
				key: "openid",
				success: function(res) {
					that.openid = res.data
					uni.getStorage({
						key: "user",
						success: function(res) {
							that.user = res.data
							that.get()
						}
					})
				}
			})
		},
		onShow() {
			this.get()
		},
		onPullDownRefresh() {
			this.get()
		},
		methods: {
			gourl(){
				uni.navigateTo({
					url:"../equipment_db/equipment_db"
				})
			},
			go(e) {
				uni.navigateTo({
					url: "../equipment_db/equipment_db?id=" + e
				})
			},
			get() {
				const that = this;
				uni.request({
					url: that.$api_url + "merchant/equipment/get",
					data: {
						openid: that.openid,
						user:that.user
					},
					success(res) {
						that.list = res.data.data
						uni.stopPullDownRefresh()
					}
				})
			}
		}
	}
</script>

<style>
	.top {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 30rpx;
	}

	.box {
		width: 95%;
		height: 250rpx;
		/* background: #FFFFFF; */
		margin-top: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.box_name {
		font-weight: bold;
		font-size: 30rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.box_introduction {
		margin-left: 20rpx;
		width: 600rpx;
		height: 120rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; */
		display: -webkit-box;
		/* 弹性盒模型 */
		-webkit-box-orient: vertical;
		/* 元素垂直居中*/
		-webkit-line-clamp: 3;
		/*  文字显示的行数*/
		overflow: hidden;
		/* 超出隐藏 */
	}

	.box_date {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
	}

	.add_box {
		position: fixed;
		right: 60rpx;
		bottom: 50rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.add {
		font-size: 100rpx;

	}
</style>
