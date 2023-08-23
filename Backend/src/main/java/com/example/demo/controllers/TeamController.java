package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Team;
import com.example.demo.services.TeamService;

@Controller
@RequestMapping("team")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("teams", teamService.Get());
        return "team/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(@PathVariable(required = false) Integer id, Model model){
        if(id != null){
            model.addAttribute("team", teamService.Get(id));
        } else {
            model.addAttribute("team", new Team()); 
        }
        return "team/form";
    }

    @GetMapping("save")
    public String submit(Team team){
        Boolean result = teamService.Save(team);
        if(result){
            return "redirect:/team";
        }else{
            return "team:/form";
        }
    }

    @PostMapping("delete/{id}")
    public String teamDelete(@PathVariable(required = true) Integer id){
        teamService.Delete(id);
        return "redirect:/team";

    }
    }


