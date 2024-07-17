package com.bosch.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

import com.bosch.example.filters.AuthFilter;
import com.bosch.example.impl.database.DefaultAbilityService;
import com.bosch.example.impl.database.DefaultClassService;
import com.bosch.example.impl.database.DefaultCourseService;
import com.bosch.example.impl.database.DefaultLessonService;
import com.bosch.example.impl.database.DefaultReportService;
import com.bosch.example.impl.database.DefaultSkillsService;
import com.bosch.example.impl.database.DefaultSubjectClassService;
import com.bosch.example.impl.database.DefaultSubjectService;
import com.bosch.example.impl.database.DefaultUserService;
import com.bosch.example.impl.database.DefaultUserSkillsService;
import com.bosch.example.impl.security.DeafultCryptographyService;
import com.bosch.example.impl.security.ImplAuthService;
import com.bosch.example.impl.security.KeyPairManager;
import com.bosch.example.services.AbilityService;
import com.bosch.example.services.AuthService;
import com.bosch.example.services.ClassService;
import com.bosch.example.services.CourseService;
import com.bosch.example.services.CryptographyService;
import com.bosch.example.services.LessonService;
import com.bosch.example.services.ReportService;
import com.bosch.example.services.SkillsService;
import com.bosch.example.services.SubjectClassService;
import com.bosch.example.services.SubjectService;
import com.bosch.example.services.UserService;
import com.bosch.example.services.UserSkillsService;
import com.bosch.example.sessions.UserSession;

@Configuration
public class DependenciesConfiguration {
   
    @Bean
    @Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
    public UserSession userSession() {
        return new UserSession();
    }

    @Bean
    @Scope()
    public AuthFilter authFilter() {
        return new AuthFilter();
    }

    @Bean
    @Scope()
    public AuthService authService() {
        return new ImplAuthService();
    }

    @Bean
    @Scope()
    public AbilityService abilityService() {
        return new DefaultAbilityService();
    }

    @Bean
    @Scope()
    public ClassService classService() {
        return new DefaultClassService();
    }

    @Bean
    @Scope()
    public CourseService courseService() {
        return new DefaultCourseService();
    }

    @Bean
    @Scope()
    public LessonService lessonService() {
        return new DefaultLessonService();
    }
    @Bean
    @Scope()
    public ReportService reportService() {
        return new DefaultReportService();
    }

    @Bean
    @Scope()
    public SkillsService skillsService() {
        return new DefaultSkillsService();
    }

    @Bean
    @Scope()
    public SubjectService subjectService() {
        return new DefaultSubjectService();
    }

    @Bean
    @Scope()
    public SubjectClassService subjectClassService() {
        return new DefaultSubjectClassService();
    }

    @Bean
    @Scope()
    public UserService userService() {
        return new DefaultUserService();
    }

    @Bean
    @Scope()
    public UserSkillsService userSkillsService() {
        return new DefaultUserSkillsService();
    }

    @Bean
    @Scope("singleton")
    protected KeyPairManager keyPairManager() {
        return new KeyPairManager();
    }
    
    @Bean
    @Scope() 
    public CryptographyService cryptographyService() {
        return new DeafultCryptographyService();
    }
}
