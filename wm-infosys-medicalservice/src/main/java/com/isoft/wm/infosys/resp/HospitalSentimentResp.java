package com.isoft.wm.infosys.resp;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.HospSentimentVo;

public class HospitalSentimentResp {
    private List<HospSentimentVo> newsList;


    public HospitalSentimentResp() {

    }

    public HospitalSentimentResp(List<HospSentimentVo> newsList) {
        this.newsList = newsList;
    }

    public List<HospSentimentVo> getNewsList() {
        return newsList;
    }

    public void setNewsList(List<HospSentimentVo> newsList) {
        this.newsList = newsList;
    }


}
