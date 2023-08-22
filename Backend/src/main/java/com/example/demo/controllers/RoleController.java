package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Role;
import com.example.demo.services.RoleService;

@Controller
@RequestMapping("role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("employees", roleService.Get());
        return "role/index";
    }

    @GetMapping(value = {"form", "form/{id}"})
    public String form(@PathVariable(required = false) Integer id, Model model) {
        if(id != null) {
            model.addAttribute("employee", roleService.Get(id));
        }
        else {
            model.addAttribute("employee", new Role());
        }
        return "role/form";
    }

    @PostMapping("save")
    public String save(Role region) {
        Boolean result = roleService.Save(region);
        if(result) {
            return "redirect:/role";
        } else {
            return "role/form";
        }
    }
    
    @PostMapping(value = {"delete/{id}"})
    public String delete(@PathVariable(required = true) Integer id) {
        roleService.Delete(id);
        return "redirect:/role";
    }
}
