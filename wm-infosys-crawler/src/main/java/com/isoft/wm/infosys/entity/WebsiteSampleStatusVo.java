package com.isoft.wm.infosys.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "websitesample_status")
public class WebsiteSampleStatusVo {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "template_id")
    private Long templateId;

    @Column(name = "status")
    private Integer status;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    private String webName;

    public WebsiteSampleStatusVo() {
    }

    public WebsiteSampleStatusVo(String webName, Integer status, Date createdAt, Date updatedAt) {
        this.webName = webName;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public String getWebName() {
        return webName;
    }

    public void setWebName(String webName) {
        this.webName = webName;
    }


}
