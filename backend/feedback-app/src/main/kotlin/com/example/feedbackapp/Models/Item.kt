package com.example.feedbackapp.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

/**
 * Represents a Item object with their unique id, name.
 * This class is annotated with Spring's @Table annotation to specify the name of the table in the database
 * where Item objects will be persisted.
*/
@Table(name = "item")
data class Item(@Id var id: Int, var name: String)


