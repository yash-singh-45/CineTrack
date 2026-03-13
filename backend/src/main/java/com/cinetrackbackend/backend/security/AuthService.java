package com.cinetrackbackend.backend.security;


import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinetrackbackend.backend.dto.LoginRequestDto;
import com.cinetrackbackend.backend.dto.LoginResponseDto;
import com.cinetrackbackend.backend.dto.SignUpRequestDto;
import com.cinetrackbackend.backend.dto.SignUpResponseDto;
import com.cinetrackbackend.backend.entity.User;
import com.cinetrackbackend.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;

    public SignUpResponseDto register(SignUpRequestDto requestuser) {
        if (userRepository.existsByUsername(requestuser.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
    
        User newUser = modelMapper.map(requestuser, User.class);
        newUser.setPassword(passwordEncoder.encode(requestuser.getPassword()));

        User user = userRepository.save(newUser);
        return modelMapper.map(user, SignUpResponseDto.class);
    }

    public LoginResponseDto login(LoginRequestDto request) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String token = authUtil.generateAccessToken(user);

        return new LoginResponseDto(token, user.getId());
    }

}
