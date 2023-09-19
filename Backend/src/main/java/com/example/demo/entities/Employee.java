package com.example.demo.entities;

import java.util.List;

import javax.persistence.*;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="tb_m_employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="employee_id")
    private Integer employee_id;
    @Column(name ="name")
    private String name;
    @Column(name ="address")
    private String address;
    @Column(name ="email")
    private String email;
    @Column(name="phone_number")
    private String phone_number;

    // @OneToOne
    // @JoinColumn(name="employee_id")
    // private User user;

    @OneToMany(mappedBy="employee")
    @JsonIgnore
    private List<TaskDetail> taskDetail;

    @ManyToOne
    @JoinColumn(name="team_id")
    @Nullable
    private Team team;

    public Integer getEmployee_id() {
        return employee_id;
    }
    public void setEmployee_id(Integer employee_id) {
        this.employee_id = employee_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(String phonenumber) {
        this.phone_number = phonenumber;
    }
    // public User getUser() {
    //     return user;
    // }
    // public void setUser(User user) {
    //     this.user = user;
    // }
    public Team getTeam() {
        return team;
    }
    public void setTeam(Team team) {
        this.team = team;
    }
}
