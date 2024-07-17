package com.bosch.example.model;

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
@Table(name = "CourseSubjectData")
public class CourseSubjectData {

    public CourseSubjectData(CourseData courseId, SubjectData subjectId) {
        this.courseId = courseId;
        this.subjectId = subjectId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "id")
    private CourseData courseId;

    @ManyToOne
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    private SubjectData subjectId;
    
}
