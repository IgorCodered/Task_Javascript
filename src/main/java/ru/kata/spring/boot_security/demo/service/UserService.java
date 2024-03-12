package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findByUsername(String username);

    void delete(Long id);

    void saveUser(User user, String role);

    void updateUser(User user);

    User findByEmail(String email);
}
