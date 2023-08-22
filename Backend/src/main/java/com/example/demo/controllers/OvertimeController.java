package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Overtime;
import com.example.demo.services.EmployeeService;
import com.example.demo.services.OvertimeScheduleService;
import com.example.demo.services.OvertimeService;
import com.example.demo.services.OvertimeTypeService;

@Controller
@RequestMapping("overtime")
public class OvertimeController {

    
    @Autowired
    private OvertimeService overtimeService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private OvertimeScheduleService overtimeScheduleService;

    @Autowired
    private OvertimeTypeService overtimeTypeService;



    @GetMapping
    public String index(Model model){
        model.addAttribute("overtimes",overtimeService.Get());
        return "overtime/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id !=null){
            model.addAttribute("employees",employeeService.Get());
            model.addAttribute("overtimeSchedules", overtimeScheduleService.Get());
            model.addAttribute("overtimeTypes", overtimeTypeService.Get());
            model.addAttribute("overtime", overtimeService.Get(id));

        }else{
            model.addAttribute("employees",employeeService.Get());
            model.addAttribute("overtimeSchedules", overtimeScheduleService.Get());
            model.addAttribute("overtimeTypes", overtimeTypeService.Get());
            model.addAttribute("overtime", new Overtime());
        }
        return "overtime/form";
    }


    @PostMapping("save")
    public String submit(Overtime overtime){
        Boolean result = overtimeService.Save(overtime);
        if(result){
            return "redirect:/overtime";
        }else{
            return "overtime/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        overtimeService.Delete(id);
        return "redirect:/overtime";
    }
}
