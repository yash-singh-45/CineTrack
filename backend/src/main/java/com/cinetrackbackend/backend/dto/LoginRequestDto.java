package com.cinetrackbackend.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {

    @NotNull
    private String username;
    
    @NotNull
    private String password;
}
