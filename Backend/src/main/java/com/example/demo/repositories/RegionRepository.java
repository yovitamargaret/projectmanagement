package com.example.demo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region,Integer>{
}