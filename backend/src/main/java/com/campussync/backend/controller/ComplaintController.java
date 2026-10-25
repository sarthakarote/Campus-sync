package com.campussync.backend.controller;

import com.campussync.backend.model.Complaint;
import com.campussync.backend.model.User;
import com.campussync.backend.repository.ComplaintRepository;
import com.campussync.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public ComplaintController(ComplaintRepository complaintRepository, UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createComplaint(@RequestBody Complaint complaint) {
        try {
            if (complaint.getStatus() == null || complaint.getStatus().trim().isEmpty()) {
                complaint.setStatus("OPEN");
            }
            if (complaint.getUpvotes() <= 0) {
                complaint.setUpvotes(1);
            }
            if (complaint.getVotedBy() == null) {
                complaint.setVotedBy(new HashSet<>());
            }
            Complaint saved = complaintRepository.save(complaint);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating complaint: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<?> toggleUpvote(@PathVariable Long id, @RequestParam Long userId) {
        Optional<Complaint> complaintOptional = complaintRepository.findById(id);
        Optional<User> userOptional = userRepository.findById(userId);

        if (complaintOptional.isPresent() && userOptional.isPresent()) {
            Complaint complaint = complaintOptional.get();
            User user = userOptional.get();

            if (complaint.getVotedBy().contains(user)) {
                complaint.getVotedBy().remove(user);
                complaint.setUpvotes(Math.max(0, complaint.getUpvotes() - 1));
            } else {
                complaint.getVotedBy().add(user);
                complaint.setUpvotes(complaint.getUpvotes() + 1);
            }

            Complaint updated = complaintRepository.save(complaint);
            return ResponseEntity.ok(updated);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint or User not found");
    }
}