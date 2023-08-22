package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.ForgotPasswordRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entities.Department;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;

@Service
public class AccountServiceImpl implements AccountService{
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public Boolean register(RegisterRequest registerRequest) {
        Employee employee =new Employee();
        employee.setEmail(registerRequest.getEmail());
        employee.setName(registerRequest.getName());
        employee.setPhonenumber(null);
        employee.setAddress(null);
        Department dept = new Department();
        dept.setDepartment_id(1);
        employee.setDepartment(dept);
        employee.setManager_id(null);
        employee.setJoindate(null);
        // insert to employee
        Boolean resultEmployee= employeeService.Save(employee);
        if (resultEmployee) {
            // insert to user
            Integer employee_id = employeeService.findIdByEmail(registerRequest.getEmail());
            User user = new User();
            user.setUser_id(employee_id);
            Role role=new Role();
            role.setRole_id(1);
            user.setRole(role);
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            Boolean resultUser=userService.Save(user);
            return resultUser;
        }
        return resultEmployee;
    }

    @Override
    public Boolean changePassword(ChangePasswordRequest changePasswordRequest) {
        Integer employee_id = employeeService.findIdByEmail(changePasswordRequest.getEmail());
        User user = new User();
        userService.Get(employee_id);
        if (employee_id != null && passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            Boolean resultUser=userService.Save(user);
            return resultUser;
        }

        return false;
    }

    @Override
    public Boolean resetPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Integer employee_id = employeeService.findIdByEmail(forgotPasswordRequest.getEmail());
        User user = new User();
        userService.Get(employee_id);
        if(employee_id == null){
            return false;
        }

        String newPassword = generateRandomPassword();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        Boolean resultUser=userService.Save(user);
        
        return resultUser;
    }

    private String generateRandomPassword() {
        return "pasword12345";
    }

    }

 


    

