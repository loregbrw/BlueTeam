package com.bosch.example.model;

import java.sql.Date;

import com.bosch.example.Enum.UserRoleEnum;

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
@Table(name = "UserData")
public class UserData {

    public UserData(ClassData classid, Long edv,String name, String email,UserRoleEnum role, Date date){
        this.classId = classid;
        this.edv = edv;
        this.name = name;
        this.email = email;
        this.role = role;
        this.date = date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "classId", referencedColumnName = "id")
    private ClassData classId;

    @Column(name = "edv")
    private Long edv;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private UserRoleEnum role;

    @Column(name = "birthDate")
    private Date date;
    
    
}
