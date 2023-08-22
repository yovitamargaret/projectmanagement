// package com.example.demo.services;

// import org.springframework.beans.factory.annotation.Autowired;

// import com.example.demo.entities.User;
// import com.example.demo.repositories.UserRepository;

// public class ForgotPasswordServiceImpl implements ForgotPasswordService {

//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public void initiatePasswordReset(String email) {
//         User user = userRepository.findByEmail(email);
//         if (user != null) {
//             user.setResetPasswordRequested(true);
//             userRepository.save(user);
//         }
//     }

//     @Override
//     public boolean resetPassword(String email, String newPassword) {
//         User user = userRepository.findByEmail(email);
//         if (user != null && user.isResetPasswordRequested()) {
//             user.setPassword(newPassword);
//             user.setResetPasswordRequested(false);
//             userRepository.save(user);
//             return true;
//         }
//         return false;
//     }
    
// }
