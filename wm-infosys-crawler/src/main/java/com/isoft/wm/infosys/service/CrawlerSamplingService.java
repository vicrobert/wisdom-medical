package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.dto.CrawlerSampleNumTendencyDto;
import com.isoft.wm.infosys.dto.DoctorRtDto;
import com.isoft.wm.infosys.dto.DrugInfoRtDto;
import com.isoft.wm.infosys.dto.InteractInfoRtDto;
import com.isoft.wm.infosys.dto.SampleNumDto;
import com.isoft.wm.infosys.dto.SampleStrengthDto;

public interface CrawlerSamplingService {
    DoctorRtDto listDoctorsRt(Pageable page);

    DrugInfoRtDto listDrugInfoRt(Pageable page);

    InteractInfoRtDto listInteractRt(Pageable page);

    CrawlerSampleNumTendencyDto getSampleTendencyGroupByMin();

    CrawlerSampleNumTendencyDto getSampleTendencyGroupByDay();

    SampleStrengthDto getSampleStrength();

    SampleNumDto getSampleTotalNum();
}
