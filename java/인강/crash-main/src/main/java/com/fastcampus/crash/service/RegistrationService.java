package com.fastcampus.crash.service;

import com.fastcampus.crash.exception.registration.RegistrationAlreadyExistsException;
import com.fastcampus.crash.exception.registration.RegistrationNotFoundException;
import com.fastcampus.crash.model.crashsession.CrashSessionRegistrationStatus;
import com.fastcampus.crash.model.entity.RegistrationEntity;
import com.fastcampus.crash.model.entity.UserEntity;
import com.fastcampus.crash.model.registration.Registration;
import com.fastcampus.crash.model.registration.RegistrationPostRequestBody;
import com.fastcampus.crash.repository.RegistrationEntityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
  @Autowired private RegistrationEntityRepository registrationEntityRepository;
  @Autowired private CrashSessionService crashSessionService;
  @Autowired private SlackService slackService;

  public List<Registration> getRegistrationsByCurrentUser(UserEntity currentUser) {
    var registrationEntities = registrationEntityRepository.findByUser(currentUser);
    return registrationEntities.stream().map(Registration::from).toList();
  }

  public Registration getRegistrationByRegistrationIdByCurrentUser(
      Long registrationId, UserEntity currentUser) {
    var registrationEntity =
        getRegistrationEntityByRegistrationIdAndUserEntity(registrationId, currentUser);
    return Registration.from(registrationEntity);
  }

  public RegistrationEntity getRegistrationEntityByRegistrationIdAndUserEntity(
      Long registrationId, UserEntity userEntity) {
    return registrationEntityRepository
        .findByRegistrationIdAndUser(registrationId, userEntity)
        .orElseThrow(() -> new RegistrationNotFoundException(registrationId, userEntity));
  }

  public Registration createRegistrationByCurrentUser(
      RegistrationPostRequestBody registrationPostRequestBody, UserEntity currentUser) {
    var crashSessionEntity =
        crashSessionService.getCrashSessionEntityBySessionId(
            registrationPostRequestBody.sessionId());

    registrationEntityRepository
        .findByUserAndSession(currentUser, crashSessionEntity)
        .ifPresent(
            registrationEntity -> {
              throw new RegistrationAlreadyExistsException(
                  registrationEntity.getRegistrationId(), currentUser);
            });

    var registrationEntity = RegistrationEntity.of(currentUser, crashSessionEntity);
    var registration = Registration.from(registrationEntityRepository.save(registrationEntity));

    slackService.sendSlackNotification(registration);

    return registration;
  }

  public void deleteRegistrationByRegistrationIdAndCurrentUser(
      Long registrationId, UserEntity currentUser) {
    var registrationEntity =
        getRegistrationEntityByRegistrationIdAndUserEntity(registrationId, currentUser);
    registrationEntityRepository.delete(registrationEntity);
  }

  public CrashSessionRegistrationStatus getCrashSessionRegistrationStatusBySessionIdAndCurrentUser(
      Long sessionId, UserEntity currentUser) {
    var crashSessionEntity = crashSessionService.getCrashSessionEntityBySessionId(sessionId);
    var registrationEntity =
        registrationEntityRepository.findByUserAndSession(currentUser, crashSessionEntity);
    return new CrashSessionRegistrationStatus(
        sessionId,
        registrationEntity.isPresent(),
        registrationEntity.map(RegistrationEntity::getRegistrationId).orElse(null));
  }
}
