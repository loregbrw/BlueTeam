package com.bosch.example.impl.security;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.hibernate.query.sqm.sql.ConversionException;
import org.springframework.beans.factory.annotation.Autowired;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.AuthTokenDto;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.AuthService;

public class ImplAuthService implements AuthService{

    @Autowired
    UserJpaRepository repo;

    @Override
    public AuthTokenDto login(Long edv, String password) {
       // verification
       
       return null;
       
    }

    @Override
    public DecodedJWT decode(String token) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'decode'");
    }

    public String createToken(PublicKey publicKey, PrivateKey privateKey, Long id, UserRoleEnum role){
        try{
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) publicKey, (RSAPrivateKey) privateKey);
            
              return JWT.create()
                    .withIssuer("blueTeam")
                    .withClaim("id", id)
                    .withClaim("role", role.name())                   
                    .sign(algorithm);
        } catch (JWTCreationException ex){
            throw new ConversionException("Was not possible to create a jwt");
        }

    }
}
