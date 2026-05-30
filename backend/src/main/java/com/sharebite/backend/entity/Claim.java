package com.sharebite.backend.entity;

import com.sharebite.backend.enums.ClaimStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private FoodListing foodListing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ngo_id", nullable = false)
    private User ngo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status = ClaimStatus.PENDING;

    private LocalDateTime timestamp = LocalDateTime.now();

    public Claim() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public FoodListing getFoodListing() { return foodListing; }
    public void setFoodListing(FoodListing foodListing) { this.foodListing = foodListing; }
    public User getNgo() { return ngo; }
    public void setNgo(User ngo) { this.ngo = ngo; }
    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
