package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OvertimeStatus;
import com.example.demo.repositories.OvertimeStatusRepository;

@Service
public class OvertimeStatusServiceImpl implements OvertimeStatusService {

    @Autowired
    private OvertimeStatusRepository overtimeStatusRepository;

    @Override
    public List<OvertimeStatus> Get() {
        return overtimeStatusRepository.findAll();
    }

    @Override
    public OvertimeStatus Get(Integer id) {
        return overtimeStatusRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(OvertimeStatus model) {
        overtimeStatusRepository.save(model);
        return overtimeStatusRepository.findById(model.getStatus_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        overtimeStatusRepository.deleteById(id);
        return !overtimeStatusRepository.findById(id).isPresent();
    }

}
