package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*
import org.springframework.jdbc.core.JdbcTemplate

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

    fun test(): String {
        return db.queryForList("SELECT * FROM \"user\"").toString()
    }

    /**fun save(user: User){
        val id = user.id ?: UUID.randomUUID().toString()
        db.update("insert into user values ( ?, ? )",
            id, user.name)
    }**/
}