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

import com.example.demo.entities.Task;
import com.example.demo.handler.Response;
import com.example.demo.services.TaskService;

@RestController
@RequestMapping("api")
public class TaskRestController {
    @Autowired
    private TaskService taskService;


    @GetMapping("task")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "All data has been successfully retrieved", taskService.Get());
    }

    @GetMapping("task/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "Data has been successfully retrieved", taskService.Get(id));
    }

    @PostMapping("task")
    public ResponseEntity<Object> save(@RequestBody Task task){
        taskService.Save(task);
        return Response.generate(HttpStatus.OK, "Data has been succesfully saved");
    }

    @DeleteMapping("task/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        taskService.Delete(id);
        return Response.generate(HttpStatus.OK,"Data has been succesfully deleted");
    }
}
