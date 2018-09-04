package com.isoft.wm.infosys.dto;

public class SampleNumDto {
    private Long docNum;
    private Long drugNum;

    public SampleNumDto(Long docNum, Long drugNum) {
        this.docNum = docNum;
        this.drugNum = drugNum;
    }

    public Long getDocNum() {
        return docNum;
    }

    public void setDocNum(Long docNum) {
        this.docNum = docNum;
    }

    public Long getDrugNum() {
        return drugNum;
    }

    public void setDrugNum(Long drugNum) {
        this.drugNum = drugNum;
    }

}
