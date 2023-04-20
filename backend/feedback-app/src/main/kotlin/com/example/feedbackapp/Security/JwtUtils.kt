package com.example.feedbackapp.Security


import com.example.feedbackapp.services.UserDetailsImpl
import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*

/**
 * This class provides utility functions for generating and validating JWT tokens for the FeedbackApp.
 * The class uses the io.jsonwebtoken library to generate and validate JWT tokens.
 * The JWT secret and expiration time are read from the application properties file.
 **/
@Component
class JwtUtils {
    /** Read JWT secret and expiration from application properties file **/
    @Value("\${feedbackapp.app.jwtSecret}")
    private val jwtSecret: String? = null

    @Value("\${feedbackapp.app.jwtExpirationMs}")
    private val jwtExpirationMs = 0

    /** Generate JWT token for user. The token is created by using the Jwts.builder() method provided by the io.jsonwebtoken library.
     * The token is signed using the HMAC-SHA512 algorithm with the jwtSecret key.
     * **/
    fun generateJwtToken(authentication: Authentication): String {
        val userPrincipal = authentication.principal as UserDetailsImpl
        return Jwts.builder()
            .setSubject(userPrincipal.username)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().time + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact()
    }

    /** Extract username from JWT token **/
    fun getUserNameFromJwtToken(token: String?): String {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).body.subject
    }

    /** Validate JWT token **/
    fun validateJwtToken(authToken: String?): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken)
            return true
        } catch (e: SignatureException) {
            logger.error("Invalid JWT signature: {}", e.message)
        } catch (e: MalformedJwtException) {
            logger.error("Invalid JWT token: {}", e.message)
        } catch (e: ExpiredJwtException) {
            logger.error("JWT token is expired: {}", e.message)
        } catch (e: UnsupportedJwtException) {
            logger.error("JWT token is unsupported: {}", e.message)
        } catch (e: IllegalArgumentException) {
            logger.error("JWT claims string is empty: {}", e.message)
        }
        return false
    }

    companion object {
        private val logger = LoggerFactory.getLogger(JwtUtils::class.java)
    }
}