package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.Task;
import com.example.demo.services.TaskService;

@Controller
@RequestMapping("task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("tasks",taskService.Get());
        return "task/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id !=null){
            model.addAttribute("task", taskService.Get(id));

        }else{
            model.addAttribute("task", new Task());
        }
        return "task/form";
    }


    @PostMapping("save")
    public String submit(Task task){
        Boolean result = taskService.Save(task);
        if(result){
            return "redirect:/task";
        }else{
            return "task/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        taskService.Delete(id);
        return "redirect:/task";
    }
}
