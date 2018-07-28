package com.isoft.wm.infosys.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DrugSampleStatisticVo;

public interface DrugSampleStatisticDao extends JpaRepository<DrugSampleStatisticVo, Long>, DrugSampleStatisticDaoExt {
	/*
	@Query(value = "select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp) from DrugSampleStatisticVo ds where ds.timeStamp <= :timeStamp and ds.timeStamp > (:timeStamp - 60000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 60000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 60000) and ds.timeStamp > (:timeStamp - 120000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 120000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 120000) and ds.timeStamp > (:timeStamp - 180000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 180000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 180000) and ds.timeStamp > (:timeStamp - 240000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 240000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 240000) and ds.timeStamp > (:timeStamp - 300000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 300000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 300000) and ds.timeStamp > (:timeStamp - 360000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 360000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 360000) and ds.timeStamp > (:timeStamp - 420000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 420000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 420000) and ds.timeStamp > (:timeStamp - 480000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 480000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 480000) and ds.timeStamp > (:timeStamp - 540000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 540000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 540000) and ds.timeStamp > (:timeStamp - 600000) group by ds.timeStamp")
	 
	
	List<DrugSampleStatisticVo> listSampleNumOfOneMinTop10(@Param("timeStamp") Long timeStamp);
	
	
	@Query(value = "select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp) from DrugSampleStatisticVo ds where ds.timeStamp <= :timeStamp and ds.timeStamp > (:timeStamp - 86400000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 86400000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 86400000) and ds.timeStamp > (:timeStamp - 172800000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 172800000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 172800000) and ds.timeStamp > (:timeStamp - 259200000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 259200000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 259200000) and ds.timeStamp > (:timeStamp - 345600000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 345600000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 345600000) and ds.timeStamp > (:timeStamp - 432000000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 432000000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 432000000) and ds.timeStamp > (:timeStamp - 518400000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 518400000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 518400000) and ds.timeStamp > (:timeStamp - 604800000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 604800000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 604800000) and ds.timeStamp > (:timeStamp - 691200000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 691200000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 691200000) and ds.timeStamp > (:timeStamp - 777600000) group by ds.timeStamp"
			+ " union select new DrugSampleStatisticVo(ds.templateId, sum(ds.sampleNum), :timeStamp - 777600000) from DrugSampleStatisticVo ds where ds.timeStamp <= (:timeStamp - 777600000) and ds.timeStamp > (:timeStamp - 864000000) group by ds.timeStamp")
	
	List<DrugSampleStatisticVo> listSampleNumOfOneDayTop10(@Param("timeStamp") Long timeStamp);
	*/
}
