package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.InteractInfoSampleStatisticVo;

public interface InteractInfoSampleStatisticDao extends JpaRepository<InteractInfoSampleStatisticVo, Long>, InteractInfoSampleStatisticDaoExt {
	/*
	@Query(value = "select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= :timeStamp and ii.timeStamp > (:timeStamp - 60000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 60000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 60000) and ii.timeStamp > (:timeStamp - 120000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 120000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 120000) and ii.timeStamp > (:timeStamp - 180000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 180000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 180000) and ii.timeStamp > (:timeStamp - 240000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 240000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 240000) and ii.timeStamp > (:timeStamp - 300000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 300000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 300000) and ii.timeStamp > (:timeStamp - 360000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 360000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 360000) and ii.timeStamp > (:timeStamp - 420000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 420000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 420000) and ii.timeStamp > (:timeStamp - 480000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 480000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 480000) and ii.timeStamp > (:timeStamp - 540000) group by ii.timeStamp"
			+ " union select new InteractInfoSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 540000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 540000) and ii.timeStamp > (:timeStamp - 600000) group by ii.timeStamp")
	
	List<InteractInfoSampleStatisticVo> listSampleNumOfOneMinTop10(@Param("timeStamp") Long timeStamp);
	
	
	@Query(value = "select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= :timeStamp and ii.timeStamp > (:timeStamp - 86400000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 86400000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 86400000) and ii.timeStamp > (:timeStamp - 172800000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 172800000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 172800000) and ii.timeStamp > (:timeStamp - 259200000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 259200000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 259200000) and ii.timeStamp > (:timeStamp - 345600000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 345600000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 345600000) and ii.timeStamp > (:timeStamp - 432000000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 432000000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 432000000) and ii.timeStamp > (:timeStamp - 518400000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 518400000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 518400000) and ii.timeStamp > (:timeStamp - 604800000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 604800000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 604800000) and ii.timeStamp > (:timeStamp - 691200000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 691200000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 691200000) and ii.timeStamp > (:timeStamp - 777600000) group by ii.timeStamp"
			+ " union select new DrugSampleStatisticVo(ii.templateId, sum(ii.sampleNum), :timeStamp - 777600000) from InteractInfoSampleStatisticVo ds where ii.timeStamp <= (:timeStamp - 777600000) and ii.timeStamp > (:timeStamp - 864000000) group by ii.timeStamp")
	 
	List<InteractInfoSampleStatisticVo> listSampleNumOfOneDayTop10(@Param("timeStamp") Long timeStamp);
	*/
}
