package com.example.feedbackapp.services

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class ItemService(val db: JdbcTemplate) {

    /**
     * Retrieves a list of items with their average grade and the number of reviews done.
     * The query performs a left join on the 'item' and 'review' tables and groups the results by item ID.
     */
    fun getItems(): List<Any> {
        val query = " SELECT i.id, i.name, ROUND(AVG(r.grade), 1) AS avgGrade, COUNT(r.id) AS reviewsDone" +
                " FROM item i" +
                " LEFT JOIN review r ON i.id = r.item_id" +
                " GROUP BY i.id;"

        return db.queryForList(query)
    }

    /**
     * Retrieves the name of an item based on its ID.
     * The query fetches the 'name' column from the 'item' table where the ID matches the provided parameter.
     */
    fun getItemName(itemId: Int): String {
        val query = " SELECT name " +
                " FROM item" +
                " WHERE id = ?;"

        val result = db.queryForList(query, itemId)

        return result[0]["Name"].toString()
    }
}