package com.example.backTest.Entity.Security;

import com.example.backTest.Entity.Base.baseModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "homes")
public class home extends baseModel {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "stratum", nullable = false)
    private Integer stratum;

    @Column(name = "inhabitants", nullable = false)
    private Integer inhabitants;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_HOME_USER"))
    private user user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStratum() {
        return stratum;
    }

    public void setStratum(Integer stratum) {
        this.stratum = stratum;
    }

    public Integer getInhabitants() {
        return inhabitants;
    }

    public void setInhabitants(Integer inhabitants) {
        this.inhabitants = inhabitants;
    }

    public user getUser() {
        return user;
    }

    public void setUser(user user) {
        this.user = user;
    }
}
