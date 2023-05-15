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

    /** Set up the DaoAuthenticationProvider with the UserDetailsService and PasswordEncoder
     * This configuration ensures that the authentication process in the application uses the UserDetailsService to
     * load user details and the specified PasswordEncoder for password encoding and comparison.
     */
    @Bean
    fun authenticationProvider(): DaoAuthenticationProvider? {
        // Create a new instance of DaoAuthenticationProvider
        val authProvider = DaoAuthenticationProvider()

        // Set the PasswordEncoder implementation to encode and compare passwords
        authProvider.setUserDetailsService(userDetailsService)

        // Return the configured DaoAuthenticationProvider
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
     * - HTTP requests are authorized based on URL patterns. Certain URLs like "/login", "/register", and "/getItems" are
     *   allowed for all while any other URL requires authentication
     */
    @Bean
    open fun filterChain(http: HttpSecurity): SecurityFilterChain {
        // Disable CSRF protection (TODO: Solve csrf-token problems in order to enable CSRF)
        http.csrf().disable()

        // Configure authorization rules for incoming HTTP requests
        http.authorizeHttpRequests()
            .requestMatchers("/login").permitAll()
            .requestMatchers("/register").permitAll()
            .requestMatchers("/getItems").permitAll()
            .requestMatchers("/getReviews").permitAll()
            .requestMatchers("/getItemName").permitAll()
            .anyRequest().authenticated()

        // Configure logout settings
        http.logout().logoutUrl("/logout")
            .permitAll().logoutSuccessHandler((HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))

        // Configure authentication provider
        http.authenticationProvider(authenticationProvider())

        // Add custom authentication JWT token filter
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)

        // Enable Cross-Origin Resource Sharing (CORS)
        http.cors()

        // Build and return the configured SecurityFilterChain
        return http.build()
    }

    /**
     * Configures a CorsConfigurationSource bean for CORS (Cross-Origin Resource Sharing) settings.
     * This allows cross-origin requests from all origins, with permitted methods of GET, POST, and OPTIONS,
     * and allows all headers to be included in the request.
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        // Create a new CorsConfiguration instance
        val configuration = CorsConfiguration()

        // Set the allowed origins for cross-origin requests
        configuration.allowedOrigins = listOf("*")

        // Set the allowed HTTP methods
        configuration.allowedMethods = listOf("GET", "POST", "OPTIONS")

        // Set the allowed headers
        configuration.allowedHeaders = listOf("*")
        val source = UrlBasedCorsConfigurationSource()

        // Register the CorsConfiguration with the source for all URL patterns
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