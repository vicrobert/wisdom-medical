package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DiseaseVo;
import com.isoft.wm.infosys.entity.DrugUsedDistributeVo;

public interface PharmacyStatisticsDao extends PagingAndSortingRepository<DiseaseVo, Long> {
    @Query(value = "select sum(ps.saleNum) from PharmacyStatisticsVo ps, HospitalVo h where ps.saleYear = :year and ps.saleMonth = :month"
            + " and ps.hospitalId = h.id and h.communityName = :community")
    Integer antibioticUseStrengthAMonth(@Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select sum(ps.saleNum) from PharmacyStatisticsVo ps, HospitalVo h where ps.saleYear = :year"
            + " and ps.hospitalId = h.id and h.communityName = :community")
    Integer antibioticUseStrengthAYear(@Param("community") String community, @Param("year") Integer year);

    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, ps.saleMonth, sum(ps.saleNum), dc.source, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year and ps.saleMonth = :month"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.source")
    List<DrugUsedDistributeVo> drugUsedSourceDistributeAMonth(@Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, sum(ps.saleNum), dc.source, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.source")
    List<DrugUsedDistributeVo> drugUsedSourceDistributeAYear(@Param("community") String community, @Param("year") Integer year);


    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, ps.saleMonth, sum(ps.saleNum), dc.className, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year and ps.saleMonth = :month"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.className")
    List<DrugUsedDistributeVo> drugUsedClassDistributeAMonth(@Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, sum(ps.saleNum), dc.className, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.className")
    List<DrugUsedDistributeVo> drugUsedClassDistributeAYear(@Param("community") String community, @Param("year") Integer year);


    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, ps.saleMonth, sum(ps.saleNum), dc.typeName, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year and ps.saleMonth = :month"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.typeName")
    List<DrugUsedDistributeVo> drugUsedTypeDistributeAMonth(@Param("community") String community, @Param("year") Integer year, @Param("month") Integer month);

    @Query(value = "select new com.isoft.wm.infosys.entity.DrugUsedDistributeVo(ps.saleYear, sum(ps.saleNum), dc.typeName, h.communityName)"
            + " from PharmacyStatisticsVo ps, DrugCatalogVo dc, HospitalVo h where ps.saleYear = :year"
            + " and dc.id = ps.drugCatalogId and ps.hospitalId = h.id and h.communityName = :community group by dc.typeName")
    List<DrugUsedDistributeVo> drugUsedTypeDistributeAYear(@Param("community") String community, @Param("year") Integer year);

}
