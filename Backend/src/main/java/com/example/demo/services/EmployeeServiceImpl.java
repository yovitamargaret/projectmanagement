package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.repositories.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> Get() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee Get(Integer id) {
        return employeeRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Employee model) {
        employeeRepository.save(model);
        return employeeRepository.findById(model.getEmployee_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        employeeRepository.deleteById(id);
        return !employeeRepository.findById(id).isPresent();
    }

    @Override
    public Integer findIdByEmail(String email) {
        return employeeRepository.findIdByEmail(email);
    }
    
}
