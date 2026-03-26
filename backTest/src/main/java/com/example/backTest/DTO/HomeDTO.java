package com.example.backTest.DTO;

public class HomeDTO {
    private Long id;
    private String name;
    private String address;
    private Integer stratum;
    private Integer inhabitants;
    private boolean status;

    public HomeDTO(Long id, String name, String address, Integer stratum, Integer inhabitants, boolean status) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.stratum = stratum;
        this.inhabitants = inhabitants;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
