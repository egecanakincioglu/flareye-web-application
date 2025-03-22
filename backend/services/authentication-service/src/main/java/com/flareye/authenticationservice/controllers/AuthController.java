package com.flareye.authenticationservice.controllers;

import com.flareye.authenticationservice.dto.RegisterRequest;
import com.flareye.authenticationservice.models.User;
import com.flareye.authenticationservice.models.Role;
import com.flareye.authenticationservice.services.UserService;
import com.flareye.authenticationservice.services.RoleService;
import com.flareye.authenticationservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        Optional<User> existingUser = userService.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Bu e-posta adresi zaten kayıtlı!");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        System.out.println("Gelen Şifre (register): " + request.getPassword());
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        System.out.println("Hashlenmiş Şifre (register): " + encodedPassword);
        user.setPassword(encodedPassword);

        Role userRole = roleService.findByName("ROLE_USER").orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName("ROLE_USER");
            return roleService.saveRole(newRole);
        });

        user.setRoles(Set.of(userRole));

        userService.saveUser(user);
        return ResponseEntity.ok("Kullanıcı başarıyla kaydedildi!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegisterRequest request) {
        Optional<User> userOptional = userService.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz e-posta veya şifre!");
        }

        User user = userOptional.get();

        System.out.println("Gelen e-posta: " + request.getEmail());
        System.out.println("Gelen şifre: " + request.getPassword());
        System.out.println("Veritabanındaki hashlenmiş şifre: " + user.getPassword());

        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("Şifreler eşleşiyor mu? " + passwordMatch);

        if (!passwordMatch) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz e-posta veya şifre!");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of("token", token));
    }
}