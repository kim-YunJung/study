package com.example.cryptodashboard.service;

import com.example.cryptodashboard.model.currency.CurrencyResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class CurrencyMonitorService {

  private final String apiUri;

  public CurrencyMonitorService(@Value("${currency-monitor.api-uri}") String apiUri) {
    this.apiUri = apiUri;
  }

  private static final RestClient restClient = RestClient.create();

  public CurrencyResponse getCurrency(String currencyUnit) {
    return restClient.get().uri(apiUri, currencyUnit).retrieve().body(CurrencyResponse.class);
  }
}
