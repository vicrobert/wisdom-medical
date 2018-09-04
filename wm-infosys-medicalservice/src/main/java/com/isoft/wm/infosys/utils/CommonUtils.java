package com.isoft.wm.infosys.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

public class CommonUtils {
    /**
     * Decode Url
     *
     * @return plaintext
     * @author 杨钧博
     */
    public static String URLDecode(String enStr) {
        try {
            if (enStr == null) {
                return null;
            }
            if ("".equals(enStr)) {
                return "";
            }
            return URLDecoder.decode(enStr, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return enStr;
    }
}
