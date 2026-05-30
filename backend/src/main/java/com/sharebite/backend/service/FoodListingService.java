package com.sharebite.backend.service;

import com.sharebite.backend.entity.FoodListing;
import com.sharebite.backend.entity.User;
import com.sharebite.backend.enums.ListingStatus;
import com.sharebite.backend.repository.FoodListingRepository;
import com.sharebite.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@EnableScheduling
public class FoodListingService {

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private UserRepository userRepository;

    public FoodListing createListing(Long donorId, FoodListing listing) {
        User donor = userRepository.findById(donorId).orElseThrow(() -> new RuntimeException("Donor not found"));
        listing.setDonor(donor);
        listing.setStatus(ListingStatus.AVAILABLE);
        return foodListingRepository.save(listing);
    }

    public List<FoodListing> getAvailableListings() {
        return foodListingRepository.findByStatus(ListingStatus.AVAILABLE);
    }

    public List<FoodListing> searchListings(String query) {
        return foodListingRepository.findByTitleContainingIgnoreCaseAndStatus(query, ListingStatus.AVAILABLE);
    }

    public List<FoodListing> getListingsByDonor(Long donorId) {
        return foodListingRepository.findByDonorId(donorId);
    }

    public FoodListing updateListingStatus(Long listingId, ListingStatus status) {
        FoodListing listing = foodListingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setStatus(status);
        return foodListingRepository.save(listing);
    }

    // Auto update expired status every minute
    @Scheduled(fixedRate = 60000)
    public void updateExpiredListings() {
        List<FoodListing> availableListings = foodListingRepository.findByStatus(ListingStatus.AVAILABLE);
        LocalDateTime now = LocalDateTime.now();
        for (FoodListing listing : availableListings) {
            if (listing.getExpiryDate().isBefore(now)) {
                listing.setStatus(ListingStatus.EXPIRED);
                foodListingRepository.save(listing);
            }
        }
    }
}
