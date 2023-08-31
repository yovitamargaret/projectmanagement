package com.example.demo.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_m_team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer team_id;
    private String name;
    private Integer team_member_number;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<Employee> employees;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<Project> project;
    
    public Integer getTeam_id() {
        return team_id;
    }
    public void setTeam_id(Integer team_id) {
        this.team_id = team_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getTeam_member_number() {
        return team_member_number;
    }
    public void setTeam_member_number(Integer team_member_number) {
        this.team_member_number = team_member_number;
    }
    

    

}