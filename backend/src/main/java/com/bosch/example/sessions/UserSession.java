package com.bosch.example.sessions;

import com.bosch.example.Enum.UserRoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSession {
    private Long id;
    private UserRoleEnum role;
}
