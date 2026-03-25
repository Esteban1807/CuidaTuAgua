package com.example.backTest.Controller.Implement.Security;

import org.springframework.web.bind.annotation.RestController;

import com.example.backTest.Controller.Implement.Base.baseController;
import com.example.backTest.Entity.Security.user;
import com.example.backTest.Service.Implement.Security.userService;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/users")
public class userController extends baseController<user> {
    public userController(userService service) {
        super(service);

    }
}