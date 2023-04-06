package com.example.feedbackapp.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table(name = "user")
data class User(@Id var id: Int, var name: String, var password: String, var role: String)
