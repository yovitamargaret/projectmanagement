package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Entity
@Table(name = "tb_m_overtime")
public class Overtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer Submission_id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private OvertimeSchedule overtimeSchedule;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private OvertimeType overtimeType;

    private String Assignment;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date start_time;


    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date end_time;


    public Integer getSubmission_id() {
        return Submission_id;
    }

    public void setSubmission_id(Integer Submission_id) {
        this.Submission_id = Submission_id;
    }

    public String getAssignment() {
        return Assignment;
    }

    public void setAssignment(String Assignment) {
        this.Assignment = Assignment;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public OvertimeSchedule getOvertimeSchedule() {
        return overtimeSchedule;
    }

    public void setOvertimeSchedule(OvertimeSchedule overtimeSchedule) {
        this.overtimeSchedule = overtimeSchedule;
    }

    public OvertimeType getOvertimeType() {
        return overtimeType;
    }

    public void setOvertimeType(OvertimeType overtimeType) {
        this.overtimeType = overtimeType;
    }
}
