package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public class DiseaseContrastAnalysisViewModel implements Serializable {
    private Status status;

    public class Data implements Serializable {

        private List<Object> date = new ArrayList<Object>();
        private List<String> xaxis = new ArrayList<String>();
        private List<String> type = new ArrayList<String>();


        public List<Object> getDate() {
            return date;
        }

        public void setDate(List<Object> date) {
            this.date = date;
        }

        public void addDateList(List<?> dateGrp) {
            date.add(dateGrp);
        }

        public List<String> getXaxis() {
            return xaxis;
        }

        public void setXaxis(List<String> xaxis) {
            this.xaxis = xaxis;
        }

        public void addXaxis(String ele) {
            this.xaxis.add(ele);
        }

        public List<String> getType() {
            return type;
        }

        public void setType(List<String> type) {
            this.type = type;
        }

        public void addType(String ele) {
            this.type.add(ele);
        }

    }

    private Data data = new Data();

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




