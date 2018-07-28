function ajaxDataController() {

    function dataHandle(url, params, callback, async, method) {

        if (!method) {
            throw 'method 参数未设置'
        }

        if (_.isFunction(params)) {

            callback = params
            params = null
        }

        params = params || {}
        async = async || true

        $.ajax({
            async: async,
            url: url,
            dataType: 'json',
            //data: params,
            type: method,
            complete: function(xhr) {

                try {
                    var result = JSON.parse(xhr.responseText),
                        DOM_ID = 'promptDialog',
                        code = parseInt(result.status.code),
                        message = result.status.message,
                        prompt = {
                            'id': DOM_ID,
                            'title': '操作结果',
                            'message': errorDic(code)
                        }
                } catch (err) {

                    prompt = {
                        'id': DOM_ID,
                        'title': '操作结果',
                        'message': '数据请求异常，请稍候重试'
                    }

                    message = err.message
                }


                if (code !== 200) {

                    $.get($.getWebRootPath('scripts/modal.tmpl'), function(tmpl) {

                        $('#' + DOM_ID).remove()
                        $('body').append($.tmpl(tmpl, prompt))
                        $('#' + DOM_ID).modal('show')
                    });

                    console.log('错误码：' + code + '\n异常信息：' + message);
                    return
                }

                callback(result.data)
            }
        })
    }

    // TODO: 需要添加请求未成功的验证

    return {
        'insert': function(url, params, callback, async) {

            dataHandle(url, params, callback, async, 'post')
        },
        'update': function(url, params, callback, async) {

            dataHandle(url, params, callback, async, 'put')
        },
        'delete': function(url, params, callback, async) {

            dataHandle(url, params, callback, async, 'delete')
        },
        'select': function(url, params, callback, async) {

            dataHandle(url, params, callback, async, 'get')
        }
    };
}