package com.example.demo.controllers;


// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Department;
import com.example.demo.handler.Response;
import com.example.demo.services.DepartmentService;

@RestController
@RequestMapping("api")
public class DepartmentRestController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("department")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", departmentService.Get());
    }

    @GetMapping("department/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", departmentService.Get(id));
    }

    @PostMapping("department")
    public ResponseEntity<Object> save(@RequestBody Department department){
        departmentService.Save(department);
        return Response.generate(HttpStatus.OK, "data has been succesfully saved");
    }

    @DeleteMapping("department/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        departmentService.Delete(id);
        return Response.generate(HttpStatus.OK, "data has been succesfully deleted");
    }
    
}
