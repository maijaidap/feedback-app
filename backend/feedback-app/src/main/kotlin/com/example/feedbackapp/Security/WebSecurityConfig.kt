package com.example.feedbackapp.Security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class WebSecurityConfig {

    /**
     * Security filter chain that determines how incoming requests are handled.
     */
    @Bean
    open fun filterChain(http: HttpSecurity): SecurityFilterChain {
        //TODO: Solve csrf-token problems in order to enable csrf
        http.csrf().disable()
        http.authorizeHttpRequests()
            .requestMatchers("/login").permitAll()
            .requestMatchers("/register").permitAll()
            .anyRequest().authenticated()
        http.cors()

        return http.build()
    }


    /**
     * A password encoder bean that can be used to encode passwords before they are stored in the database.
     * Uses BCrypPassword encoder is a password encoder implementation provided by Spring Security that uses
     * the bcrypt hashing algorithm to encode passwords.
     */
    @Bean
    fun encoder(): PasswordEncoder? {
        return BCryptPasswordEncoder()
    }
}