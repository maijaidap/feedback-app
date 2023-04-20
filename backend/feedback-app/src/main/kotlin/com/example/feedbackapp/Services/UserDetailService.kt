package com.example.feedbackapp.services
import com.example.feedbackapp.models.User
import org.springframework.beans.factory.annotation.Autowired

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserDetailService : UserDetailsService {
    @Autowired
    private val userService: UserService? = null

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userService?.findByUserName(username)
            ?: throw UsernameNotFoundException("User Not Found with username: $username")

        return UserDetailsImpl.build(user)
    }
}