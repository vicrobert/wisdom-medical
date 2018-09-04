package com.isoft.wm.infosys.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.PharmacyStatisticsDao;
import com.isoft.wm.infosys.entity.DrugUsedDistributeVo;
import com.isoft.wm.infosys.viewmodel.DrugPercentDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugSourceDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugTypeDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugUseStrengthViewModel;

@Service
public class DrugServiceBaseImpl implements DrugServiceBase {
    @Autowired
    PharmacyStatisticsDao pharmacyStatisticsDao;

    @Override
    public DrugUseStrengthViewModel getDrugUseStrength(String community, int year, int month) {
        DrugUseStrengthViewModel drugUseStrengthViewModel = new DrugUseStrengthViewModel();
        Integer useStrength;
        if (month == 0) {
            useStrength = pharmacyStatisticsDao.antibioticUseStrengthAYear(community, year);
        } else {
            useStrength = pharmacyStatisticsDao.antibioticUseStrengthAMonth(community, year, month);
        }
        drugUseStrengthViewModel.setData(useStrength == null ? 0.0 : useStrength.doubleValue());
        return drugUseStrengthViewModel;
    }

    @Override
    public DrugSourceDistributeViewModel getDrugSourceDistribute(String community, int year, int month) {
        DrugSourceDistributeViewModel drugSourceDistributeViewModel = new DrugSourceDistributeViewModel();
        List<DrugUsedDistributeVo> sourceDistributeList;
        if (month == 0) {
            sourceDistributeList = pharmacyStatisticsDao.drugUsedSourceDistributeAYear(community, year);
        } else {
            sourceDistributeList = pharmacyStatisticsDao.drugUsedSourceDistributeAMonth(community, year, month);
        }
        if (sourceDistributeList != null && sourceDistributeList.size() > 0) {
            for (DrugUsedDistributeVo sourceDist : sourceDistributeList) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("name", sourceDist.getMarkedName());
                map.put("value", sourceDist.getSaleNum());
                drugSourceDistributeViewModel.getData().addXaxis(sourceDist.getMarkedName());
                drugSourceDistributeViewModel.getData().addDate(map);
            }
        }
        return drugSourceDistributeViewModel;
    }

    @Override
    public DrugTypeDistributeViewModel getDrugTypeDistribute(String community, int year, int month) {
        DrugTypeDistributeViewModel drugTypeDistributeViewModel = new DrugTypeDistributeViewModel();
        List<DrugUsedDistributeVo> typeDistributeList;
        if (month == 0) {
            typeDistributeList = pharmacyStatisticsDao.drugUsedClassDistributeAYear(community, year);
        } else {
            typeDistributeList = pharmacyStatisticsDao.drugUsedClassDistributeAMonth(community, year, month);
        }
        if (typeDistributeList != null && typeDistributeList.size() > 0) {
            for (DrugUsedDistributeVo typeDist : typeDistributeList) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("name", typeDist.getMarkedName());
                map.put("value", typeDist.getSaleNum());
                drugTypeDistributeViewModel.getData().addXaxis(typeDist.getMarkedName());
                drugTypeDistributeViewModel.getData().addDate(map);
            }
        }
        return drugTypeDistributeViewModel;
    }

    @Override
    public DrugPercentDistributeViewModel getDrugPercentDistribute(String community, int year, int month) {
        DrugPercentDistributeViewModel drugPercentDistributeViewModel = new DrugPercentDistributeViewModel();
        Integer useStrength;
        if (month == 0) {
            useStrength = pharmacyStatisticsDao.antibioticUseStrengthAYear(community, year);
        } else {
            useStrength = pharmacyStatisticsDao.antibioticUseStrengthAMonth(community, year, month);
        }
        if (useStrength != null && useStrength > 0) {
            List<DrugUsedDistributeVo> antibioticDistributeList;
            if (month == 0) {
                antibioticDistributeList = pharmacyStatisticsDao.drugUsedTypeDistributeAYear(community, year);
            } else {
                antibioticDistributeList = pharmacyStatisticsDao.drugUsedTypeDistributeAMonth(community, year, month);
            }
            if (antibioticDistributeList != null && antibioticDistributeList.size() > 0) {
                for (DrugUsedDistributeVo antibioticDist : antibioticDistributeList) {
                    Map<String, Object> map = new HashMap<String, Object>();
                    map.put("name", antibioticDist.getMarkedName());
                    map.put("value", antibioticDist.getSaleNum().doubleValue() / useStrength.doubleValue());
                    drugPercentDistributeViewModel.getData().addXaxis(antibioticDist.getMarkedName());
                    drugPercentDistributeViewModel.getData().addDate(map);
                }
            }
        }
        return drugPercentDistributeViewModel;
    }

}
