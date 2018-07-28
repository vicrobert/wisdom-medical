package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.viewmodel.DoctorRecommendViewModel;

public interface DoctorServiceBase {
	//疾病疗效分析
	DoctorRecommendViewModel getDoctorRecommend(String community, int year, int month);
}
