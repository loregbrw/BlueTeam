package com.bosch.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

import com.bosch.example.filters.AuthFilter;
import com.bosch.example.impl.security.ImplAuthService;
import com.bosch.example.impl.security.KeyPairManager;
import com.bosch.example.services.AuthService;
import com.bosch.example.sessions.UserSession;

@Configuration
public class DependenciesConfiguration {
   
    @Bean
    @Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
    protected UserSession userSession() {
        return new UserSession();
    }

    @Bean
    @Scope("singleton")
    protected AuthFilter authFilter() {
        return new AuthFilter();
    }

    @Bean
    @Scope("singleton")
    protected AuthService authService() {
        return new ImplAuthService();
    }

    @Bean
    @Scope("singleton")
    protected KeyPairManager keyPairManager() {
        return new KeyPairManager();
    }
}
