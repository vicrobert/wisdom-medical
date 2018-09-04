package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DiseaseStatisticsVo;
import com.isoft.wm.infosys.entity.PatientVo;

public interface DiseaseStatisticsDao extends PagingAndSortingRepository<DiseaseStatisticsVo, Long> {

    @Deprecated
//	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.community)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by ds.occurYear")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(sum(ds.occurTimes)) from DiseaseStatisticsVo ds, PatientVo p" +
            " where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by ds.occurYear")
    List<DiseaseStatisticsVo> yearOccurNumAtACommunity(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                       @Param("community") String community, @Param("year") Integer year);

    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.community)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by ds.occurMonth order by ds.occurMonth asc")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(sum(ds.occurTimes)) from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and" +
            " ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by ds.occurMonth order by ds.occurMonth asc")
    List<DiseaseStatisticsVo> monthOccurNumAtACommunity(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                        @Param("community") String community, @Param("year") Integer year);

    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, d.name)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p, DiseaseVo d where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.occurYear = :year"
//			+ " and ds.patientId = p.id and p.community = :community and d.id = ds.diseaseId group by ds.diseaseId order by sum(ds.occurTimes) desc")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, 0, sum(ds.occurTimes), d.name) from DiseaseStatisticsVo ds, PatientVo p, DiseaseVo d" +
            " where ds.statisticalType = :selectType and ds.occurYear = :year and ds.patientId = p.id and p.community = :community" +
            " and d.id = ds.diseaseId group by ds.diseaseId order by sum(ds.occurTimes) desc")
    List<DiseaseStatisticsVo> sortDiseaseOccurNumAtACommunityAYear(@Param("selectType") String selectType, @Param("community") String community, @Param("year") Integer year, Pageable page);

    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, d.name)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p, DiseaseVo d where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.occurYear = :year"
//			+ " and ds.occurMonth = :month and ds.patientId = p.id and p.community = :community and d.id = ds.diseaseId group by ds.diseaseId order by sum(ds.occurTimes) desc")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurMonth, sum(ds.occurTimes), d.name) from DiseaseStatisticsVo ds, PatientVo p, DiseaseVo d" +
            " where ds.statisticalType = :selectType and ds.occurYear = :year and ds.occurMonth = :month and ds.patientId = p.id" +
            " and p.community = :community and d.id = ds.diseaseId group by ds.diseaseId order by sum(ds.occurTimes) desc")
    List<DiseaseStatisticsVo> sortDiseaseOccurNumAtACommunityAMonth(@Param("selectType") String selectType, @Param("community") String community, @Param("year") Integer year, @Param("month") Integer month, Pageable page);

    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.community)"
            + " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
            + " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year")
    List<DiseaseStatisticsVo> occurNumAtACommunityAYear(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                        @Param("community") String community, @Param("year") Integer year);

    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.community)"
            + " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
            + " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year and ds.occurMonth = :month")
    List<DiseaseStatisticsVo> occurNumAtACommunityAMonth(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                         @Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);


    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType)"
            + " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
            + " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year and p.age between :ageLo and :ageHi")
    List<DiseaseStatisticsVo> occurNumAtACommunityAYearWithAgeScale(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                                    @Param("community") String community, @Param("year") Integer year, @Param("ageLo") Integer ageLo, @Param("ageHi") Integer ageHi);

    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType)"
            + " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
            + " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year and ds.occurMonth = :month and p.age between :ageLo and :ageHi")
    List<DiseaseStatisticsVo> occurNumAtACommunityAMonthWithAgeScale(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType, @Param("community") String community,
                                                                     @Param("year") Integer year, @Param("month") Integer month, @Param("ageLo") Integer ageLo, @Param("ageHi") Integer ageHi);


    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.sex)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by p.sex")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, 0, sum(ds.occurTimes), p.sex) from DiseaseStatisticsVo ds, PatientVo p" +
            " where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by p.sex")
    List<DiseaseStatisticsVo> sexualOccurNumAtACommunityAYear(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                              @Param("community") String community, @Param("year") Integer year);

    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.sex)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year and ds.occurMonth = :month"
