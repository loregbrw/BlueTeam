package com.bosch.example.impl.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.bosch.example.services.CryptographyService;

public class ImplCryptographyService implements CryptographyService {

    @Override
    public String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        try {
            MessageDigest saltDigest = MessageDigest.getInstance("SHA-256");
            saltDigest.update(salt);
        } catch (Exception e) {
            return null;
        }

        String StringSalt = Base64.getEncoder().encodeToString(salt);

        return StringSalt;
    }

    @Override
    public String hashPassword(String password, String salt) {
        String hashedPassword = password + salt;

        try {
            MessageDigest passDigest = MessageDigest.getInstance("SHA-256");
            byte[] hash = passDigest.digest(hashedPassword.getBytes(StandardCharsets.UTF_8));

            hashedPassword = Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            return null;
        }

        return hashedPassword + "$" + salt;
    }

    @Override
    public Boolean verifyPassword(String password, String hashedPassword) {
        String pass = hashedPassword.substring(0, hashedPassword.indexOf('$'));
        String salt = hashedPassword.substring(hashedPassword.indexOf('$') + 1, hashedPassword.length());

        String hashPassword = hashPassword(password, salt);

        if (hashPassword.equals(pass)) {
            return true;
        }

        return false;
    }

    @Override
    public Boolean isStrongPassword(String password) {

        if (password.length() < 8) {
            return false;
        }

        Matcher regexLowerCase = Pattern.compile("[a-z]").matcher(password);

        if (!regexLowerCase.find()) {
            return false;
        }

        Matcher regexUpperCase = Pattern.compile("[A-Z]").matcher(password);
        
        if (!regexUpperCase.find()) {
            return false;
        }

        Matcher regexNumber = Pattern.compile("\\d").matcher(password);
        
        if (!regexNumber.find()) {
            return false;
        }

        return true;
    }
    
}
