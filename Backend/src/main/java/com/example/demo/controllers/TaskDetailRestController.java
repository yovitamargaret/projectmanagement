package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.TaskDetail;
import com.example.demo.handler.Response;
import com.example.demo.services.TaskDetailService;

@RestController
@RequestMapping("api")
@CrossOrigin
public class TaskDetailRestController {
    @Autowired
    private TaskDetailService taskDetailService;


    @GetMapping("task_detail")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "All data has been successfully retrieved", taskDetailService.Get());
    }

    @GetMapping("task_detail/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "Data has been successfully retrieved", taskDetailService.Get(id));
    }

    @PostMapping("task_detail")
    public ResponseEntity<Object> save(@RequestBody TaskDetail task_detail){
        taskDetailService.Save(task_detail);
        return Response.generate(HttpStatus.OK, "Data has been succesfully saved");
    }

    @DeleteMapping("task_detail/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        taskDetailService.Delete(id);
        return Response.generate(HttpStatus.OK,"Data has been succesfully deleted");
    }
}
