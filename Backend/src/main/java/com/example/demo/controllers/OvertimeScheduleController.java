package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.OvertimeSchedule;
import com.example.demo.services.OvertimeScheduleService;
import com.example.demo.services.OvertimeStatusService;

@Controller
@RequestMapping("overtimeSchedule")
public class OvertimeScheduleController {
    @Autowired
    private OvertimeScheduleService overtimeScheduleService;

    @Autowired
    private OvertimeStatusService overtimeStatusService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("overtimeSchedules", overtimeScheduleService.Get());
        return "overtimeSchedule/index";
    }
    //GET
    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id != null){
            model.addAttribute("overtimeStatuss",overtimeStatusService.Get());
            model.addAttribute("overtimeSchedule", overtimeScheduleService.Get(id));
        }else{
            model.addAttribute("overtimeStatuss",overtimeStatusService.Get());
            model.addAttribute("overtimeSchedule", new OvertimeSchedule());
        }
        return "overtimeSchedule/form";
    }

    //POST
    @PostMapping("save")
    public String submit(OvertimeSchedule overtimeSchedule){
        Boolean result = overtimeScheduleService.Save(overtimeSchedule);
        if(result){
            return "redirect:/overtimeSchedule";
        } else{
            return "overtimeSchedule/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        overtimeScheduleService.Delete(id);
        return "redirect:/overtimeSchedule";
    }

    
}
