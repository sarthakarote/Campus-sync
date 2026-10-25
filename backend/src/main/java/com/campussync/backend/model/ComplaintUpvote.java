package com.campussync.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "complaint_upvotes")
@Data
public class ComplaintUpvote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long complaintId;

    @Column(nullable = false)
    private Long userId;
}