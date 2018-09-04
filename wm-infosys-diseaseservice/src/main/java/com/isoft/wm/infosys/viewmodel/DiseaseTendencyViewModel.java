package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SuppressWarnings("serial")
public class DiseaseTendencyViewModel implements Serializable {
    private Status status;

    public class Data implements Serializable {
        private List<List<Long>> date = new ArrayList<List<Long>>();
        private List<String> xaxis = new ArrayList<String>();
        private List<String> type = new ArrayList<String>();
        private Long small = 0L;
        private Long big = 0L;

        public List<List<Long>> getDate() {
            return date;
        }

        public void setDate(List<List<Long>> date) {
            this.date = date;
        }

        public void addDate(List<Long> dateGrp) {
            date.add(dateGrp);
        }

        public List<String> getXaxis() {
            return xaxis;
        }

        public void setXaxis(List<String> xaxis) {
            this.xaxis = xaxis;
        }

        public List<String> getType() {
            return type;
        }

        public void setType(List<String> type) {
            this.type = type;
        }

        public void addType(String typeName) {
            this.type.add(typeName);
        }

        public Long getSmall() {
            return small;
        }

        public void setSmall(Long small) {
            this.small = small;
        }

        public Long getBig() {
            return big;
        }

        public void setBig(Long big) {
            this.big = big;
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




