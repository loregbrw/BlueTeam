package com.bosch.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "SubjectClassData")
public class SubjectClassData {

    public SubjectClassData(ClassData classId, SubjectData subjectId, Long duration) {
        this.classId = classId;
        this.subjectId = subjectId;
        this.duration = duration;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "classId", referencedColumnName = "id")
    private ClassData classId;

    @ManyToOne
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    private SubjectData subjectId;
   
    @Column(name = "duration")
    private Long duration;

}
