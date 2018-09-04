package com.isoft.wm.infosys.dto;

public class Status {
    private final String STATUS_DEFAULT_CODE = "200";
    private final String STATUS_DEFAULT_MSG = "数据获取成功";
    private String code = STATUS_DEFAULT_CODE;
    private String message = STATUS_DEFAULT_MSG;

    public Status() {

    }

    public Status(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}