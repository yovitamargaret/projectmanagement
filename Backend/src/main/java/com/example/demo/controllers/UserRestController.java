package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.ForgotPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserInfo;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.handler.Response;
import com.example.demo.services.AccountService;
import com.example.demo.services.EmployeeService;
import com.example.demo.services.RoleService;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin
public class UserRestController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AccountService accountService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @PostMapping("user/login")
    public ResponseEntity<Object> login( @RequestBody LoginRequest loginValue){
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                loginValue.getEmail(), loginValue.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        if (authentication.isAuthenticated()) {
            UserInfo userInfo = new UserInfo();
            
            Employee employee = employeeService.Get(employeeService.findIdByEmail(loginValue.getEmail()));
            User user = userService.Get(employee.getEmployee_id());
            Role role = roleService.Get(user.getRole().getRole_id());

            userInfo.setEmployee_name(employee.getName());
            userInfo.setEmail((employee.getEmail()));
            userInfo.setRole_name(role.getName());
            userInfo.setRole_level(role.getLevel());

            return Response.generate(HttpStatus.OK, "Login Successful", userInfo);
        }
        return Response.generate(HttpStatus.UNAUTHORIZED, "Login Gagal");
        
    }

    @PostMapping("user/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest){
        Boolean result = accountService.register(registerRequest);
        if (result) {
            return Response.generate(HttpStatus.OK, "Data Berhasil disimpan");
        }
        return Response.generate(HttpStatus.INTERNAL_SERVER_ERROR, "Data Gagal disimpan");
    }

    @PostMapping("user/forgot")
    public ResponseEntity<Object> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        Boolean result = accountService.resetPassword(forgotPasswordRequest);

        if (result) {
            return Response.generate(HttpStatus.OK, "Password reset successful");
        }
        
        return Response.generate(HttpStatus.BAD_REQUEST, "Failed to reset password");
    }

    @PostMapping("profile/changepassword")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        boolean changed = accountService.changePassword(changePasswordRequest);
        if (changed) {
            return Response.generate(HttpStatus.OK, "Password changed successfully");
        }
        
        return Response.generate(HttpStatus.BAD_REQUEST, "Failed to change password");
    }
}




