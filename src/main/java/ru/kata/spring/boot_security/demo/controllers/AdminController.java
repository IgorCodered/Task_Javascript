package ru.kata.spring.boot_security.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/userInfo")
    public User admin(Principal principal) {
        return userService.findByUsername(principal.getName());
    }

    @GetMapping("/allRoles")
    public List<Role> getAllRoles() {
        return roleService.findAll();
    }

    @GetMapping("/allUsers")
    public List<User> allUser() {
        return (List<User>) userService.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<HttpStatus> create(@RequestBody User user) {
        userService.saveUser(user, user.getRoles().toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/edit/")
    public ResponseEntity<HttpStatus> editUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> findUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
    }
}
