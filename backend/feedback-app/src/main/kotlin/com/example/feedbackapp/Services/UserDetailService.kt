package com.example.feedbackapp.services
import com.example.feedbackapp.models.User
import org.springframework.beans.factory.annotation.Autowired

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * This class implements the UserDetailsService interface provided by Spring Security.
 * It is responsible for retrieving user details (like username, password, roles, etc.)
 * from the UserService class, which interacts with the database to fetch user information.
 * It uses the UserDetailsImpl class to build a UserDetails object from the User entity,
 * which is returned to Spring Security for authentication and authorization purposes.
 */
@Service
class UserDetailService : UserDetailsService {
    @Autowired
    private val userService: UserService? = null

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        // Find the user by username using the userService
        val user: User = userService?.findByUserName(username)
            ?: throw UsernameNotFoundException("User Not Found with username: $username")

        // Build and return a UserDetailsImpl instance based on the retrieved user
        return UserDetailsImpl.build(user)
    }
}