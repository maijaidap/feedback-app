package com.example.feedbackapp.controllers

import com.example.feedbackapp.services.ReviewService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

/**
 * This is the ReviewController class that handles HTTP requests related to reviews.
 */
@CrossOrigin("*")
@RestController
class ReviewController (private val reviewService: ReviewService){

   @PostMapping("/addReview")
    fun addReview(@RequestBody review: AddReviewBody): Boolean {
       return reviewService.addReview(review.grade, review.written_review, review.item_id)
    }

   @PostMapping("/getReviews")
   fun getReviews(@RequestBody reviewBody: ReviewBody): List<Any> {
       return reviewService.getReviews(reviewBody.itemId)
   }
}

class ReviewBody {
    val itemId: Int = 0
}

class AddReviewBody {
    val grade: Int = 0
    val written_review: String = ""
    val item_id: Int = 0
}