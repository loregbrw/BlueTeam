package com.bosch.example.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "ClassData")
public class ClassData {

    public ClassData(CourseData courseId, String name, Long duration, Date initialDate) {
        this.courseId = courseId;
        this.name = name;
        this.duration = duration;
        this.initialDate = initialDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "id")
    private CourseData courseId;
   
    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "initialDate")
    private Date initialDate;
}
