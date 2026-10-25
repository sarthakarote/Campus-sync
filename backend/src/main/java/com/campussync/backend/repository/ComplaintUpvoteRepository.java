package com.campussync.backend.repository;

import com.campussync.backend.model.ComplaintUpvote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ComplaintUpvoteRepository extends JpaRepository<ComplaintUpvote, Long> {
    Optional<ComplaintUpvote> findByComplaintIdAndUserId(Long complaintId, Long userId);
}