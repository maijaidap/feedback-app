package com.example.feedbackapp.controllers

import com.example.feedbackapp.models.Review
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

   /** @PostMapping("/addReview")
    fun addReview(@RequestBody user: User): Boolean {
        return reviewService.addReview(user.name, user.password)
    }**/

   @PostMapping("/getReviews")
   fun getReviews(@RequestBody reviewBody: ReviewBody): List<Any> {
       return reviewService.getReviews(reviewBody.itemId)
   }
}

class ReviewBody {
    val itemId: Int = 0
}
