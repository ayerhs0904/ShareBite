package com.sharebite.backend.controller;

import com.sharebite.backend.entity.Claim;
import com.sharebite.backend.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/request")
    public ResponseEntity<Claim> requestClaim(@RequestParam Long ngoId, @RequestParam Long listingId) {
        return ResponseEntity.ok(claimService.requestClaim(ngoId, listingId));
    }

    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<Claim>> getClaimsByNgo(@PathVariable Long ngoId) {
        return ResponseEntity.ok(claimService.getClaimsByNgo(ngoId));
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Claim>> getClaimsForDonor(@PathVariable Long donorId) {
        return ResponseEntity.ok(claimService.getClaimsForDonor(donorId));
    }

    @PutMapping("/{claimId}/confirm")
    public ResponseEntity<Claim> confirmClaim(@PathVariable Long claimId) {
        return ResponseEntity.ok(claimService.confirmClaim(claimId));
    }

    @PutMapping("/{claimId}/complete")
    public ResponseEntity<Claim> completeClaim(@PathVariable Long claimId) {
        return ResponseEntity.ok(claimService.completeClaim(claimId));
    }
}
