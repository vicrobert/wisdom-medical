package com.isoft.wm.infosys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "doctor_recommend")
public class DoctorRecommendVo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "treat_num")
    private Long treatNum;

    @Column(name = "comment_num")
    private Long commentNum;

    @Column(name = "treat_year")
    private Integer treatYear;

    @Column(name = "treat_month")
    private Integer treatMonth;

    private String doctorName;


    public DoctorRecommendVo(Long treatNum, Long commentNum, Integer treatYear, Integer treatMonth, String doctorName) {
        this.treatNum = treatNum;
        this.commentNum = commentNum;
        this.treatYear = treatYear;
        this.treatMonth = treatMonth;
        this.doctorName = doctorName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getTreatNum() {
        return treatNum;
    }

    public void setTreatNum(Long treatNum) {
        this.treatNum = treatNum;
    }

    public Long getCommentNum() {
        return commentNum;
    }

    public void setCommentNum(Long commentNum) {
        this.commentNum = commentNum;
    }

    public Integer getTreatYear() {
        return treatYear;
    }

    public void setTreatYear(Integer treatYear) {
        this.treatYear = treatYear;
    }

    public Integer getTreatMonth() {
        return treatMonth;
    }

    public void setTreatMonth(Integer treatMonth) {
        this.treatMonth = treatMonth;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }


}
