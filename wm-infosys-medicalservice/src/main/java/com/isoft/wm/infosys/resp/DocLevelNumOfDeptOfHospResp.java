package com.isoft.wm.infosys.resp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DocLevelNumOfDeptOfHospResp {
    //各科室的各职称人数数组
    private Map<String, List<Long>> dimBarList;
    //科室名集合
    private List<String> deptSet;

    public DocLevelNumOfDeptOfHospResp() {
    }

    public DocLevelNumOfDeptOfHospResp(Map<String, List<Long>> dimBarList, List<String> deptSet) {
        this.dimBarList = dimBarList;
        this.deptSet = deptSet;
    }

    public Map<String, List<Long>> getDimBarList() {
        return dimBarList;
    }

    public void setDimBarList(Map<String, List<Long>> dimBarList) {
        this.dimBarList = dimBarList;
    }

    public List<String> getDeptSet() {
        return deptSet;
    }

    public void setDeptSet(List<String> deptSet) {
        this.deptSet = deptSet;
    }


}
