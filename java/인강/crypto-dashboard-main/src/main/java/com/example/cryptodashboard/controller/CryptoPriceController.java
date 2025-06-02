package com.example.cryptodashboard.controller;

import com.example.cryptodashboard.model.crypto.CryptoPriceResponse;
import com.example.cryptodashboard.service.CurrencyMonitorService;
import com.example.cryptodashboard.service.PriceMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/crypto-prices")
public class CryptoPriceController {
  @Autowired private PriceMonitorService priceMonitorService;
  @Autowired private CurrencyMonitorService currencyMonitorService;

  @GetMapping("/{cryptoUnit}")
  public ResponseEntity<CryptoPriceResponse> getCryptoPrice(@PathVariable String cryptoUnit) {
    var priceResponse = priceMonitorService.getPrice(cryptoUnit);
    var currencyResponse = currencyMonitorService.getCurrency("USD");
    var cryptoPriceResponse =
        new CryptoPriceResponse(cryptoUnit, priceResponse.amount() * currencyResponse.rate());
    return ResponseEntity.ok(cryptoPriceResponse);
  }
}
