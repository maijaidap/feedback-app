package com.example.feedbackapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FeedbackAppApplication

fun main(args: Array<String>) {
	runApplication<FeedbackAppApplication>(*args)
}
