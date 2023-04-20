package com.example.feedbackapp.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

/**
 * Represents a Review object.
 * This class is annotated with Spring's @Table annotation to specify the name of the table in the database
 * where Review objects will be persisted.
*/
@Table(name = "review")
data class Review(@Id var id: Int, var grade: Int, var written_review: String, val date_written: String,
                  var item_id: Int, var user_id: Int)


