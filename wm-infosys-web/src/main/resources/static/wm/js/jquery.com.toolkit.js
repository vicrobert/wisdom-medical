(function($) {

    /**
     * 获取 url 参数
     * @param {String} [name] 需要获取的参数名
     * @param {String} [url=location.href] 需要解析的 url
     * @return {String} 参数名对应的参数值,如果没有对应的参数值则返回 null
     */
    $.getUrlParam = function(name, url) {
        url = url ? url : window.location;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.search.substr(1).match(reg);
        return (r === null || r.length < 2) ? null : r[2];

    }

    /**
     * 获取带有随机数的参数的 url
     * @param {String} [url] 原始 url
     * @return {String} 返回加上随机参数后的 url
     */
    $.getRadParamUrl = function(url) {
        return url + (url.indexOf('?') == -1 ? "?" : "&") + "t=" + new Date().getTime();
    }

    /**
     * 缩短（省略中间部分）字符串
     * @param {String} [strValue] 需要被缩短的字符串
     * @param {String} [targetLength] 缩短后的字符串总长度
     * @param {String} [placeholder='...'] 用于替换被省略的部分的字符串
     * @return {String} 返回被省略缩写的字符串
     */
    $.shortStr = function(strValue, targetLength, placeholder) {

        if (!(strValue && targetLength && placeholder)) {
            return strValue;
        }

        placeholder = placeholder ? placeholder : '...';

        var gap = strValue.length - targetLength;
        if (placeholder > targetLength || gap < 1) {
            return strValue;
        }

        var subLength = (targetLength - placeholder.length) / 2;
        var result = strValue.substr(0, subLength);
        result += placeholder;
        result += strValue.substr(strValue.length - subLength, subLength);
        return result;

    };

    /**
     * 获取中文大小写数字
     * @param {Number} [numberValue] 需要被转换的数字
     * @param {String} [type='small'] small：中文小写（〇...九） big：中文大写（零...玖）
     * @return {String} 返回中文数字,如果在字符串中出现非数字字符则默认返回原值
     */
    $.convertNumberToChinese = function(numberValue, type) {

        var i = null,
            result = '',
            letterStr = null,
            tmpValue = null;

        letterStr = (type === 'big') ? '零壹贰叁肆伍陆柒捌玖' : '〇一二三四五六七八九十';
        numberValue = numberValue.toString();

        for (i = 0; i < numberValue.length; i++) {

            tmpValue = parseInt(numberValue.charAt(i));
            if (!tmpValue) {
                result += numberValue.charAt(i);
                continue;
            }

            result += letterStr.charAt(tmpValue);
        }

        return result;
    };

    /**
     * 将数字1、2、3...24、25、26对应转换成 A、B、C...R、S、T
     * @param {Number} [numberValue] 需要被转换的数字
     * @return {String} 返回英文字母
     */
    $.convertNumberToLetter = function(numberValue) {

        numberValue = parseInt(numberValue);

        if (!numberValue || (numberValue < 1 || numberValue > 26)) {

            // throw Error({ "name": "数字转换字母错误", "message": "请确保参数 [numberValue] 只输入 1-26 范围的数字。" });

        }

        return String.fromCharCode((numberValue + 64));
    }

    /**
     * 获取根路径
     * （仅仅用于 java web 工程下的某些特定情况，并不具有大范围的普遍适用性。
     *  如果这个工具集插件被用于新的项目，又不知道这个方法用来做什么，敬请干掉这个方法，不要使用）
     * @param {String} url 用于和根路径拼接成完整的路径，这是一个可选参数 (url 前不用加 "/")
     * @return {String} 返回当前 web 应用根路径，如果有传入 url 参数，则返回一个拼接完整的路径
     */
    $.getWebRootPath = function(url) {

        var webroot = document.location.href;
        webroot = webroot.substring(webroot.indexOf('//') + 2, webroot.length);
        webroot = webroot.substring(webroot.indexOf('/') + 1, webroot.length);
        webroot = webroot.substring(0, webroot.indexOf('/'));

        if (url.indexOf(webroot) > 0) {
            return url;
        }
        var rootpath = "/" + webroot;
        return url ? (rootpath + '/' + url) : rootpath;
    };

})(jQuery);