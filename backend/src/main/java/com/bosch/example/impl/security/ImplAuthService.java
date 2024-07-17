package com.bosch.example.impl.security;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.hibernate.query.sqm.sql.ConversionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.AuthTokenDto;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.InvalidPasswordException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.AuthService;
import com.bosch.example.services.CryptographyService;

public class ImplAuthService implements AuthService {

    @Autowired
    UserJpaRepository repoUser;

    @Autowired
    CryptographyService cryptographyService;

    @Autowired
    KeyPairManager keyPairManager = new KeyPairManager();

    Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) keyPairManager.getPublicKey(), (RSAPrivateKey) keyPairManager.getPrivateKey());

    @Override
    public ResponseEntity<AuthTokenDto> login(Long edv, String password) {
       
        UserData user = repoUser.findByEdv(edv).get(0);
        
        if (user == null) {
            throw new NotFoundException();
        }

        if (!cryptographyService.verifyPassword(password, user.getPassword())) {
            throw new InvalidPasswordException();
        }

        String token = createToken(user.getId(), user.getRole());

        try {
            AuthTokenDto auth = new AuthTokenDto(user.getRole(), token);
            return ResponseEntity.ok().body(auth); 
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }

    }

    @Override
    public DecodedJWT decode(String token) {
        DecodedJWT decodedJwt;
        
        try {
            JWTVerifier verifier = JWT.require(algorithm).withIssuer("blueTeam").build();
            decodedJwt = verifier.verify(token);

            return decodedJwt;

        } catch (JWTVerificationException e) {
            return null;
        }
    }

    public String createToken(Long id, UserRoleEnum role) {
        try {
            return JWT.create()
                    .withIssuer("blueTeam")
                    .withClaim("id", id)
                    .withClaim("role", role.name())
                    .sign(algorithm);
        } catch (JWTCreationException ex) {
            throw new ConversionException("Was not possible to create a jwt");
        }
    }
}
