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

import com.example.demo.entities.OvertimeStatus;
import com.example.demo.handler.Response;
import com.example.demo.services.OvertimeStatusService;

@RestController
@RequestMapping("api")
public class OvertimeStatusRestController {
    @Autowired
    private OvertimeStatusService overtimeStatusService;

    @GetMapping("overtimeStatus")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeStatusService.Get());
    }

    @GetMapping("overtimeStatus/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeStatusService.Get(id));
    }

    @PostMapping("overtimeStatus")
    public ResponseEntity<Object> save(@RequestBody OvertimeStatus overtimeStatus){
        overtimeStatusService.Save(overtimeStatus);
        return Response.generate(HttpStatus.OK, "data has been succesfully saved");
    }

    @DeleteMapping("overtimeStatus/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        overtimeStatusService.Delete(id);
        return Response.generate(HttpStatus.OK, "data has been succesfully deleted");
    }
}
