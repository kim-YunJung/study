package com.fastcampus.crash.service;

import com.fastcampus.crash.model.registration.Registration;
import com.fastcampus.crash.model.slack.SlackNotificationBlock;
import com.fastcampus.crash.model.slack.SlackNotificationMessage;
import com.fastcampus.crash.model.slack.SlackNotificationText;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SlackService {

  private static final Logger logger = LoggerFactory.getLogger(SlackService.class);
  private static final RestClient restClient = RestClient.create();

  public void sendSlackNotification(Registration registration) {
    var linkText = getRegistrationPageLinkText(registration);

    var slackNotificationMessage =
        new SlackNotificationMessage(
            List.of(
                new SlackNotificationBlock(
                    "section", new SlackNotificationText("mrkdwn", linkText))));

    var response =
        restClient
            .post()
            .uri(
                "https://hooks.slack.com/services/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")
            .body(slackNotificationMessage)
            .retrieve()
            .body(String.class);

    logger.info(response);
  }

  private String getRegistrationPageLinkText(Registration registration) {
    var baseLink = "https://dev-jayce.github.io/crash/registration.html?registration=";
    var registrationId = registration.registrationId();
    var username = registration.user().username();
    var sessionId = registration.session().sessionId();
    var link = baseLink + registrationId + "," + username + "," + sessionId;
    return ":collision: *CRASH* <" + link + "|Registration Details>";
  }
}
