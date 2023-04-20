package com.example.feedbackapp.Security

/**
 * This class represents the response returned to the client upon successful authentication and authorization,
 * containing a JWT access token, user id, username, and user roles.
 *
 * @property accessToken The JWT access token for the authenticated user.
 * @property id The user id of the authenticated user.
 * @property username The username of the authenticated user.
 * @property roles The user roles of the authenticated user.
 * @property tokenType The type of the access token. This is typically set to "Bearer".
 */
class JwtResponse(
    var accessToken: String,
    var id: Int,
    var username: String,
    val roles: List<String>?
) {
    var tokenType = "Bearer"

}