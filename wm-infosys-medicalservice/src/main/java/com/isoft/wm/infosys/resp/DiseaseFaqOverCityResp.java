package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo;

public class DiseaseFaqOverCityResp {
    private Long big;
    private int size;
    private List<DiseaseFaqOverCityVo> list;

    public DiseaseFaqOverCityResp(Long big, int size, List<DiseaseFaqOverCityVo> list) {
        super();
        this.big = big;
        this.size = size;
        this.list = list;
    }

    public Long getBig() {
        return big;
    }

    public void setBig(Long big) {
        this.big = big;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<DiseaseFaqOverCityVo> getList() {
        return list;
    }

    public void setList(List<DiseaseFaqOverCityVo> list) {
        this.list = list;
    }

}
