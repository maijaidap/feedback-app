package com.example.feedbackapp.services

import com.example.feedbackapp.models.Item
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class ItemService(val db: JdbcTemplate) {

    fun getItems(): List<Any> {
        val query = " SELECT i.name, ROUND(AVG(r.grade), 1) AS avgGrade, COUNT(r.id) AS reviewsDone" +
                " FROM item i" +
                " LEFT JOIN review r ON i.id = r.item_id" +
                " GROUP BY i.id;"
        
        val result = db.queryForList(query)
        result.forEach { rec -> println(rec) }

        return result
    }
}