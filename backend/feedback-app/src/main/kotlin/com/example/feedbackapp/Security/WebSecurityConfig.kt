package com.example.feedbackapp.Security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.*


/**
 * Configuration class for setting up Spring Security.
 * Enables web security and sets up authentication and authorization for the application.
 * The class sets up an AuthenticationManager with the DaoAuthenticationProvider and sets up a SecurityFilterChain
 * with filters to check for JWT token in incoming requests, and authorizes requests based on URL patterns.
 * A BCryptPasswordEncoder is used for password encoding.
 */
@Configuration
@EnableWebSecurity
class WebSecurityConfig {

    @Autowired
    var userDetailsService: UserDetailsService? = null

    /** Set up the DaoAuthenticationProvider with the UserDetailsService and PasswordEncoder **/
    @Bean
    fun authenticationProvider(): DaoAuthenticationProvider? {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userDetailsService)
        authProvider.setPasswordEncoder(encoder())
        return authProvider
    }

    /** The AuthenticationManager is required to authenticate user credentials **/
    @Bean
    fun authenticationManager(authConfig: AuthenticationConfiguration): AuthenticationManager? {
        return authConfig.authenticationManager
    }

    /** Create a filter to check if an incoming request contains a valid JWT token in its header **/
    @Bean
    fun authenticationJwtTokenFilter(): AuthTokenFilter? {
        return AuthTokenFilter()
    }

    /**
     * Security filter chain that determines how incoming requests are handled.
     * - CSRF token is disabled which can make the application vulnerable to CSRF attacks
     * - HTTP requests are authorized based on URL patterns. Certain URLs like "/login", "/register", and "/getItems" are
     *   allowed for all while any other URL requires authentication
     * - Cross-Origin Resource Sharing (CORS) is enabled which may lead to security vulnerabilities if not configured correctly
     * - The authentication provider and JWT token filter are added to the filter chain
     */
    @Bean
    open fun filterChain(http: HttpSecurity): SecurityFilterChain {
        //TODO: Solve csrf-token problems in order to enable csrf
        http.csrf().disable()
        http.authorizeHttpRequests()
            .requestMatchers("/login").permitAll()
            .requestMatchers("/register").permitAll()
            .requestMatchers("/getItems").permitAll()
            .anyRequest().authenticated()

        http.logout().logoutUrl("/logout")
            .permitAll().logoutSuccessHandler((HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))

        http.authenticationProvider(authenticationProvider())
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)
        http.cors()

        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = Arrays.asList("*")
        configuration.allowedMethods = Arrays.asList("GET", "POST", "OPTIONS")
        configuration.allowedHeaders = Arrays.asList("*")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    /**
     * A password encoder bean that can be used to encode passwords before they are stored in the database.
     * Uses BCrypPassword encoder which is a password encoder implementation provided by Spring Security that encodes
     * passwords using bcrypt hashing algorithm.
     */
    @Bean
    fun encoder(): PasswordEncoder? {
        return BCryptPasswordEncoder()
    }
}