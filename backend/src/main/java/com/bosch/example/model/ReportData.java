package com.bosch.example.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ReportData")
public class ReportData {
    
    public ReportData(UserData userId, UserData authorId, String description, LessonData lessonId, Date date) {
        this.userId = userId;
        this.authorId = authorId;
        this.description = description;
        this.lessonId = lessonId;
        this.date = date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserData userId;

    @OneToMany
    @JoinColumn(name = "authorId", referencedColumnName = "id")
    private UserData authorId;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "lessonId", referencedColumnName = "id")
    private LessonData lessonId;

    @Column(name = "date")
    private Date date;
}
