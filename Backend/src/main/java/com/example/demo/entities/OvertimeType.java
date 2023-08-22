package com.example.demo.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_m_overtimetype")
public class OvertimeType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer type_id;
    private String name;

    @OneToMany(mappedBy = "overtimeType")
    private List<Overtime> overtimes;

    public Integer getType_id() {
        return type_id;
    }
    public void setType_id(Integer type_id) {
        this.type_id = type_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


}
