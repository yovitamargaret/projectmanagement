package com.example.demo.controllers;

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

import com.example.demo.entities.Role;
import com.example.demo.handler.Response;
import com.example.demo.services.RoleService;

@RestController
@RequestMapping("api")
public class RoleRestController {
    @Autowired
    private RoleService roleService;

    @GetMapping("role")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "All data has been successfully retrieved", roleService.Get());
    }

    @GetMapping("role/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id ){
        return Response.generate(HttpStatus.OK,"Data has been successfully retrieved", roleService.Get(id));
    }

    @PostMapping("role")
    public ResponseEntity<Object> save(@RequestBody Role role){
        roleService.Save(role);
        return Response.generate(HttpStatus.OK, "Data has been succesfully saved");
    }

    @DeleteMapping("role/{id}")
    public ResponseEntity<Object> put(@PathVariable(required = true) Integer id) {
        roleService.Delete(id);
        return Response.generate(HttpStatus.OK,"Data has been succesfully deleted");
    }
}
