package com.example.backTest.Entity.Security;

import java.util.List;

import com.example.backTest.Entity.Base.baseModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class user extends baseModel {
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Column(name = "document", nullable = false, unique = true)
    private String document;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "user")
    private List<home> homes;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<home> getHomes() {
        return homes;
    }

    public void setHomes(List<home> homes) {
        this.homes = homes;
    }
}
