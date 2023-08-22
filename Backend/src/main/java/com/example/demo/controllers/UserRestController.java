package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.ForgotPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.handler.Response;
import com.example.demo.services.AccountService;

@RestController
@RequestMapping("api")
public class UserRestController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AccountService accountService;
    @PostMapping("user/login")
    public ResponseEntity<Object> login( @RequestBody LoginRequest loginValue){
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                loginValue.getEmail(), loginValue.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        if (authentication.isAuthenticated()) {
            return Response.generate(HttpStatus.OK, "Login Successful");
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
    // @PostMapping("user/forgot")
    // public String forgotPassword(){
    //     return "";
    // }

    @PostMapping("user/forgot")
    public ResponseEntity<Object> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        Boolean result = accountService.resetPassword(forgotPasswordRequest);

        if (result) {
            return Response.generate(HttpStatus.OK, "Password reset successful");
        }
        
        return Response.generate(HttpStatus.BAD_REQUEST, "Failed to reset password");
    }

    @PostMapping("profile/changePassword")
        public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
            boolean changed = accountService.changePassword(changePasswordRequest);

            if (changed) {
                return Response.generate(HttpStatus.OK, "Password changed successfully");
            }
            
            return Response.generate(HttpStatus.BAD_REQUEST, "Failed to change password");
        }
    
}




