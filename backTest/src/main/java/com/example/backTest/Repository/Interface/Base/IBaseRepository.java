package com.example.backTest.Repository.Interface.Base;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backTest.Entity.Base.baseModel;

public interface IBaseRepository<T extends baseModel> extends JpaRepository<T, Long> {
    Optional<T> findById(Long id);

    List<T> findAll();

    void deleteById(Long id);
}
