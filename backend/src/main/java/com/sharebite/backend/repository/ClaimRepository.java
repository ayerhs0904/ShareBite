package com.sharebite.backend.repository;

import com.sharebite.backend.entity.Claim;
import com.sharebite.backend.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByNgoId(Long ngoId);
    List<Claim> findByFoodListingDonorId(Long donorId);
    long countByStatus(ClaimStatus status);
}
