package com.isoft.wm.infosys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pharmacy_statistics")
public class PharmacyStatisticsVo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "drug_catalog_id")
    private Long drugCatalogId;

    @Column(name = "sale_num")
    private Integer saleNum;

    @Column(name = "sale_year")
    private Integer saleYear;

    @Column(name = "sale_month")
    private Integer saleMonth;

    @Column(name = "hosp_id")
    private Long hospitalId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDrugCatalogId() {
        return drugCatalogId;
    }

    public void setDrugCatalogId(Long drugCatalogId) {
        this.drugCatalogId = drugCatalogId;
    }

    public Integer getSaleNum() {
        return saleNum;
    }

    public void setSaleNum(Integer saleNum) {
        this.saleNum = saleNum;
    }

    public Integer getSaleYear() {
        return saleYear;
    }

    public void setSaleYear(Integer saleYear) {
        this.saleYear = saleYear;
    }

    public Integer getSaleMonth() {
        return saleMonth;
    }

    public void setSaleMonth(Integer saleMonth) {
        this.saleMonth = saleMonth;
    }

    public Long getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
    }

}
