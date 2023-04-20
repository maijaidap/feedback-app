package com.example.feedbackapp.controllers

import com.example.feedbackapp.Security.JwtResponse
import com.example.feedbackapp.Security.JwtUtils
import com.example.feedbackapp.models.User
import com.example.feedbackapp.services.UserDetailsImpl
import com.example.feedbackapp.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

/**
 * This is the UserController class that handles HTTP requests related to users. It has endpoints for registering and
 * authenticating users, as well as checking access for admin and public users. This class uses Spring Security to
 * manage user authentication and authorization. It includes an AuthenticationManager to authenticate user credentials,
 * a JwtUtils class to generate and validate JWT tokens, and a PasswordEncoder to securely hash user passwords.
 */
@CrossOrigin("*")
@RestController
class UserController (private val userService: UserService) {

    /** The authentication manager is used to authenticate a user based on their credentials **/
    @Autowired
    var authenticationManager: AuthenticationManager? = null

    /** JwtUtils class is used to generate and validate JWT tokens **/
    @Autowired
    var jwtUtils: JwtUtils? = null

    /** The service that handles user management **/
    @Autowired
    private val service: UserService? = null

    @PostMapping("/register")
    fun register(@RequestBody user: User): Boolean {
        return userService.register(user.name, user.password)
    }

    @PostMapping("/login")
    fun authenticateUser(@RequestBody user: User): ResponseEntity<*>? {
        val authentication: Authentication = authenticationManager!!.authenticate(
            UsernamePasswordAuthenticationToken(user.name, user.password)
        )

        SecurityContextHolder.getContext().authentication = authentication
        val jwt: String = jwtUtils!!.generateJwtToken(authentication)
        val userDetails = authentication.principal as UserDetailsImpl
        println(jwt)
        return ResponseEntity.ok<Any>(
            JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.username,
                null
            )
        )
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    fun adminAccess(): String? {
        return "Admin"
    }

    @GetMapping("/public")
    fun publicAccess(): String? {
        return "Public"
    }
}
