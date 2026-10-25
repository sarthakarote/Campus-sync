package com.campussync.backend.repository;

import com.campussync.backend.model.CanteenOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CanteenOrderRepository extends JpaRepository<CanteenOrder, Long> {
    List<CanteenOrder> findByUserId(Long userId);
}