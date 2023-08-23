package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Project;
import com.example.demo.services.ProjectService;

@Controller
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("projects", projectService.Get());
        return "project/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(@PathVariable(required = false) Integer id, Model model){
        if(id != null){
            model.addAttribute("project", projectService.Get(id));
        } else{
            model.addAttribute("project", new Project());
        }
        return "team/form";
    }

    @GetMapping("save")
    public String submit(Project project){
        Boolean result = projectService.Save(null);        
        if(result){
            return "redirect:/team";
        }else{
            return "team:/form";
        }
    }

    @PostMapping("delete/{id}")
    public String teamDelete(@PathVariable(required = true) Integer id){
        projectService.Delete(id);
        return "redirect:/team";

    }

}
