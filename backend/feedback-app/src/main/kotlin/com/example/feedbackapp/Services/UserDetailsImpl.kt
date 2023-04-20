package com.example.feedbackapp.services

import com.example.feedbackapp.models.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl (
    private val id: Int, private val username: String, @field:JsonIgnore private val password: String, private val role: String,
    private val authorities: Collection<GrantedAuthority>
) : UserDetails {

    // This method returns the authorities (permissions) of the user.
    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    fun getId(): Int {
        return id
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    // This method creates a new UserDetailsImpl object from a User object.
    // It uses the id, name, password, role, and a single basic permission to create the UserDetailsImpl object.
    // Note that the password field is marked as @JsonIgnore to prevent it from being serialized and returned to API
    // responses, which would be a security risk.
    companion object {
        private const val serialVersionUID = 1L
        fun build(user: User): UserDetailsImpl {
            return UserDetailsImpl(
                user.id,
                user.name,
                user.password,
                user.role,
                listOf(GrantedAuthority { "BASIC" })
            )
        }
    }

    // This method checks whether the current UserDetailsImpl object is equal to another object.
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if ((other == null) || (javaClass != other.javaClass)) return false
        val user = other as UserDetailsImpl
        return id == user.id
    }

}