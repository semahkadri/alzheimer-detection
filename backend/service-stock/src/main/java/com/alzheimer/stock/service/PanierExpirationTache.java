package com.alzheimer.stock.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Background task that runs every 5 minutes to clean expired carts.
 * Carts expire after 20 minutes of inactivity.
 */
@Component
@RequiredArgsConstructor
public class PanierExpirationTache {

    private final PanierServiceImpl panierService;

    @Scheduled(fixedRate = 5 * 60 * 1000) // every 5 minutes
    public void nettoyerPaniersExpires() {
        panierService.nettoyerPaniersExpires();
    }
}
