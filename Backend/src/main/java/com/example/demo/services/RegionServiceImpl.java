package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Region;
import com.example.demo.repositories.RegionRepository;

@Service
class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public List<Region> Get() {
        return regionRepository.findAll();
    }

    @Override
    public Region Get(Integer region_id) {
        return regionRepository.findById(region_id).orElseThrow((null));
    }

    @Override
    public Boolean Save(Region model) {
        regionRepository.save(model);
        return regionRepository.findById(model.getRegion_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer region_id) {
        regionRepository.deleteById(region_id);
        return !regionRepository.findById(region_id).isPresent();
    }


    
}
