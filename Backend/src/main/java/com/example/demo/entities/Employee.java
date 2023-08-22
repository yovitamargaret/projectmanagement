package com.example.demo.entities;

import java.util.List;

import javax.persistence.*;

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
    @Column(name="phone_number")
    private String phone_number;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private List<TaskDetail> task_detail;

    public String getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
    // @ManyToOne
    // @JoinColumn
    // @Column(name ="manager_id")
    // private Integer manager_id;
    // // private Employee employee;
    // @Column(name ="joindate")
    // private Date joindate;
    @Column(name ="email")
    private String email;

    
    // public Department getDepartment() {
    //     return department;
    // }
    // public void setDepartment(Department department) {
    //     this.department = department;
    // }
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
    // public String getPhonenumber() {
    //     return phonenumber;
    // }
    // public void setPhonenumber(String phonenumber) {
    //     this.phonenumber = phonenumber;
    // }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
