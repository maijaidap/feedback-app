package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class ReviewService(val db: JdbcTemplate,  val userService: UserService) {

    fun getReviews(itemid: Int): List<Any> {
        val query = " SELECT r.item_id, r.id, r.grade, r.written_review, r.date_written " +
                " FROM review AS r" +
                " WHERE r.item_id = ?;"

        return db.queryForList(query, itemid)
    }

    /**
     * Adds a review for an item.
     * Only users with the 'ROLE_USER' role are authorized to call this function.
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun addReview(grade: Int, writtenReview: String, itemId: Int): Boolean {

        // Retrieve the currently authenticated user
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val username: String = auth.principal as String
        val user: User? = userService.findByUserName(username)
        val userId = user?.id

        // Insert the review into the "review" table
        val insertQuery = "INSERT INTO \"review\" (grade, written_review, date_written, item_id, user_id) VALUES (?, ?, CURRENT_DATE, ?, ?)"

        db.update(insertQuery, grade, writtenReview, itemId, userId)
        return true
    }
}