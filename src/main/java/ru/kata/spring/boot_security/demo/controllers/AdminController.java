package ru.kata.spring.boot_security.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/admin")
    public String admin(ModelMap map, Principal principal) {
        map.addAttribute("users", userService.findAll());
        User userSession = userService.findByUsername(principal.getName());
        map.addAttribute("person", userSession);
        map.addAttribute("roles", roleService.findAll());
        return "admin";
    }

    @PostMapping("/create")
    public String create(@ModelAttribute("user") User user,
                         @ModelAttribute("roles") String role) {
        userService.saveUser(user, role);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @PutMapping("/admin/edit/{id}")
    public String postUpdate(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }
}
