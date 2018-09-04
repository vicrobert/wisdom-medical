package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;

@SuppressWarnings("serial")
public class DrugUseStrengthViewModel implements Serializable {
    private Status status;
    private Double data;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Double getData() {
        return data;
    }

    public void setData(Double data) {
        this.data = data;
    }

}




