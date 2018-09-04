package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.viewmodel.DrugPercentDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugSourceDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugTypeDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DrugUseStrengthViewModel;

public interface DrugServiceBase {
    //疾病疗效分析
    DrugUseStrengthViewModel getDrugUseStrength(String community, int year, int month);

    DrugSourceDistributeViewModel getDrugSourceDistribute(String community, int year, int month);

    DrugTypeDistributeViewModel getDrugTypeDistribute(String community, int year, int month);

    DrugPercentDistributeViewModel getDrugPercentDistribute(String community, int year, int month);
}
