package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public class DiseaseOccupationDistributeViewModel implements Serializable {
    private Status status;

    public class Data implements Serializable {
        private List<String> xaxis = new ArrayList<String>();
        private List<Map<String, Object>> date = new ArrayList<Map<String, Object>>();

        public List<String> getXaxis() {
            return xaxis;
        }

        public void setXaxis(List<String> xaxis) {
            this.xaxis = xaxis;
        }

        public void addXaxis(String ele) {
            this.xaxis.add(ele);
        }

        public List<Map<String, Object>> getDate() {
            return date;
        }

        public void setDate(List<Map<String, Object>> date) {
            this.date = date;
        }

        public void addDate(Map<String, Object> map) {
            this.date.add(map);
        }
    }

    private Data data;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }


}
