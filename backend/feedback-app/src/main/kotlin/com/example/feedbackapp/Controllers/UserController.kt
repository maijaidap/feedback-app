package com.example.feedbackapp.controllers

import com.example.feedbackapp.models.User
import com.example.feedbackapp.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*


@CrossOrigin
@RestController
class UserController (private val userService: UserService) {
    @Autowired
    private val service: UserService? = null

    @GetMapping("/users")
    fun getUsers(): List<User> {
        return userService.getUsers()
    }

    @PostMapping("/login")
    fun login(@RequestBody user: User): Boolean {
        return userService.login(user.name, user.password)
    }

    @PostMapping("/register")
    fun register(@RequestBody user: User): Boolean {
        return userService.register(user.name, user.password)
    }
}
