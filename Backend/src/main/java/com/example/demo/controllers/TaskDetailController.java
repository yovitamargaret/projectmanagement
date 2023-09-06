package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entities.TaskDetail;
import com.example.demo.services.TaskDetailService;

@Controller
@RequestMapping("task_detail")
public class TaskDetailController {
    @Autowired
    private TaskDetailService taskDetailService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("tasks",taskDetailService.Get());
        return "task_detail/index";
    }

    @GetMapping(value = {"form","form/{id}"})
    public String form(Model model, @PathVariable(required = false) Integer id){
        if(id !=null){
            model.addAttribute("task_detail", taskDetailService.Get(id));
        }else{
            model.addAttribute("task_detail", new TaskDetail());
        }
        return "task_detail/form";
    }


    @PostMapping("save")
    public String submit(TaskDetail task_detail){
        Boolean result = taskDetailService.Save(task_detail);
        if(result){
            return "redirect:/task_detail";
        }else{
            return "task_detail/form";
        }
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable(required = true) Integer id){
        taskDetailService.Delete(id);
        return "redirect:/task_detail";
    }
}
