package com.bosch.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.bosch.example.filters.AuthFilter;

@Configuration
public class FiltersConfiguration {
    
    @Autowired
    AuthFilter authFilter;

    @Bean 
    @Scope("singleton")
    protected FilterRegistrationBean<AuthFilter> registerAuthfilter() {
        var registrarionBean = new FilterRegistrationBean<AuthFilter>();

        registrarionBean.setFilter(authFilter);
        registrarionBean.addUrlPatterns(
            "/auth/*",
            "/ability/*",
            "/class/*",
            "/course/*",
            "/lesson/*",
            "/report/*",
            "/skills/*",
            "/subjectclass/*",
            "/subject/*",
            "/userskills/*"
            // "/user/*"
        );
        registrarionBean.setOrder(1);
        return registrarionBean;
    }
}
