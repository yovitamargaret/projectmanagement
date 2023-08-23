package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Team;
import com.example.demo.repositories.TeamRepository;

@Service
public class TeamServiceImpl implements TeamService{

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public List<Team> Get() {
        return teamRepository.findAll();
    }

    @Override
    public Team Get(Integer id) {
        return teamRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Boolean Save(Team model) {
        teamRepository.save(model);
        return teamRepository.findById(model.getTeam_id()).isPresent();
    }

    @Override
    public Boolean Delete(Integer id) {
        teamRepository.deleteById(id);
        return !teamRepository.findById(id).isPresent();
    }


    
}
