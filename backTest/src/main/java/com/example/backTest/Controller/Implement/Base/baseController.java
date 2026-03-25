package com.example.backTest.Controller.Implement.Base;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backTest.Controller.Interface.Base.IBaseController;
import com.example.backTest.Entity.Base.baseModel;
import com.example.backTest.Service.Interface.Base.IBaseService;

public abstract class baseController<T extends baseModel> implements IBaseController<T> {
    protected final IBaseService<T> service;

    public baseController(IBaseService<T> service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<T>> getAll() {
        return ResponseEntity.ok(service.getsAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok) // Si existe, retorna ResponseEntity<T> con estatus 200
                .orElse(ResponseEntity.notFound().build()); // Si no, retorna ResponseEntity<T> con estatus 404
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        return ResponseEntity.ok(service.create(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id); // Llamas al método (void) en su propia línea
        return ResponseEntity.noContent().build(); // Esto devuelve un 204 exitoso sin cuerpo
    }

}
