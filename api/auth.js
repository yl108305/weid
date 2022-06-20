import axios from '@/utils/request.js'

export function get_user_list(data){
	return axios({
		url:"/merchant/white/get_user",
		method:"get",
		data
	})
}

export function add_user(data){
	return axios({
		url:"/merchant/white/in_user",
		method:"post",
		data
	})
}

export function del_user(data){
	return axios({
		url:"/merchant/white/de_user",
		method:"post",
		data
	})
}

export function search_user(data){
	return axios({
		url:"/merchant/white/search",
		method:"get",
		data
	})
}