package com.isoft.wm.infosys.dao;

import com.isoft.wm.infosys.entity.DoctorSampleStatisticVo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class DoctorSampleStatisticDaoImpl implements DoctorSampleStatisticDaoExt {
    @PersistenceContext
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<DoctorSampleStatisticVo> listSampleNumOfOneMinTop10(Long timeStamp) {
        String sql = "(select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 540000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 540000) and ds.time_stamp > (" + timeStamp + " - 600000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 480000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 480000) and ds.time_stamp > (" + timeStamp + " - 540000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 420000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 420000) and ds.time_stamp > (" + timeStamp + " - 480000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 360000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 360000) and ds.time_stamp > (" + timeStamp + " - 420000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 300000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 300000) and ds.time_stamp > (" + timeStamp + " - 360000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 240000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 240000) and ds.time_stamp > (" + timeStamp + " - 300000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 180000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 180000) and ds.time_stamp > (" + timeStamp + " - 240000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 120000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 120000) and ds.time_stamp > (" + timeStamp + " - 180000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 60000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 60000) and ds.time_stamp > (" + timeStamp + " - 120000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " time_stamp from doctor_statistic ds where ds.time_stamp <= " + timeStamp + " and ds.time_stamp > (" + timeStamp + " - 60000) group by ds.time_stamp)";
        Query query = em.createNativeQuery(sql, DoctorSampleStatisticVo.class);
        return query.getResultList();
    }


    @SuppressWarnings("unchecked")
    public List<DoctorSampleStatisticVo> listSampleNumOfOneDayTop10(Long timeStamp) {
        String sql = "(select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 777600000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 777600000) and ds.time_stamp > (" + timeStamp + " - 864000000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 691200000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 691200000) and ds.time_stamp > (" + timeStamp + " - 777600000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 604800000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 604800000) and ds.time_stamp > (" + timeStamp + " - 691200000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 518400000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 518400000) and ds.time_stamp > (" + timeStamp + " - 604800000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 432000000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 432000000) and ds.time_stamp > (" + timeStamp + " - 518400000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 345600000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 345600000) and ds.time_stamp > (" + timeStamp + " - 432000000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 259200000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 259200000) and ds.time_stamp > (" + timeStamp + " - 345600000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 172800000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 172800000) and ds.time_stamp > (" + timeStamp + " - 259200000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " - 86400000 time_stamp from doctor_statistic ds where ds.time_stamp <= (" + timeStamp + " - 86400000) and ds.time_stamp > (" + timeStamp + " - 172800000) group by ds.time_stamp)" +
                " union (select 1 id, 1 template_id, sum(ds.sample_num) sample_num, " + timeStamp + " time_stamp from doctor_statistic ds where ds.time_stamp <= " + timeStamp + " and ds.time_stamp > (" + timeStamp + " - 86400000) group by ds.time_stamp)";
        Query query = em.createNativeQuery(sql, DoctorSampleStatisticVo.class);
        return query.getResultList();
    }

}
