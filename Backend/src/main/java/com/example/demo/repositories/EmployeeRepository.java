package com.example.demo.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>{
    @Query(value = "select e.employee_id from tb_m_employee e where e.email = ?1", nativeQuery = true)
    public Integer findIdByEmail(String email);
    @Query(value = "select e.* from tb_m_employee e "+
    "join tb_tr_project p on p.team_id = e.team_id where p.project_id = ?1", nativeQuery = true)
    public List<Employee> findManyByProject(Integer project_id);
}
