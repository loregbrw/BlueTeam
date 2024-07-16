package com.bosch.example.model;

import java.sql.Date;

import com.bosch.example.Enum.LessonShiftEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "LessonData")
public class LessonData {

    public LessonData(SubjectClassData subjectClassId, String title, String description, LessonShiftEnum shift, Date date){
        this.subjectClassId = subjectClassId;
        this.title = title;
        this.description = description;
        this.shift = shift;
        this.date = date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subjectClassId", referencedColumnName = "id")
    private SubjectClassData subjectClassId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING) @Column(name = "shift")
    private LessonShiftEnum shift;

    @Column(name = "date")
    private Date date;
}
