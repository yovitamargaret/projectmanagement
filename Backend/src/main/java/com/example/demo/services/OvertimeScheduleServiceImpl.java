package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OvertimeSchedule;
import com.example.demo.repositories.OvertimeScheduleRepository;

@Service
public class OvertimeScheduleServiceImpl implements OvertimeScheduleService {

    @Autowired
    private OvertimeScheduleRepository overtimeScheduleRepository;

    @Override
    public List<OvertimeSchedule> Get() {
        return overtimeScheduleRepository.findAll();
    }

    @Override
    public OvertimeSchedule Get(Integer id) {
        return overtimeScheduleRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(OvertimeSchedule model) {
        overtimeScheduleRepository.save(model);
        return overtimeScheduleRepository.findById(model.getSchedule_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        overtimeScheduleRepository.deleteById(id);
        return !overtimeScheduleRepository.findById(id).isPresent();
    }

}
