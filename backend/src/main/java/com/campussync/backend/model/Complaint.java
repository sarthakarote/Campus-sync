package com.campussync.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    @JsonProperty("desc")
    private String desc;

    private int upvotes = 1;

    private String status = "OPEN";

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "complaints_voted_by",
        joinColumns = @JoinColumn(name = "complaint_id"),
        inverseJoinColumns = @JoinColumn(name = "voted_by_id")
    )
    private Set<User> votedBy = new HashSet<>();

    public Complaint() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDesc() { return desc; }
    public void setDesc(String desc) { this.desc = desc; }

    public int getUpvotes() { return upvotes; }
    public void setUpvotes(int upvotes) { this.upvotes = upvotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Set<User> getVotedBy() { return votedBy; }
    public void setVotedBy(Set<User> votedBy) { this.votedBy = votedBy; }
}