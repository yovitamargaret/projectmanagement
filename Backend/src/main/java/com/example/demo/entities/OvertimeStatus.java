package com.example.demo.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_m_overtimestatus")
public class OvertimeStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer status_id;
    private String name;

    @OneToMany(mappedBy = "overtimeStatus")
    private List<OvertimeSchedule> overtimeSchedules;
    
    public Integer getStatus_id() {
        return status_id;
    }
    public void setStatus_id(Integer status_id) {
        this.status_id = status_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) { 
        this.name = name;
    }
}
