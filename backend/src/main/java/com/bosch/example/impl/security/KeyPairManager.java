package com.bosch.example.impl.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;

import lombok.Getter;

@Getter
public class KeyPairManager {
    private PublicKey publicKey;

    private PrivateKey privateKey;

    public KeyPairManager(){
        KeyPairGenerator keyPairGenerator;
        try{
            keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            publicKey = keyPair.getPublic();
            privateKey = keyPair.getPrivate();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        

    }
}
