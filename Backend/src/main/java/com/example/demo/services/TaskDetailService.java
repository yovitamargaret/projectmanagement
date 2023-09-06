package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.TaskDetail;
import com.example.demo.services.generic.GenericService;

public interface TaskDetailService extends GenericService<TaskDetail,Integer>{
    public List<TaskDetail> findByProjectId(Integer project_id);
}
