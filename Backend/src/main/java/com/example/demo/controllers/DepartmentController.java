package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Department;
import com.example.demo.services.DepartmentService;
import com.example.demo.services.RegionService;

@Controller
@RequestMapping("department")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private RegionService regionService;


    @GetMapping
    public String index(Model model){
        model.addAttribute("departments", departmentService.Get());
        return "department/index";
    }
    //GET
    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id != null){
            model.addAttribute("department", departmentService.Get(id));
            model.addAttribute("region", regionService.Get());
        }else{
            model.addAttribute("department", new Department());
        }
        return "department/form";
    }

    //POST
    @PostMapping("save")
    public String submit(Department department){
        Boolean result = departmentService.Save(department);
        if(result){
            return "redirect:/department";
        } else{
            return "department/form";
        } 
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        departmentService.Delete(id);
        return "redirect:/department";
    }

    
}
