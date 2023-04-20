package com.example.feedbackapp.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

/**
 * Represents a User object with their unique id, name, password, and role.
 * This class is annotated with Spring's @Table annotation to specify the name of the table in the database
 * where User objects will be persisted.
*/
@Table(name = "user")
data class User(@Id var id: Int, var name: String, var password: String, var role: String)


