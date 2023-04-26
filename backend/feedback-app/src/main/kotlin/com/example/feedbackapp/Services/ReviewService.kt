package com.example.feedbackapp.services

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


@Service
class ReviewService(val db: JdbcTemplate) {

    fun getReviews(itemid: Int): List<Any> {
        val query = " SELECT r.item_id, r.id, r.grade, r.written_review, r.date_written " +
                " FROM review AS r" +
                " WHERE r.item_id = ?;"

        val result = db.queryForList(query, itemid)
        result.forEach { rec -> println(rec) }
        println(result)

        return result
    }

    fun addReview(grade: Int, writtenReview: String, itemId: Int): Boolean {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val username: String = auth.principal as String

        val formatter = DateTimeFormatter.ofPattern("dd-MM-yy")
        val currentDate = LocalDateTime.now().format(formatter)
        val insertQuery = "INSERT INTO \"review\" (grade, written_review, date_written, item_id, user_id) VALUES (?, ?, ?, ?)"

        db.update(insertQuery, grade, writtenReview, currentDate, itemId)
        return true
    }
}