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

import com.example.demo.entities.OvertimeSchedule;
import com.example.demo.handler.Response;
import com.example.demo.services.OvertimeScheduleService;

@RestController
@RequestMapping("api")
public class OvertimeScheduleRestController {
    @Autowired
    private OvertimeScheduleService overtimeScheduleService;

    @GetMapping("overtimeSchedule")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeScheduleService.Get());
    }

    @GetMapping("overtimeSchedule/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeScheduleService.Get(id));
    }

    @PostMapping("overtimeSchedule")
    public ResponseEntity<Object> save(@RequestBody OvertimeSchedule overtimeSchedule){
        overtimeScheduleService.Save(overtimeSchedule);
        return Response.generate(HttpStatus.OK, "data has been succesfully saved");
    }

    @DeleteMapping("overtimeSchedule/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        overtimeScheduleService.Delete(id);
        return Response.generate(HttpStatus.OK, "data has been succesfully deleted");
    }

 
    
}
