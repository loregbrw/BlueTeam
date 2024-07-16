package com.bosch.example.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.bosch.example.Enum.HabilityStrenghtEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "AbilityData")
public class AbilityData {

    public HabilityData(UserData userData, String name, HabilityStrenghtEnum strength){
        this.userData = userData;
        this.name = name;
        this.strength = strength;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserData userData;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING) @Column(name = "strength")
    private HabilityStrenghtEnum strength;
    
}
