package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.services.DepartmentService;

@SpringBootTest
public class DepartmentTest {
    @Autowired
    private DepartmentService departmentService;

    @Test
    public void save(){
        Boolean expected = true;
        com.example.demo.entities.Department department = new com.example.demo.entities.Department();
        department.setDepartment_id(1);
        department.setName("Information Technology");

        Boolean result = departmentService.Save(department);

        assertEquals(expected,result);

    }

    @Test
    public void Delete(){
        Boolean expected = true;
        Integer department_id = 9;

        Boolean result = departmentService.Delete(department_id);

        assertEquals(expected, result);
    }
}
