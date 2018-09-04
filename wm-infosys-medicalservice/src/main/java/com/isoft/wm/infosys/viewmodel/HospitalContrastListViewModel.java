package com.isoft.wm.infosys.viewmodel;

public class HospitalContrastListViewModel {
    private String ayBn;
    private String byAn;

    public HospitalContrastListViewModel() {
    }

    public HospitalContrastListViewModel(String ayBn, String byAn) {
        this.ayBn = trim(ayBn);
        this.byAn = trim(byAn);
    }

    public String trim(String str) {
        if (str.charAt(0) == '[' && str.charAt(str.length() - 1) == ']') {
            return str.substring(1, str.length() - 1);
        } else {
            return str;
        }
    }

    public String getAyBn() {
        return ayBn;
    }

    public void setAyBn(String ayBn) {
        this.ayBn = trim(ayBn);
    }

    public String getByAn() {
        return byAn;
    }

    public void setByAn(String byAn) {
        this.byAn = trim(byAn);
    }

}
