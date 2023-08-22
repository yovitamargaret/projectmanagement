package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Department;
import com.example.demo.repositories.DepartmentRepository;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> Get() {
        return departmentRepository.findAll();
    }

    @Override
    public Department Get(Integer id) {
        return departmentRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Department model) {
        departmentRepository.save(model);
        return departmentRepository.findById(model.getDepartment_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        departmentRepository.deleteById(id);
        return !departmentRepository.findById(id).isPresent();
    }
    
}
