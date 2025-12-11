package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import java.util.List;
import java.util.UUID;

import java.time.Instant;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            return userRepository.save(existingUser);
        }
        return null;
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        String token = UUID.randomUUID().toString();
        long expiry = Instant.now().plusSeconds(3600).toEpochMilli(); // 1 hour expiry
        user.setResetToken(token);
        user.setResetTokenExpiry(expiry);
        userRepository.save(user);
        return token;
    }

    public boolean validateResetToken(String token) {
        User user = userRepository.findByResetToken(token);
        if (user == null) {
            return false;
        }
        long now = Instant.now().toEpochMilli();
        return user.getResetTokenExpiry() != null && user.getResetTokenExpiry() > now;
    }

    public boolean resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token);
        if (user == null) {
            return false;
        }
        long now = Instant.now().toEpochMilli();
        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry() < now) {
            return false;
        }
        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
        return true;
    }

    public User getUserByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }
}
