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

import com.example.demo.entities.Project;
import com.example.demo.handler.Response;
import com.example.demo.services.ProjectService;

@RestController
@RequestMapping("api")
public class ProjectRestController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("project")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "All data has been successfully retrieved", projectService.Get());
    }

    @GetMapping("project/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id ){
        return Response.generate(HttpStatus.OK,"Data has been successfully retrieved", projectService.Get(id));
    }

    @PostMapping("project")
    public ResponseEntity<Object> save(@RequestBody Project project){
        projectService.Save(project);
        return Response.generate(HttpStatus.OK, "Data has been succesfully saved");
    }

    @DeleteMapping("project/{id}")
    public ResponseEntity<Object> put(@PathVariable(required = true) Integer id) {
        projectService.Delete(id);
        return Response.generate(HttpStatus.OK,"Data has been succesfully deleted");
    }
}
