package com.sharebite.backend.service;

import com.sharebite.backend.entity.Claim;
import com.sharebite.backend.entity.FoodListing;
import com.sharebite.backend.entity.User;
import com.sharebite.backend.enums.ClaimStatus;
import com.sharebite.backend.enums.ListingStatus;
import com.sharebite.backend.repository.ClaimRepository;
import com.sharebite.backend.repository.FoodListingRepository;
import com.sharebite.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Claim requestClaim(Long ngoId, Long listingId) {
        FoodListing listing = foodListingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Listing not found"));
        if (listing.getStatus() != ListingStatus.AVAILABLE) {
            throw new RuntimeException("Listing is not available for claiming");
        }

        User ngo = userRepository.findById(ngoId).orElseThrow(() -> new RuntimeException("NGO not found"));

        Claim claim = new Claim();
        claim.setFoodListing(listing);
        claim.setNgo(ngo);
        claim.setStatus(ClaimStatus.PENDING);

        listing.setStatus(ListingStatus.CLAIMED);
        foodListingRepository.save(listing);

        return claimRepository.save(claim);
    }

    public List<Claim> getClaimsByNgo(Long ngoId) {
        return claimRepository.findByNgoId(ngoId);
    }

    public List<Claim> getClaimsForDonor(Long donorId) {
        return claimRepository.findByFoodListingDonorId(donorId);
    }

    public Claim confirmClaim(Long claimId) {
        Claim claim = claimRepository.findById(claimId).orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(ClaimStatus.CONFIRMED);
        return claimRepository.save(claim);
    }

    public Claim completeClaim(Long claimId) {
        Claim claim = claimRepository.findById(claimId).orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(ClaimStatus.COMPLETED);
        return claimRepository.save(claim);
    }
}
