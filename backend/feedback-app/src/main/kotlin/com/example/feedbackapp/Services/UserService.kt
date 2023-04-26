package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


enum class UserRole {
    ADMIN,
    BASIC
}

@Service
class UserService(val db: JdbcTemplate) {

    private var passwordEncoder: PasswordEncoder? = null

    fun register(user: String, pass: String): Boolean {
        if (usernameIsTaken(user)) {
            return false
        }

        // User data to the database, password encryption with BCrypt
        val insertQuery = "INSERT INTO \"user\" (username, password, role) VALUES (?, ?, ?)"
        val passwordEncoder = BCryptPasswordEncoder()

        db.update(insertQuery, user, passwordEncoder.encode(pass), UserRole.BASIC.name)

        return true
    }

    fun usernameIsTaken(username: String): Boolean {
        val query = "SELECT id FROM \"user\" WHERE username = ?"
        val result = db.query(query, { rs, _ ->
            User(
                rs.getInt("id"),
                "", "", ""
            )
        }, username)

        if (result.isEmpty()) {
            return false
        }
        return true
    }

    fun findByUserName(username: String): User? {
        val query = "SELECT id, username, password, role FROM \"user\" WHERE username = ?"
        val user = db.query(query, { rs, _ ->
            User(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("role")
            )
        }, username)[0] ?: null

        return user
    }
}