package com.example.feedbackapp.services

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class ItemService(val db: JdbcTemplate) {

    fun getItems(): List<Any> {
        val query = " SELECT i.id, i.name, ROUND(AVG(r.grade), 1) AS avgGrade, COUNT(r.id) AS reviewsDone" +
                " FROM item i" +
                " LEFT JOIN review r ON i.id = r.item_id" +
                " GROUP BY i.id;"

        return db.queryForList(query)
    }

    fun getItemName(itemId: Int): String {
        val query = " SELECT name " +
                " FROM item" +
                " WHERE id = ?;"

        val result = db.queryForList(query, itemId)

        return result[0].get("Name").toString()
    }
}