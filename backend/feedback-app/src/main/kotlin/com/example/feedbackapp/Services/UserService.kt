package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import java.sql.ResultSet


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
        val query = "SELECT id, username, password FROM \"user\" WHERE username = ? AND password = ?"
        val result = db.query (query, UserRowMapper(), user, pass);
        return result.isNotEmpty()
    }

    /** Transform database row information into a User object **/
    class UserRowMapper: RowMapper<User> {
        override fun mapRow(rs: ResultSet, rowNum: Int): User? {
            return User(rs.getInt(1), "", "", "");
        }
    }
}