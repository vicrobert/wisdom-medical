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
@Table(name = "hospital") 
public class HospitalVo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable=false)
	private Long id;
	
	@Column(name = "community_name")
	private String communityName;
	
	@Column(name = "prov_name")
	private String province;
	
	@Column(name = "city_name")
	private String city;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "doc_num")
	private Long doctorNum;
	
	@Column(name = "dept_num")
	private Long departmentNum;
	
	@Column(name = "praise")
	private String praise;
	
	@Column(name = "stars")
	private String stars;
	
	@Column(name = "hosp_class")
	private String hospitalClass;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "level")
	private String level;
	
	@Column(name = "pic")
	private String pic;
	
	@Column(name = "profiles")
	private String profiles;
	
	@Column(name = "tel")
	private String tel;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name = "updated_at")
	private Date updatedAt;
	
	@Column(name = "status")
	private Integer status;
	
	@Column(name = "website")
	private String website;
	
	@Column(name = "feature_dept")
	private String featureDepartment;
	
	@Column(name = "score")
	private Integer score;
	
	@Column(name = "lng")
	private Double lng;
	
	@Column(name = "lat")
	private Double lat;
	
	@Transient
	private Object children;
	
	@Transient
	private Object _children;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCommunityName() {
		return communityName;
	}

	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
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

	public Long getDepartmentNum() {
		return departmentNum;
	}

	public void setDepartmentNum(Long departmentNum) {
		this.departmentNum = departmentNum;
	}

	public String getPraise() {
		return praise;
	}

	public void setPraise(String praise) {
		this.praise = praise;
	}

	public String getStars() {
		return stars;
	}

	public void setStars(String stars) {
		this.stars = stars;
	}

	public String getHospitalClass() {
		return hospitalClass;
	}

	public void setHospitalClass(String hospitalClass) {
		this.hospitalClass = hospitalClass;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public String getProfiles() {
		return profiles;
	}

	public void setProfiles(String profiles) {
		this.profiles = profiles;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
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

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getFeatureDepartment() {
		return featureDepartment;
	}

	public void setFeatureDepartment(String featureDepartment) {
		this.featureDepartment = featureDepartment;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	
	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
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
}
