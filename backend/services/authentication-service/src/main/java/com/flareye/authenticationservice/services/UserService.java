package com.flareye.authenticationservice.services;

import com.flareye.authenticationservice.models.User;
import com.flareye.authenticationservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        // 🔴 Hata: Burada tekrar şifre hashleme YAPILMAMALI!
        System.out.println("Kayıt edilen şifre (hashlenmiş olarak alındı): " + user.getPassword());

        return userRepository.save(user);
    }
}