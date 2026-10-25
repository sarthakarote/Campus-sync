package com.campussync.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "lost_items")
@Data
public class LostItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String itemName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private String contactInfo;

    @Column(nullable = false)
    private String status = "LOST"; // LOST, FOUND, CLAIMED

    private LocalDateTime createdAt = LocalDateTime.now();
}