//			+ " group by p.sex")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurMonth, sum(ds.occurTimes), p.sex) from DiseaseStatisticsVo ds, PatientVo p" +
            " where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community" +
            " and ds.occurYear = :year and ds.occurMonth = :month group by p.sex")
    List<DiseaseStatisticsVo> sexualOccurNumAtACommunityAMonth(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                               @Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);


    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.occupation)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by p.occupation")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, 0, sum(ds.occurTimes), p.occupation) from DiseaseStatisticsVo ds, PatientVo p" +
            " where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community and ds.occurYear = :year group by p.occupation")
    List<DiseaseStatisticsVo> occupationOccurNumAtACommunityAYear(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                                  @Param("community") String community, @Param("year") Integer year);

    //	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurSeason, ds.occurMonth, ds.occurDay, sum(ds.occurTimes), ds.statisticalType, p.occupation)"
//			+ " from DiseaseStatisticsVo ds, PatientVo p where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId"
//			+ " and ds.patientId = p.id and p.community = :community and ds.occurYear = :year and ds.occurMonth = :month"
//			+ " group by p.occupation")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, ds.occurMonth, sum(ds.occurTimes), p.occupation) from DiseaseStatisticsVo ds, PatientVo p" +
            " where ds.statisticalType = :selectType and ds.diseaseId = :diseaseId and ds.patientId = p.id and p.community = :community and" +
            " ds.occurYear = :year and ds.occurMonth = :month group by p.occupation")
    List<DiseaseStatisticsVo> occupationOccurNumAtACommunityAMonth(@Param("diseaseId") Long diseaseId, @Param("selectType") String selectType,
                                                                   @Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds.occurYear, 0, sum(ds.occurTimes), d.name) from DiseaseStatisticsVo ds, PatientVo p, DiseaseVo d" +
            " where ds.statisticalType = :selectType and ds.patientId = p.id and ds.occurYear = :year and d.id = ds.diseaseId and p.community = :community" +
            " and p.occupation = :occupation and p.sex = :sex group by ds.diseaseId order by sum(ds.occurTimes) desc")
    List<DiseaseStatisticsVo> diseaseOccurNumAtACommunityAYear(@Param("selectType") String selectType, @Param("community") String community,
                                                               @Param("year") Integer year, @Param("sex") String sex, @Param("occupation") String occupation, Pageable page);


    //disease portrait
//	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds1.occurYear, ds1.occurSeason, ds1.occurMonth, ds1.occurDay, sum(ds1.occurTimes), ds1.statisticalType, d1.name) "
//			+ " from DiseaseStatisticsVo ds1, DiseaseVo d1 where ds1.occurYear = :year and d1.id = ds1.diseaseId and ds1.diseaseId <> :diseaseId and ds1.patientId in"
//			+ " (select p.id from PatientVo p, DiseaseStatisticsVo ds2, DiseaseVo d2 where p.id = ds2.patientId and ds2.occurYear = :year and ds2.diseaseId = d2.id and d2.id = :diseaseId group by p.id)"
//			+ " group by ds1.diseaseId order by sum(ds1.occurTimes) desc")
    @Query(value = "select new com.isoft.wm.infosys.entity.DiseaseStatisticsVo(ds1.occurYear, 0, sum(ds1.occurTimes), d1.name) from DiseaseStatisticsVo ds1, DiseaseVo d1" +
            " where ds1.occurYear = :year and d1.id = ds1.diseaseId and ds1.diseaseId <> :diseaseId and ds1.patientId in" +
            " (select p.id from PatientVo p, DiseaseStatisticsVo ds2, DiseaseVo d2 where p.id = ds2.patientId and ds2.occurYear = :year and ds2.diseaseId = d2.id and d2.id = :diseaseId group by p.id)" +
            " group by ds1.diseaseId order by sum(ds1.occurTimes) desc")
    List<DiseaseStatisticsVo> diseasePortraitSortRelatedDisease(@Param("diseaseId") Long diseaseId, @Param("year") Integer year, Pageable page);

}
