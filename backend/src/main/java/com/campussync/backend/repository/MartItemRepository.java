package com.campussync.backend.repository;

import com.campussync.backend.model.MartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MartItemRepository extends JpaRepository<MartItem, Long> {
    List<MartItem> findByIsSoldFalse();
}