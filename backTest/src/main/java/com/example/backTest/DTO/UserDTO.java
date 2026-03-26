package com.example.backTest.DTO;

public class UserDTO {
    private Long id;
    private String fullName;
    private String document;
    private String email;
    private boolean status;

    public UserDTO(Long id, String fullName, String document, String email, boolean status) {
        this.id = id;
        this.fullName = fullName;
        this.document = document;
        this.email = email;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
