package com.cinetrackbackend.backend.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.cinetrackbackend.backend.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class AuthUtil {

    @Value("${jwt.secretkey}")
    private String jwtSecretKey;

    private SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user){
        return Jwts.builder()
        .subject(user.getUsername())
        .claim("userId", user.getId().toString())
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 1000*60*10))
        .signWith(getSecretKey())
        .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
        .verifyWith(getSecretKey())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
    }
}
