package com.example.backTest.Service.Implement.Security;

import org.springframework.stereotype.Service;

import com.example.backTest.Entity.Security.user;
import com.example.backTest.Repository.Interface.Base.IBaseRepository;
import com.example.backTest.Service.Implement.Base.baseService;

@Service
public class userService extends baseService<user> {
    public userService(IBaseRepository<user> repository) {
        super(repository);
    }
}
