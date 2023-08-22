package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> Get() {
        return userRepository.findAll();
    }

    @Override
    public User Get(Integer id) {
        return userRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(User model) {
        userRepository.save(model);
        return userRepository.findById(model.getUser_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        userRepository.deleteById(id);
        return !userRepository.findById(id).isPresent();
    }
    
}
