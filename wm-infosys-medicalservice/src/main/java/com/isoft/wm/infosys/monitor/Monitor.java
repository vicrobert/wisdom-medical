package com.isoft.wm.infosys.monitor;

public class Monitor implements Runnable {
    private long period = 60;

    public long getPeriod() {
        return period;
    }

    public void setPeriod(long period) {
        this.period = period;
    }

    @Override
    public void run() {
        /**
         * TODO:系统状态监控
         */
        //...
    }
}
