package com.isoft.wm.infosys.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "department")
public class DepartmentVo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "hosp_id")
    private Long hospitalId;

    @Column(name = "name")
    private String name;

    @Column(name = "doc_num")
    private Long doctorNum;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "status")
    private Integer status;

    @Column(name = "parent_dept_id")
    private Long parentDepartmentId;

    //在部门树形层级结构中的层数,0代表根部门
    @Column(name = "tree_level")
    private Integer treeLevel;

    @Transient
    private Object children;

    @Transient
    private Object _children;

    public DepartmentVo() {
    }

    public DepartmentVo(String name) {
        this.name = name;
    }

    public DepartmentVo(String name, Long doctorNum) {
        this.name = name;
        this.doctorNum = doctorNum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDoctorNum() {
        return doctorNum;
    }

    public void setDoctorNum(Long doctorNum) {
        this.doctorNum = doctorNum;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getParentDepartmentId() {
        return parentDepartmentId;
    }

    public void setParentDepartmentId(Long parentDepartmentId) {
        this.parentDepartmentId = parentDepartmentId;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public Object getChildren() {
        return children;
    }

    public void setChildren(Object children) {
        this.children = children;
    }

    public Object get_children() {
        return _children;
    }

    public void set_children(Object _children) {
        this._children = _children;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof DepartmentVo && this.name != null) {
            return this.name.equals(((DepartmentVo) obj).getName());
        }
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        if (this.name != null) {
            return this.name.hashCode();
        }
        return super.hashCode();
    }

    @Override
    public String toString() {
        if (this.name != null) {
            StringBuilder sb = new StringBuilder();
            sb.append(this.name).append("(").append(this.doctorNum).append(")");
            return sb.toString();
        }
        return super.toString();
    }


}
