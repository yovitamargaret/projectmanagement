package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Task;
import com.example.demo.repositories.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> Get() {
        return taskRepository.findAll();
    }

    @Override
    public Task Get(Integer id) {
        return taskRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Task model) {
        taskRepository.save(model);
        return taskRepository.findById(model.getTask_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        taskRepository.deleteById(id);
        return !taskRepository.findById(id).isPresent();
    }
    
}
