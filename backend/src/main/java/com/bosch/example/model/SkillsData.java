package com.bosch.example.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "SkillsData")
public class SkillsData {

    public SkillsData(SubjectClassData subjectClassId, String name, String description, Integer weight) {
        this.subjectClassId = subjectClassId;
        this.name = name;
        this.description = description;
        this.weight = weight;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subjectClassId", referencedColumnName = "id")
    private SubjectClassData subjectClassId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "weight")
    private Integer weight;
}