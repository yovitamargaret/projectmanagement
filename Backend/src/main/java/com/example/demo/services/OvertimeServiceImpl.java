package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Overtime;
import com.example.demo.repositories.OvertimeRepository;

@Service
public class OvertimeServiceImpl implements OvertimeService {

    @Autowired
    private OvertimeRepository overtimeRepository;

    @Override
    public List<Overtime> Get() {
        return overtimeRepository.findAll();
    }

    @Override
    public Overtime Get(Integer id) {
        return overtimeRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Overtime model) {
        overtimeRepository.save(model);
        return overtimeRepository.findById(model.getSubmission_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        overtimeRepository.deleteById(id);
        return !overtimeRepository.findById(id).isPresent();
    }

}
