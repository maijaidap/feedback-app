package com.example.feedbackapp.controllers

import com.example.feedbackapp.models.User
import com.example.feedbackapp.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class UserController (private val userService: UserService) {
    @Autowired
    private val service: UserService? = null

   /** @GetMapping("/")
    fun index(): List<User> = service!!.findUsers()**/


   @CrossOrigin
    @GetMapping("/users")
    fun getUsers(): List<User> {
        return userService.getUsers()
    }

   /** @PostMapping("/")
    fun post(@RequestBody user: User) {
        service!!.save(user)
    }**/
}
