package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.OvertimeStatus;
import com.example.demo.services.OvertimeStatusService;

@Controller
@RequestMapping("overtimeStatus")
public class OvertimeStatusController {
    @Autowired
    private OvertimeStatusService overtimeStatusService ;

    @GetMapping
    public String index(Model model){
        model.addAttribute("overtimeStatuss",overtimeStatusService.Get());
        return "overtimeStatus/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id !=null){
            model.addAttribute("overtimeStatus", overtimeStatusService.Get(id));

        }else{
            model.addAttribute("overtimeStatus", new OvertimeStatus());
        }
        return "overtimeStatus/form";
    }

    @PostMapping("save")
    public String submit(OvertimeStatus overtimeStatus){
        Boolean result = overtimeStatusService.Save(overtimeStatus);
        if(result){
            return "redirect:/overtimeStatus";
        }else{
            return "overtimeStatus/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        overtimeStatusService.Delete(id);
        return "redirect:/overtimeStatus";
    }
}
