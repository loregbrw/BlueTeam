package com.bosch.example.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.exception.InvalidAuthAttempt;
import com.bosch.example.services.AuthService;
import com.bosch.example.sessions.UserSession;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthFilter implements Filter {

    @Autowired
    UserSession userSession;

    @Autowired
    AuthService authService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        var auth = req.getHeader("auth");

        try{
            var decodedJwt = authService.decode(auth);
            var userId = decodedJwt.getClaim("id").asString();
            var userRole = decodedJwt.getClaim("role").asString();

            userSession.setId(Long.valueOf(userId));
            userSession.setRole(UserRoleEnum.valueOf(userRole));

        } catch (Exception e) {
            throw new InvalidAuthAttempt();
        } 
        chain.doFilter(req, res);
    }

}
