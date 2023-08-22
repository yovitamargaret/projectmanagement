package com.example.demo.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "tb_m_overtimeschedule")
public class OvertimeSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer schedule_id;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date submit_date;

    @ManyToOne
    @JoinColumn(name ="status_id")
    private OvertimeStatus overtimeStatus;

    @OneToMany(mappedBy = "overtimeSchedule")
    private List<Overtime> overtimes;

    public Integer getSchedule_id() {
        return schedule_id;
    }

    public void setSchedule_id(Integer schedule_id) {
        this.schedule_id = schedule_id;
    }

    public Date getSubmit_date() {
        return submit_date;
    }

    public void setSubmit_date(Date submit_date) {
        this.submit_date = submit_date;
    }

    public OvertimeStatus getOvertimeStatus() {
        return overtimeStatus;
    }

    public void setOvertimeStatus(OvertimeStatus overtimeStatus) {
        this.overtimeStatus = overtimeStatus;
    }
}
