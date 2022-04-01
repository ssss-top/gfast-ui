import request from '@/utils/request'
// 查询用户列表
export function listSysUser(query) {
  return request({
    url: '/system/sysUser/list',
    method: 'get',
    params: query
  })
}
// 查询用户详细
export function getSysUser(id) {
  return request({
    url: '/system/sysUser/get',
    method: 'get',
    params: {
     id: id.toString()
    }
  })
}
// 新增用户
export function addSysUser(data) {
  return request({
    url: '/system/sysUser/add',
    method: 'post',
    data: data
  })
}
// 修改用户
export function updateSysUser(data) {
  return request({
    url: '/system/sysUser/edit',
    method: 'put',
    data: data
  })
}
// 删除用户
export function delSysUser(ids) {
  return request({
    url: '/system/sysUser/delete',
    method: 'delete',
    data:{
       ids:ids
    }
  })
}
// 用户用户状态;0:禁用,1:正常,2:未验证修改
export function changeSysUserUserStatus(id,userStatus) {
  const data = {
    id,
    userStatus
  }
  return request({
    url: '/system/sysUser/changeUserStatus',
    method: 'put',
    data:data
  })
}
