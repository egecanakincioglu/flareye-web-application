package com.flareye.authenticationservice.controllers;

import com.flareye.authenticationservice.dto.RegisterRequest;
import com.flareye.authenticationservice.models.Role;
import com.flareye.authenticationservice.models.User;
import com.flareye.authenticationservice.services.UserService;
import com.flareye.authenticationservice.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService; // Yeni: Role atamak için eklendi

    @Autowired
    private PasswordEncoder passwordEncoder; // Yeni: Şifre şifreleme için eklendi

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        Optional<User> existingUser = userService.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Bu e-posta adresi zaten kayıtlı!");
        }

        // Yeni kullanıcı oluştur
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Şifreyi hashle

        // Varsayılan olarak ROLE_USER rolü ata
        Role userRole = roleService.findByName("ROLE_USER").orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName("ROLE_USER");
            return roleService.saveRole(newRole);
        });

        user.setRoles(Set.of(userRole)); // Kullanıcıya rol ekleme

        userService.saveUser(user);
        return ResponseEntity.ok("Kullanıcı başarıyla kaydedildi!");
    }
}