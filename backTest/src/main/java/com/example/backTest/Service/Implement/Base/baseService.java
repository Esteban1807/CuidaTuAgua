package com.example.backTest.Service.Implement.Base;

import java.util.List;
import java.util.Optional;

import com.example.backTest.Entity.Base.baseModel;
import com.example.backTest.Repository.Interface.Base.IBaseRepository;
import com.example.backTest.Service.Interface.Base.IBaseService;

public class baseService<T extends baseModel> implements IBaseService<T> {
    private IBaseRepository<T> repository;

    public baseService(IBaseRepository<T> repository) {
        this.repository = repository;
    }

    public List<T> getsAll() {
        return repository.findAll();
    }

    public Optional<T> getById(Long id) {
        return repository.findById(id);
    }

    public T create(T entity) {
        return repository.save(entity);
    }

    public boolean deleteById(Long id) {
        repository.deleteById(id);
        return false;
    }

}
