package com.sharebite.backend.controller;

import com.sharebite.backend.entity.FoodListing;
import com.sharebite.backend.enums.ListingStatus;
import com.sharebite.backend.service.FoodListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private FoodListingService foodListingService;

    @PostMapping("/donor/{donorId}")
    public ResponseEntity<FoodListing> createListing(@PathVariable Long donorId, @RequestBody FoodListing listing) {
        return ResponseEntity.ok(foodListingService.createListing(donorId, listing));
    }

    @GetMapping("/public")
    public ResponseEntity<List<FoodListing>> getAvailableListings() {
        return ResponseEntity.ok(foodListingService.getAvailableListings());
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodListing>> searchListings(@RequestParam String query) {
        return ResponseEntity.ok(foodListingService.searchListings(query));
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<FoodListing>> getListingsByDonor(@PathVariable Long donorId) {
        return ResponseEntity.ok(foodListingService.getListingsByDonor(donorId));
    }

    @PutMapping("/{listingId}/status")
    public ResponseEntity<FoodListing> updateStatus(@PathVariable Long listingId, @RequestParam ListingStatus status) {
        return ResponseEntity.ok(foodListingService.updateListingStatus(listingId, status));
    }
}
