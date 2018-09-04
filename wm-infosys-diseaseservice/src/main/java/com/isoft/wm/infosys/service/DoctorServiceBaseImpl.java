package com.isoft.wm.infosys.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.DoctorDao;
import com.isoft.wm.infosys.entity.DoctorRecommendVo;
import com.isoft.wm.infosys.viewmodel.DoctorRecommendViewModel;

@Service
public class DoctorServiceBaseImpl implements DoctorServiceBase {

    @Autowired
    DoctorDao doctorDao;

    @Override
    public DoctorRecommendViewModel getDoctorRecommend(String community, int year, int month) {
        DoctorRecommendViewModel doctorRecommendViewModel = new DoctorRecommendViewModel();
        Pageable page = PageRequest.of(0, 8);
        List<DoctorRecommendVo> doctorRecommends;
        if (month == 0) {
            doctorRecommends = doctorDao.recommendDoctorsAccordingToYearTreat(community, year, page);
        } else {
            doctorRecommends = doctorDao.recommendDoctorsAccordingToMonthTreat(community, year, month, page);
        }
        if (doctorRecommends != null && doctorRecommends.size() > 0) {
            for (DoctorRecommendVo dr : doctorRecommends) {
                Map<String, Object> mapTreat = new HashMap<String, Object>();
                mapTreat.put("name", dr.getDoctorName());
                mapTreat.put("cate", "看病数");
                mapTreat.put("value", dr.getTreatNum());
                Map<String, Object> mapComment = new HashMap<String, Object>();
                mapComment.put("name", dr.getDoctorName());
                mapComment.put("cate", "评价数");
                mapComment.put("value", dr.getCommentNum());
                doctorRecommendViewModel.getData().addXaxis(dr.getDoctorName());
                doctorRecommendViewModel.getData().addTreatNum(mapTreat);
                doctorRecommendViewModel.getData().addTreatNum(mapComment);
            }
        }

        return doctorRecommendViewModel;
    }

}
