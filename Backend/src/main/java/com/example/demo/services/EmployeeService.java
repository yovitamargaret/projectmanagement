package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Employee;
import com.example.demo.services.generic.GenericService;

public interface EmployeeService extends GenericService<Employee,Integer> {
    public Integer findIdByEmail(String email);
    public List<Employee> findManyByProject(Integer project_id);
}
