package com.bosch.example.impl.security;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.services.CryptographyService;

public class ImplCryptographyService implements CryptographyService {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(11);

    @Override
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public Boolean verifyPassword(String password, String hashedPassword) {
        if(!passwordEncoder.matches(password, hashedPassword)) {
            throw new NotFoundException();
        }
        return true;
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
