package com.example.feedbackapp.controllers

import com.example.feedbackapp.Security.JwtResponse
import com.example.feedbackapp.Security.JwtUtils
import com.example.feedbackapp.models.User

import com.example.feedbackapp.services.ItemService
import com.example.feedbackapp.services.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

/**
 * This is the ItemController class that handles HTTP requests related to items. It has endpoints for fetching items.
 */
@CrossOrigin("*")
@RestController
class ItemController (private val itemService: ItemService){

    @GetMapping("/getItems")
    fun getItems(): List<Any> {
        return itemService.getItems()
    }
}
