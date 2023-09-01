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

import com.example.demo.entities.Team;
import com.example.demo.handler.Response;
import com.example.demo.services.TeamService;

@RestController
@RequestMapping("api")
@CrossOrigin
public class TeamRestController {

    @Autowired
    private TeamService teamService;

    @GetMapping("team")
    public ResponseEntity<Object> get(){
        return Response.generate(HttpStatus.OK, "All data has been successfully retrieved", teamService.Get());
    }

    @GetMapping("team/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id){
        return Response.generate(HttpStatus.OK, "Data has been successfully retrieved", teamService.Get(id));
    }

    @PostMapping("team")
    public ResponseEntity<Object> save(@RequestBody Team team){
        teamService.Save(team);
        return Response.generate(HttpStatus.OK, "Data has been succesfully saved");

    }

    @DeleteMapping("team/{id}")
    public ResponseEntity<Object> put(@PathVariable(required = true) Integer id){
        teamService.Delete(id);
        return Response.generate(HttpStatus.OK, "Data has been succesfully deleted");
    } 
}
