package com.isoft.wm.infosys.entity;


public class DocLevelNumVo {
    private String doctor_position;
    private Long cnt_person;

    public DocLevelNumVo(String doctor_position, Long cnt_person) {
        this.doctor_position = doctor_position;
        this.cnt_person = cnt_person;
    }

    public String getDoctor_position() {
        return doctor_position == null ? "" : doctor_position;
    }

    public void setDoctor_position(String doctor_position) {
        this.doctor_position = doctor_position;
    }

    public Long getCnt_person() {
        return cnt_person;
    }

    public void setCnt_person(Long cnt_person) {
        this.cnt_person = cnt_person;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof DocLevelNumVo && this.doctor_position != null) {
            return this.doctor_position.equals(((DocLevelNumVo) obj).getDoctor_position());
        }
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        if (this.doctor_position != null) {
            return this.doctor_position.hashCode();
        }
        return super.hashCode();
    }

    @Override
    public String toString() {
        if (this.doctor_position != null) {
            StringBuilder sb = new StringBuilder();
            sb.append(this.doctor_position).append("(").append(this.cnt_person).append(")");
            return sb.toString();
        }
        return super.toString();
    }


}
