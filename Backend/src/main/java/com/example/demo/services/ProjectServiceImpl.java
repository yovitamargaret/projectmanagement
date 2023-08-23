package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Project;
import com.example.demo.repositories.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> Get() {
        return projectRepository.findAll();
    }

    @Override
    public Project Get(Integer id) {
        return projectRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Project model) {
        projectRepository.save(model);
        return projectRepository.findById(model.getProject_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        projectRepository.deleteById(id);
        return !projectRepository.findById(id).isPresent();
    }
    
}
