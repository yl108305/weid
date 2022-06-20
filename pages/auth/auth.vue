<template>
	<view class="auth_content">
		<u-navbar title="授权中心" :autoBack="true" placeholder=""></u-navbar>
		<view class="main">
			<view style="padding: 0 10px;">
				<view style="display: flex;justify-content: center;align-items: center;">
					<u--input placeholder="用户手机号" v-model="tel" clearable></u--input>
					<view style="width: 80px;margin-left: 10px;">
						<u-button type='primary' @click="search_user_f" color='#ff1e0f'>搜索</u-button>
					</view>
				</view>
				<!-- <u-search placeholder="搜索用户" v-model="search_val" shape="square" :showAction='false' @search='search'></u-search> -->
			</view>
			<view class="card_list">
				<view class="card" v-for="i in list">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="card_header">
							<u-avatar :src="i.avatarUrl" size='60'></u-avatar>
							<view class="user_info">
								<text>{{i.nickName}}</text>
								<text style="color: #ccc;font-size: 14px;margin-top: 6px;">{{i.gender==='0'?'男':'女'}}</text>
							</view>
						</view>
						<text style="color: red;white-space: nowrap;font-size: 16px;" @click="del_user(i)">删除</text>
					</view>
					<text style="font-size: 16px;">注册日期: {{i.logindate}}</text>
				</view>
				<u-loadmore :status="status" @loadmore='loadmore()' bgColor='#fff' />
			</view>
			<u-modal :show="search_sow" showCancelButton cancelText='取消' confirmText='添加' @cancel='search_sow=false' @confirm='add_user'>
				<view class="search_content">
					<u-avatar :src="search_user_info.avatarUrl" size='60'></u-avatar>
					<text style="margin-top: 4px;">{{search_user_info.nickName}}</text>
					<text style="color: #ccc;font-size: 14px;margin-top: 2px;">{{search_user_info.gender==='0'?'男':'女'}}</text>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import { get_user_list,add_user,del_user,search_user } from '@/api/auth.js'
	
	export default {
		data() {
			return {
				tel:'',
				src:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLnASOBososZLuLpCZQlQpSUUtUpspleBSgb9U6ibiaAcO751d8ibwGIZTBgVjDYVJicLtL4l4q16YP0g/132',
				pages:1,
				list:[],
				status:'loadmore',
				search_sow:false,
				search_user_info:{
					nickName:'',
					gender:''
				}
			}
		},
		created() {
			this.get_list()
		},
		onReachBottom(){
			this.loadmore()
		},
		methods: {
			async search_user_f(){
				let {data} = await search_user({tel:this.tel})
				if(data.data===null){
					this.$api.msg('未找到该用户')
					return
				}
				this.search_user_info = data.data
				this.search_sow = true
			},
			async del_user({id}){
				
				uni.showModal({
					title: '提示',
					content: '是否确认移除该用户',
					success:async (res)=>{
						if (res.confirm) {
							let {data} = await del_user({id})
							if(data.msg==='success'){
								this.$api.msg('移除成功')
							}else{
								this.$api.msg(data.msg)
							}
							this.list=[]
							this.pages = 1
							this.get_list()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			loadmore(){
				this.pages += 1
				this.get_list()
			},
			async get_list(){
				this.status = 'loading'
				let {data:user} = await this.get_user_info()
				let {data} = await get_user_list({
					page:this.pages,
					limit:10,
					user
				})
				data.data.length!==0?this.status='loadmore':this.status='nomore'
				console.log(data);
				this.list = [...this.list,...data.data]
			},
			search(val){
				this.name = val
				this.get_list()
			},
			async add_user(){
				let {data:user} = await this.get_user_info()
				if(user===false){
					uni.showToast({
						title:'账号错误',
						icon:'none'
					})
					return
				}
				let {data} = await add_user({
					user,
					tel:this.search_user_info.tel
				})
				if(data.msg==='success'){
					this.$api.msg('添加成功')
				}else{
					this.$api.msg(data.msg)
				}
				this.search_sow = false
				this.list=[]
				this.pages = 1
				this.get_list()
				console.log(data);
			},
			get_user_info(){
				return new Promise(rel=>{
					uni.getStorage({
						key:'user',
						success(res) {
							rel(res)
							return
						},
						fail() {
							rel(false)
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.search_content{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.user_info{
		font-size: 18px;
		margin-left: 10px;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		flex-direction: column;
	}
	.card_header{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 10px;
	}
	.card_list{
		margin-top: 20px;
		width: 100%;
		background-color: #f7f7f7;
	}
	.card{
		padding: 10px 10px;
		width: 100%;
		background-color: white;
		margin-bottom: 10px;
	}
	.auth_content{
		width: 100%;
		height: 100%;
		background-color: white;
	}
	.main{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
	}
</style>
