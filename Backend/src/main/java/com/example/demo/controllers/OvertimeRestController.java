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

import com.example.demo.entities.Overtime;
import com.example.demo.handler.Response;
import com.example.demo.services.OvertimeService;

@RestController
@RequestMapping("api")
public class OvertimeRestController {
    @Autowired
    private OvertimeService overtimeService;

    @GetMapping("overtime")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeService.Get());
    }

    @GetMapping("overtime/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeService.Get(id));
    }

    @PostMapping("overtime")
    public ResponseEntity<Object> save(@RequestBody Overtime overtime){
        overtimeService.Save(overtime);
        return Response.generate(HttpStatus.OK, "data has been succesfully saved");
    }

    @DeleteMapping("overtime/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        overtimeService.Delete(id);
        return Response.generate(HttpStatus.OK, "data has been succesfully deleted");
    }

}
