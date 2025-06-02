package com.example.currencymonitor.service;

import com.example.currencymonitor.model.exchange.ExchangeResponse;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ExchangeService {
  private static final RestClient restClient = RestClient.create();

  private final String apiUri;
  private final String authKey;

  public ExchangeService(
      @Value("${kexim.api-uri}") String apiUri, @Value("${kexim.auth-key}") String authKey) {
    this.apiUri = apiUri;
    this.authKey = authKey;
  }

  /**
   * 현재 환율 조회 API - 비영업일 혹은 영업당일 11시 이전에 데이터를 요청할 경우 빈 값
   * Refer: <a href="https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C#tab1">한국수출입은행(KEXIM):현재환율API</a>
   */
  public ExchangeResponse getExchangeByCurrency(String currency) {
    var exchangesResponse =
        restClient.get().uri(apiUri + authKey).retrieve().body(ExchangeResponse[].class);

    if (exchangesResponse == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    return Arrays.stream(exchangesResponse)
        .filter(exchangeResponse -> exchangeResponse.cur_unit().equals(currency.toUpperCase()))
        .findFirst()
        .orElse(new ExchangeResponse("USD", "미국 달러", "2000"));
  }
}
