package com.example.backTest.Service.Interface.Base;

import java.util.List;
import java.util.Optional;

import com.example.backTest.Entity.Base.baseModel;;

public interface IBaseService<T extends baseModel> {
    Optional<T> getById(Long id);

    List<T> getsAll();

    boolean deleteById(Long id);

    T create(T entity);
}
