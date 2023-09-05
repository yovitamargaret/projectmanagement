package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer>{
    @Query(value = "select t.task_id from Task t where t.name = ?1 and t.project.project_id = ?2 and t.description =?3")
    public Integer findIdByAll(String name, Integer project_id, String description);
    @Query(value = "select max(t.task_id) from Task t")
    public Integer findLastId();
}
