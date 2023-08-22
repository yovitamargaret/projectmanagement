package com.example.demo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.OvertimeType;

@Repository
public interface OvertimeTypeRepository extends JpaRepository<OvertimeType,Integer>{


}
