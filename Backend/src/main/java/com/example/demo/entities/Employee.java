package com.example.demo.entities;

import javax.persistence.*;

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
}
