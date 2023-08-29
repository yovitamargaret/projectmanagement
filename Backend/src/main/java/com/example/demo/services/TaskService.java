package com.example.demo.services;

import com.example.demo.entities.Task;
import com.example.demo.services.generic.GenericService;

public interface TaskService extends GenericService<Task,Integer>{
    public Integer findIdByAll(String name, Integer project_id, String description);
    public Integer findLastId();
}
