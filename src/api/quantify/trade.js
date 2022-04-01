import request from '@/utils/request'

// 查询支持的机器人策略
export function getTaskDefineList(query) {
  return request({
    url: '/quantify/define/list',
    method: 'get',
    params: query
  })
}


// 查询策略的详细内容
export function getTaskDefineDetails(query) {
    return request({
      url: '/quantify/define/details',
      method: 'get',
      params: query
    })
  }