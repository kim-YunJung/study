package com.fastcampus.crash.config;

import com.fastcampus.crash.model.coinbase.PriceResponse;
import com.fastcampus.crash.model.crashsession.CrashSessionCategory;
import com.fastcampus.crash.model.crashsession.CrashSessionPostRequestBody;
import com.fastcampus.crash.model.exchange.ExchangeResponse;
import com.fastcampus.crash.model.sessionspeaker.SessionSpeaker;
import com.fastcampus.crash.model.sessionspeaker.SessionSpeakerPostRequestBody;
import com.fastcampus.crash.model.user.UserSignUpRequestBody;
import com.fastcampus.crash.service.CrashSessionService;
import com.fastcampus.crash.service.SessionSpeakerService;
import com.fastcampus.crash.service.UserService;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;
import net.datafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.RestClient;

@Configuration
public class ApplicationConfiguration {

  private static final RestClient restClient = RestClient.create();
  private static final Logger logger = LoggerFactory.getLogger(ApplicationConfiguration.class);

  private static final Faker faker = new Faker();

  @Autowired private UserService userService;

  @Autowired private SessionSpeakerService sessionSpeakerService;

  @Autowired private CrashSessionService crashSessionService;

  @Bean
  public ApplicationRunner applicationRunner() {
    return new ApplicationRunner() {
      @Override
      public void run(ApplicationArguments args) throws Exception {
        createTestUsers();
        createTestSessionSpeakers(10);
        //        // Bitcoin USD 가격 조회
        //        var bitcoinUsdPrice = getBitcoinUsdPrice();
        //        // USD to KRW 환율 조회
        //        var usdToKrwExchangeRate = getUsdToKrwExchangeRate();
        //        // Bitcoin KRW 가격 계산
        //        var koreanPremium = 1.1;
        //        var bitcoinKrwPrice = bitcoinUsdPrice * usdToKrwExchangeRate * koreanPremium;
        //
        //        logger.info(String.format("BTC KRW: %.2f", bitcoinKrwPrice));
      }
    };
  }

  private Double getBitcoinUsdPrice() {
    var response =
        restClient
            .get()
            .uri("https://api.coinbase.com/v2/prices/BTC-USD/buy")
            .retrieve()
            .onStatus(
                HttpStatusCode::is4xxClientError,
                (req, res) -> {
                  logger.error(new String(res.getBody().readAllBytes(), StandardCharsets.UTF_8));
                })
            .body(PriceResponse.class);

    assert response != null;
    return Double.parseDouble(response.data().amount());
  }

  private Double getUsdToKrwExchangeRate() {
    var response =
        restClient
            .get()
            .uri(
                "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=rEo29Gjp9DQJAiEHdOXVTijxnKqRg0YH&searchdate=20240312&data=AP01")
            .retrieve()
            .onStatus(
                HttpStatusCode::is4xxClientError,
                (req, res) -> {
                  logger.error(new String(res.getBody().readAllBytes(), StandardCharsets.UTF_8));
                })
            .body(ExchangeResponse[].class);

    assert response != null;

    var usdToKrwExchangeRate =
        Arrays.stream(response)
            .filter(exchangeResponse -> exchangeResponse.cur_unit().equals("USD"))
            .findFirst()
            .orElseThrow();

    return Double.parseDouble(usdToKrwExchangeRate.deal_bas_r().replace(",", ""));
  }

  private void createTestUsers() {
    userService.signUp(new UserSignUpRequestBody("jayce", "1234", "Dev Jayce", "jayce@crash.com"));
    userService.signUp(new UserSignUpRequestBody("jay", "1234", "Dev Jay", "jay@crash.com"));
    userService.signUp(new UserSignUpRequestBody("rose", "1234", "Dev Rose", "rose@crash.com"));
    userService.signUp(new UserSignUpRequestBody("rosa", "1234", "Dev Rosa", "rosa@crash.com"));
  }

  private void createTestSessionSpeakers(int numberOfSpeakers) {
    var sessionSpeakers =
        IntStream.range(0, numberOfSpeakers).mapToObj(i -> createTestSessionSpeaker()).toList();

    sessionSpeakers.forEach(
        sessionSpeaker -> {
          int numberOfSessions = new Random().nextInt(4) + 1;
          IntStream.range(0, numberOfSessions).forEach(i -> createTestCrashSession(sessionSpeaker));
        });
  }

  private SessionSpeaker createTestSessionSpeaker() {
    var name = faker.name().fullName();
    var company = faker.company().name();
    var description = faker.shakespeare().romeoAndJulietQuote();

    return sessionSpeakerService.createSessionSpeaker(
        new SessionSpeakerPostRequestBody(company, name, description));
  }

  private void createTestCrashSession(SessionSpeaker sessionSpeaker) {
    var title = faker.book().title();
    var body =
        faker.shakespeare().asYouLikeItQuote()
            + faker.shakespeare().hamletQuote()
            + faker.shakespeare().kingRichardIIIQuote()
            + faker.shakespeare().romeoAndJulietQuote();

    crashSessionService.createCrashSession(
        new CrashSessionPostRequestBody(
            title,
            body,
            getRandomCategory(),
            ZonedDateTime.now().plusDays(new Random().nextInt(2) + 1),
            sessionSpeaker.speakerId()));
  }

  private CrashSessionCategory getRandomCategory() {
    var categories = CrashSessionCategory.values();
    int randomIndex = new Random().nextInt(categories.length);
    return categories[randomIndex];
  }
}
