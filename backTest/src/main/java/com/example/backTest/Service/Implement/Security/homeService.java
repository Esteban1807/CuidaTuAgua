package com.example.backTest.Service.Implement.Security;

import org.springframework.stereotype.Service;

import com.example.backTest.Entity.Security.home;
import com.example.backTest.Repository.Interface.Base.IBaseRepository;
import com.example.backTest.Service.Implement.Base.baseService;

@Service
public class homeService extends baseService<home> {
    public homeService(IBaseRepository<home> repository) {
        super(repository);
    }
}
