package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


enum class UserRole {
    ADMIN,
    BASIC
}

@Service
class UserService(val db: JdbcTemplate) {
    @Autowired
    private val passwordEncoder: PasswordEncoder? = null

    fun login(user: String, pass: String): Boolean {
        val query = "SELECT id FROM \"user\" WHERE username = ?"
        val id = db.query(query, { rs, _ ->
            rs.getInt("id")
        }, user)[0]

        if(id > 0) {
            return checkPassword(id, pass)
        }
        return false
    }

    fun register(user: String, pass: String): Boolean {
        val insertQuery = "INSERT INTO \"user\" (username, password, role) VALUES (?, ?, ?)"
        if(usernameIsTaken(user)){
            return false
        }

        // User data to the database, password encryption with BCrypt
        db.update(insertQuery, user, passwordEncoder?.encode(pass), UserRole.BASIC.name)
        return true
    }

    fun usernameIsTaken(username: String): Boolean {
        val query = "SELECT id FROM \"user\" WHERE username = ?"
        val result = db.query(query, { rs, _ ->
            User(
                rs.getInt("id"),
                "","",""
            )
        }, username)

        if (result.isEmpty()){
            return false
        }
        return true
    }

    fun checkPassword(id: Int, password: String): Boolean {
        val query = "SELECT password FROM \"user\" WHERE id = ?"
        val dbPassword = db.query(query, { rs, _ ->
            rs.getString("password")
        }, id)[0]

        // Encrypting the input password and compare it to the one in the database
        return passwordEncoder?.matches(password, dbPassword) ?: false
    }
}