package com.isoft.wm.infosys.viewmodel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeptL2ContrastBarViewModel {
    private Map<String, List<Long>> maplist = new HashMap<String, List<Long>>();
    private List<String> categoryList = new ArrayList<String>();

    public Map<String, List<Long>> getMaplist() {
        return maplist;
    }

    public void setMaplist(Map<String, List<Long>> maplist) {
        this.maplist = maplist;
    }

    public List<String> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<String> categoryList) {
        this.categoryList = categoryList;
    }

    public void addCategoryList(String cateName) {
        categoryList.add(cateName);
    }

    public void putMapList(String mapKey, Long value) {
        if (mapKey != null && !"".equals(mapKey) && value != null) {
            List<Long> l = maplist.get(mapKey);
            if (l == null) {
                l = new ArrayList<Long>();
                maplist.put(mapKey, l);
            }
            l.add(value);
        }
    }

}
