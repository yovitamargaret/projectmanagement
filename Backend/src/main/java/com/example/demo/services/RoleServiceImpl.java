package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository repository;

    @Override
    public List<Role> Get() {
        return repository.findAll();
    }

    @Override
    public Role Get(Integer id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("User tidak ditemukan"));
    }

    @Override
    public Boolean Save(Role role) {
        repository.save(role);
        return repository.findById(role.getRole_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        repository.deleteById(id);
        return !repository.findById(id).isPresent();
    }

    
}
