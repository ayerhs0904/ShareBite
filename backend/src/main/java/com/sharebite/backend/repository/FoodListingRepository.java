package com.sharebite.backend.repository;

import com.sharebite.backend.entity.FoodListing;
import com.sharebite.backend.enums.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findByStatus(ListingStatus status);
    List<FoodListing> findByDonorId(Long donorId);
    List<FoodListing> findByTitleContainingIgnoreCaseAndStatus(String title, ListingStatus status);
    long countByStatus(ListingStatus status);
}
