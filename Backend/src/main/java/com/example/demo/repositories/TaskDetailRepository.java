package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.TaskDetail;

public interface TaskDetailRepository extends JpaRepository<TaskDetail,Integer>{

}
