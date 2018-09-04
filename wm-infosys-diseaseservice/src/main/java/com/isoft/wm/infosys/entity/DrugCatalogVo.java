package com.isoft.wm.infosys.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "drug_catalog")
public class DrugCatalogVo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "class_name")
    private String className;

    @Column(name = "type_name")
    private String typeName;

    @Column(name = "source")
    private String source;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "manufacture_at")
    private Date manufactureAt;

    @Column(name = "date_of_storage")
    private Date dateOfStorage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Date getManufactureAt() {
        return manufactureAt;
    }

    public void setManufactureAt(Date manufactureAt) {
        this.manufactureAt = manufactureAt;
    }

    public Date getDateOfStorage() {
        return dateOfStorage;
    }

    public void setDateOfStorage(Date dateOfStorage) {
        this.dateOfStorage = dateOfStorage;
    }

}
