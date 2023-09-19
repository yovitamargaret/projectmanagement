package com.example.demo.dto;

public class UserInfo {
    private String employee_name;
    private String role_name;
    private int role_level;
    
    public String getEmployee_name() {
        return employee_name;
    }
    public void setEmployee_name(String employee_name) {
        this.employee_name = employee_name;
    }
    public String getRole_name() {
        return role_name;
    }
    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }
    public int getRole_level() {
        return role_level;
    }
    public void setRole_level(int role_level) {
        this.role_level = role_level;
    }
}
