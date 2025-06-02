package com.example.pricemonitor.service;

import com.example.pricemonitor.model.coinbase.SpotPriceResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class CoinbaseService {

  private static final RestClient restClient = RestClient.create();

  /**
   * Refer: <a href="https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-prices#get-spot-price">COINBASE:GET-SPOT-PRICE</a>
   */
  public SpotPriceResponse getSpotPriceByCurrencyPair(String currencyPair) {
    return restClient
        .get()
        .uri("https://api.coinbase.com/v2/prices/{currencyPair}/spot", currencyPair)
        .retrieve()
        .body(SpotPriceResponse.class);
  }
}
