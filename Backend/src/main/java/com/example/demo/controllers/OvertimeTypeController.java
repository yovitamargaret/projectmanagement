package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.OvertimeType;
import com.example.demo.services.OvertimeTypeService;

@Controller
@RequestMapping("overtimeType")
public class OvertimeTypeController {
    @Autowired
    private OvertimeTypeService overtimeTypeService ;

    @GetMapping
    public String index(Model model){
        model.addAttribute("overtimeTypes",overtimeTypeService.Get());
        return "overtimeType/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id !=null){
            model.addAttribute("overtimeType", overtimeTypeService.Get(id));

        }else{
            model.addAttribute("overtimeType", new OvertimeType());
        }
        return "overtimeType/form";
    }

    @PostMapping("save")
    public String submit(OvertimeType overtimeType){
        Boolean result = overtimeTypeService.Save(overtimeType);
        if(result){
            return "redirect:/overtimeType";
        }else{
            return "overtimeType/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        overtimeTypeService.Delete(id);
        return "redirect:/overtimeType";
    }
}
