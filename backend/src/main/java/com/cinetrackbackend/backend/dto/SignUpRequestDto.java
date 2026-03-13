package com.cinetrackbackend.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequestDto {

    @NotBlank(message = "Username is Required")
    @Size(min = 5, message = "Username must contain atleast 5 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 7, message = "Password must be of atleast 7 characters")
    private String password;
}
