/**
 *  6XX:自定义监控
 *  7XX:疾病
 *  8XX：舆情
 */

function errorDic(code) {
    var errors = {
        '404': '未获得请求数据',
        '500': '系统异常',
        '901': '用户信息获取失败',
        '601': '疾病信息获取失败',
        '602': '实时发现记录获取失败',
        '603': '监控记录获取失败',
        '604': '新增自定义疾病组失败',
        '605': '修改自定义疾病组失败',
        '606': '删除自定义疾病组失败',
        '607': '新增自定义疾病失败',
        '608': '删除自定义疾病失败',
        '609': '该疾病组已经存在',
        '610': '该疾病已经存在',
        '611': '该疾病不存在'
    }

    return errors[code] || '发生未知错误，请稍候再重试操作'

}