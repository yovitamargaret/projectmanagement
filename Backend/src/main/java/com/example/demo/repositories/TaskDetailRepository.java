package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.TaskDetail;

public interface TaskDetailRepository extends JpaRepository<TaskDetail,Integer>{
    @Query(value = "select td from TaskDetail td join td.task t where t.project.project_id = ?1")
    public List<TaskDetail> findAllByProjectId(Integer project_id);
    
}
