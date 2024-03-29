package com.example.demo.entities;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_tr_project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer project_id;
    private String name;
    private String description;
    private Date start_date;
    private Date due_date;
    private String project_approval_status;
    private Timestamp approval_date;
    private String project_status;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;

    @OneToMany(mappedBy="project")
    @JsonIgnore
    private List<Task> tasks;

    public Integer getProject_id() {
        return project_id;
    }
    public void setProject_id(Integer project_id) {
        this.project_id = project_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getStart_date() {
        return start_date;
    }
    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }
    public Date getDue_date() {
        return due_date;
    }
    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }
    public String getProject_approval_status() {
        return project_approval_status;
    }
    public void setProject_approval_status(String project_approval_status) {
        this.project_approval_status = project_approval_status;
    }
    public Timestamp getApproval_date() {
        return approval_date;
    }
    public void setApproval_date(Timestamp approval_date) {
        this.approval_date = approval_date;
    }
    public String getProject_status() {
        return project_status;
    }
    public void setProject_status(String project_status) {
        this.project_status = project_status;
    }
    public Team getTeam() {
        return team;
    }
    public void setTeam(Team team) {
        this.team = team;
    }
}