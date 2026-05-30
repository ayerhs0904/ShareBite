package com.sharebite.backend.service;

import com.sharebite.backend.enums.ClaimStatus;
import com.sharebite.backend.enums.ListingStatus;
import com.sharebite.backend.repository.ClaimRepository;
import com.sharebite.backend.repository.FoodListingRepository;
import com.sharebite.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public Map<String, Long> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("activeListings", foodListingRepository.countByStatus(ListingStatus.AVAILABLE));
        stats.put("completedClaims", claimRepository.countByStatus(ClaimStatus.COMPLETED));
        return stats;
    }
}
