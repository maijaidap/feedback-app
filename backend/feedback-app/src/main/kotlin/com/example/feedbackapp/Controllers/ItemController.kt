package com.example.feedbackapp.controllers

import com.example.feedbackapp.services.ItemService
import com.example.feedbackapp.models.Item
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

    @PostMapping("/getItemName")
    fun getItem(@RequestBody itemBody: ItemBody): String {
        return itemService.getItemName(itemBody.id)
    }
}

class ItemBody {
    val id: Int = 0
}

