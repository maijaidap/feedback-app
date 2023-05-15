package com.example.feedbackapp.Security

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException


/**
 * This class is a filter that intercepts incoming requests and checks if they contain a valid JWT token in their headers.
 * If a valid token is found, it extracts the username from the token and sets the user's authentication details in the
 * SecurityContextHolder. This allows the user to be authenticated and authorized for accessing protected resources.
 */
class AuthTokenFilter : OncePerRequestFilter() {
    @Autowired
    private val jwtUtils: JwtUtils? = null

    @Autowired
    private val userDetailsService: UserDetailsService? = null

    /**
     * Intercept incoming requests and checks if they contain a valid JWT token in their headers.
     * If a valid token is found, it extracts the username from the token and sets the user's authentication details in the
     * SecurityContextHolder.
     */
    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            // Parse the JWT token from the request
            val jwt = parseJwt(request)

            // Check if the JWT token is valid and not expired
            if (jwt != null && jwtUtils!!.validateJwtToken(jwt)) {
                // Extract the username from the JWT token
                val username = jwtUtils.getUserNameFromJwtToken(jwt)

                // Load user details from the userDetailsService based on the username
                val userDetails: UserDetails = userDetailsService!!.loadUserByUsername(username)

                // Create an authentication object with the user details and granted authority
                val authority: GrantedAuthority = SimpleGrantedAuthority("myAuthority")
                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails.username,
                    userDetails.password,
                    userDetails.authorities
                )

                // Set additional details for the authentication object
                authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

                // Set the authentication object in the security context
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: Exception) {
            // Log an error if user authentication cannot be set
            Companion.logger.error("Cannot set user authentication: {}", e)
        }
        filterChain.doFilter(request, response)
    }

    /**
     * Parses the Authorization header of the incoming request and returns the JWT token.
     */
    private fun parseJwt(request: HttpServletRequest): String? {
        // Get the value of the Authorization header from the request
        val headerAuth = request.getHeader("Authorization")

        // Check if the header value is not empty and starts with "Bearer "
        // If true, extract and return the JWT token
        return if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            headerAuth.substring(7, headerAuth.length)
        } else null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(AuthTokenFilter::class.java)
    }

}