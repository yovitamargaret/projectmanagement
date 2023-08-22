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

import com.example.demo.entities.OvertimeType;
import com.example.demo.handler.Response;
import com.example.demo.services.OvertimeTypeService;



@RestController
@RequestMapping("api")
public class OvertimeTypeRestController {
    @Autowired
    private OvertimeTypeService overtimeTypeService;

    @GetMapping("overtimeType")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK,"data has been succesfully retrieved", overtimeTypeService.Get());
    }

    @GetMapping("overtimeType/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "data has been succesfully retrieved", overtimeTypeService.Get(id));
    }

    @PostMapping("overtimeType")
    public ResponseEntity<Object> save(@RequestBody OvertimeType overtimeType){
        overtimeTypeService.Save(overtimeType);
        return Response.generate(HttpStatus.OK, "data has been succesfully saved");
    }

    @DeleteMapping("overtimeType/{id}")
    public ResponseEntity<Object> delete(@PathVariable(required = true) Integer id){
        overtimeTypeService.Delete(id);
        return Response.generate(HttpStatus.OK, "data has been succesfully deleted");
    }
}
