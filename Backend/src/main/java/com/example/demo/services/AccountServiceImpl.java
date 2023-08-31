package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.ForgotPasswordRequest;
import com.example.demo.dto.RegisterRequest;
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
        Employee employee = new Employee();
        employee.setName(registerRequest.getName());
        employee.setEmail(registerRequest.getEmail());
        employee.setAddress(registerRequest.getAddress());
        employee.setPhone_number(registerRequest.getPhone_number());
        Integer employeeId = employeeService.findIdByEmail(registerRequest.getEmail());
        if (employeeId == null) {
            Boolean resultEmployee= employeeService.Save(employee);
            if (resultEmployee) {
                employeeId = employeeService.findIdByEmail(registerRequest.getEmail());
                User user = new User();
                user.setUser_id(employeeId);
                Role role = new Role();
                role.setRole_id(1);
                user.setRole(role);
                user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

                Boolean resultUser = userService.Save(user);
                return resultUser;
            }
            return resultEmployee;
        }
        else {
            return false;
        }
    }

    @Override
    public Boolean changePassword(ChangePasswordRequest changePasswordRequest) {
        Integer employee_id = employeeService.findIdByEmail(changePasswordRequest.getEmail());
        User user = new User();
        userService.Get(employee_id);
        if (employee_id != null && passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            Boolean resultUser = userService.Save(user);
            return resultUser;
        }

        return false;
    }

    @Override
    public Boolean resetPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Integer employee_id = employeeService.findIdByEmail(forgotPasswordRequest.getEmail());
        
        if(employee_id == null){
            return false;
        }

        User user = userService.Get(employee_id);
        String newPassword = resetPassword();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        Boolean resultUser = userService.Save(user);
        
        return resultUser;
    }

    private String resetPassword() {
        return "password12345";
    }
}

 


    

