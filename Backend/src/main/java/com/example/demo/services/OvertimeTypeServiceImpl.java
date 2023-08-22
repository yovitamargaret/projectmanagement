package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OvertimeType;
import com.example.demo.repositories.OvertimeTypeRepository;

@Service
public class OvertimeTypeServiceImpl implements OvertimeTypeService {

    @Autowired
    private OvertimeTypeRepository overtimeTypeRepository;

    @Override
    public List<OvertimeType> Get() {
        return overtimeTypeRepository.findAll();
    }

    @Override
    public OvertimeType Get(Integer id) {
        return overtimeTypeRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(OvertimeType model) {
        overtimeTypeRepository.save(model);
        return overtimeTypeRepository.findById(model.getType_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        overtimeTypeRepository.deleteById(id);
        return !overtimeTypeRepository.findById(id).isPresent();
    }

}
