package com.bosch.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "UserSkillsData")
public class UserSkillsData {
    
    public UserSkillsData(UserData userId, SkillsData skillsId, Float value) {
        this.userId = userId;
        this.skillsId = skillsId;
        this.value = value;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserData userId;

    @ManyToOne
    @JoinColumn(name = "skillsId", referencedColumnName = "id")
    private SkillsData skillsId;

    @Column(name = "value")
    private Float value;
}
