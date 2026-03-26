package com.example.backTest.Repository.Interface.Security;

import java.util.Optional;

import com.example.backTest.Entity.Security.user;
import com.example.backTest.Repository.Interface.Base.IBaseRepository;

public interface IUserRepository extends IBaseRepository<user> {
    Optional<user> findByEmail(String email);
    Optional<user> findByDocument(String document);
}
