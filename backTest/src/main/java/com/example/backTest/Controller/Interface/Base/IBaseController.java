package com.example.backTest.Controller.Interface.Base;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public interface IBaseController<T> {
    @GetMapping
    ResponseEntity<List<T>> getAll();

    @GetMapping("/{id}")
    ResponseEntity<T> getById(@PathVariable Long id);

    @PostMapping
    ResponseEntity<T> create(T entity);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteById(@PathVariable Long id);
}
