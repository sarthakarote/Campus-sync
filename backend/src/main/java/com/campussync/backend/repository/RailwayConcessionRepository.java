package com.campussync.backend.repository;

import com.campussync.backend.model.RailwayConcession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RailwayConcessionRepository extends JpaRepository<RailwayConcession, Long> {
    List<RailwayConcession> findByUserId(Long userId);
}