import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    verifyCode:code,
    verifyKey:uuid
  }
  return request({
    url: '/system/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/system/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captcha/get',
    method: 'get'
  })
}


// 鉴权
export function loginForOauth(data) {
  return request({
    url: '/system/login',
    method: 'post',
    data: data
  })
}