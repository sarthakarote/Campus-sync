package com.campussync.backend.repository;

import com.campussync.backend.model.CanteenMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CanteenMenuRepository extends JpaRepository<CanteenMenu, Long> {
    List<CanteenMenu> findByIsAvailableTrue();
}