package com.example.demo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>{
    @Query(value = "select e.employee_id from tb_m_employee e where e.email = ?1", nativeQuery = true)
    public Integer findIdByEmail(String email);
}
