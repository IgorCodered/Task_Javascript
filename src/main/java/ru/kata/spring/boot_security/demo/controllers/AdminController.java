package ru.kata.spring.boot_security.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    private final static Logger logger = Logger.getLogger("AdminController");

    @GetMapping("/userInfo")
    public ResponseEntity<User> admin(Principal principal) {
        User userSession = userService.findByUsername(principal.getName());
        return new ResponseEntity<>(userSession, HttpStatus.OK);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> allUser() {
        logger.log(Level.INFO, "Загружены пользователи в основную таблицу");
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public String create(@ModelAttribute("user") User user,
                         @ModelAttribute("roles") String role) {
        userService.saveUser(user, role);
        return "redirect:/admin";
    }

    @PutMapping("/edit/")
    public ResponseEntity<HttpStatus> editUser(@RequestBody User user) {

        logger.log(Level.INFO,"Имя JSON пользователя " + user.getFirstName());
        logger.log(Level.INFO,"Фамилия JSON пользователя " + user.getLastName());
        logger.log(Level.INFO,"Email JSON пользователя " + user.getEmail());

        userService.updateUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> postUpdate(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
    }
}
