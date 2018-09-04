package com.isoft.wm.infosys.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.entity.CityVo;
import com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo;
import com.isoft.wm.infosys.entity.DiseaseFaqVo;
import com.isoft.wm.infosys.resp.DiseaseFaqOverCityResp;
import com.isoft.wm.infosys.resp.DiseaseFaqResp;

@Service
public class HotDiseaseAnalysisServiceImpl implements HotDiseaseAnalysisService {
    @Autowired
    GeneralService generalService;

    @Autowired
    DiseaseService diseaseService;

    /* (non-Javadoc)
     * @see com.isoft.wm.infosys.service.HotDiseaseAnalysisService#getDiseaseFaqNumByDateAndCity(java.sql.Date, java.sql.Date, java.lang.Long)
     */
    @Override
    public List<DiseaseFaqVo> getDiseaseFaqNumByDateAndCity(Date from, Date to, String city) {
        List<CityVo> cityList = generalService.findCityByName(city);
        if (cityList != null && cityList.size() > 0) {
            return diseaseService.getDiseaseFaqNumByDateAndCity(from, to, cityList.get(0).getId());
        }
        return null;
    }


    @Override
    public List<DiseaseFaqVo> getDiseaseTopNRankByDateAndCity(Date from, Date to, String city, Pageable pageable) {
        List<CityVo> cityList = generalService.findCityByName(city);
        if (cityList != null && cityList.size() > 0) {
            return diseaseService.getDiseaseTopNRankByDateAndCity(from, to, cityList.get(0).getId(), pageable);
        }
        return null;
    }

    @Override
    public DiseaseFaqOverCityResp getDiseaseFaqNumOverAllCities(Date from, Date to) {
        List<DiseaseFaqOverCityVo> list = diseaseService.getDiseaseFaqNumOverAllCities(from, to);
        return new DiseaseFaqOverCityResp(10000L, list != null ? list.size() : 0, list);
    }

    @Override
    public DiseaseFaqResp descSortDiseaseFaqByDeptPopularity(Date from, Date to, String city, Pageable pageable) {
        DiseaseFaqResp diseaseFaqResp = new DiseaseFaqResp();
        List<CityVo> cityList = generalService.findCityByName(city);
        if (cityList != null && cityList.size() > 0) {
            diseaseFaqResp.setRows(diseaseService.descSortDiseaseFaqByDeptPopularity(from, to, cityList.get(0).getId(), pageable));
        }
        return diseaseFaqResp;
    }


    @Override
    public DiseaseFaqResp descSortDiseaseFaqByHospPopularity(Date from, Date to, String city, Pageable pageable) {
        DiseaseFaqResp diseaseFaqResp = new DiseaseFaqResp();
        List<CityVo> cityList = generalService.findCityByName(city);
        if (cityList != null && cityList.size() > 0) {
            diseaseFaqResp.setRows(diseaseService.descSortDiseaseFaqByHospPopularity(from, to, cityList.get(0).getId(), pageable));
        }
        return diseaseFaqResp;
    }


    @Override
    public DiseaseFaqResp descSortDiseaseFaqByDocPopularity(Date from, Date to, String city, Pageable pageable) {
        DiseaseFaqResp diseaseFaqResp = new DiseaseFaqResp();
        List<CityVo> cityList = generalService.findCityByName(city);
        if (cityList != null && cityList.size() > 0) {
            diseaseFaqResp.setRows(diseaseService.descSortDiseaseFaqByDocPopularity(from, to, cityList.get(0).getId(), pageable));
        }
        return diseaseFaqResp;
    }


}
