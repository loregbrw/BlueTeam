package com.bosch.example.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "HabilityData")
public class HabilityData {

    public HabilityData(UserData userData, String name, HabilityData strengh){
        this.userData = userData;
        this.name = name;
        this.strengh = strengh;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserData userData;

    @Column(name = "name")
    private String name;

    @Column(name = "strengh")
    private HabilityData strengh;

    




    
}
