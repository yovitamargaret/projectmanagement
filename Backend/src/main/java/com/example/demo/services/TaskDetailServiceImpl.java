package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.TaskDetail;
import com.example.demo.repositories.TaskDetailRepository;

@Service
public class TaskDetailServiceImpl implements TaskDetailService{
    @Autowired
    private TaskDetailRepository taskDetailRepository;

    @Override
    public List<TaskDetail> Get() {
        return taskDetailRepository.findAll();    
    }

    @Override
    public TaskDetail Get(Integer id) {
        return taskDetailRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(TaskDetail model) {
        taskDetailRepository.save(model);
        return taskDetailRepository.findById(model.getTask_detail_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        taskDetailRepository.deleteById(id);
        return !taskDetailRepository.findById(id).isPresent();
    }
    
}
