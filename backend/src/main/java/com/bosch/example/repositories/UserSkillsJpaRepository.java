package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.UserData;
import com.bosch.example.model.UserSkillsData;
import java.util.List;


@Repository
public interface UserSkillsJpaRepository extends JpaRepository<UserSkillsData, Long> {
    List<UserSkillsData> findByUserId(UserData userId);
}
