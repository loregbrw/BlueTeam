package com.bosch.example.dto.dtoRequest;

import java.util.Date;
import com.bosch.example.Enum.UserRoleEnum;

public record UserRequest(
    Long classId,
    Long edv,
    String name,
    String email,
    UserRoleEnum role,
    Date birthDate
) { }
