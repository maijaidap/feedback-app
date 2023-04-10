package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

enum class UserRole {
    ADMIN,
    BASIC
}

@Service
class UserService(val db: JdbcTemplate) {
    fun getUsers(): List<User> {
        return db.query("SELECT id, username, password, role FROM \"user\"") { rs, _ ->
            User(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("role"),
            )
        }
    }

    fun login(user: String, pass: String): Boolean {
        val query = "SELECT id FROM \"user\" WHERE username = ? AND password = ?"
        val result = db.query(query, { rs, _ ->
            User(
                rs.getInt("id"),
                "","",""
            )
        }, user, pass)
        return result.isNotEmpty()
    }

    fun register(user: String, pass: String): Boolean {
        val insertQuery = "INSERT INTO \"user\" (username, password, role) VALUES (?, ?, ?)"
        if(usernameIsTaken(user)){
            return false
        }
        db.update(insertQuery, user, pass, UserRole.BASIC.name)
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
}