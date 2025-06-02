package com.fastcampus.crash.service;

import com.fastcampus.crash.exception.sessionspeaker.SessionSpeakerNotFoundException;
import com.fastcampus.crash.model.entity.SessionSpeakerEntity;
import com.fastcampus.crash.model.sessionspeaker.SessionSpeaker;
import com.fastcampus.crash.model.sessionspeaker.SessionSpeakerPatchRequestBody;
import com.fastcampus.crash.model.sessionspeaker.SessionSpeakerPostRequestBody;
import com.fastcampus.crash.repository.SessionSpeakerEntityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class SessionSpeakerService {
  @Autowired private SessionSpeakerEntityRepository sessionSpeakerEntityRepository;

  public List<SessionSpeaker> getSessionSpeakers() {
    var sessionSpeakerEntities = sessionSpeakerEntityRepository.findAll();
    return sessionSpeakerEntities.stream().map(SessionSpeaker::from).toList();
  }

  public SessionSpeakerEntity getSessionSpeakerEntityBySpeakerId(Long speakerId) {
    return sessionSpeakerEntityRepository
        .findById(speakerId)
        .orElseThrow(() -> new SessionSpeakerNotFoundException(speakerId));
  }

  public SessionSpeaker getSessionSpeakerBySpeakerId(Long speakerId) {
    var sessionSpeakerEntity = getSessionSpeakerEntityBySpeakerId(speakerId);
    return SessionSpeaker.from(sessionSpeakerEntity);
  }

  public SessionSpeaker createSessionSpeaker(
      SessionSpeakerPostRequestBody sessionSpeakerPostRequestBody) {
    var sessionSpeakerEntity =
        SessionSpeakerEntity.of(
            sessionSpeakerPostRequestBody.company(),
            sessionSpeakerPostRequestBody.name(),
            sessionSpeakerPostRequestBody.description());

    return SessionSpeaker.from(sessionSpeakerEntityRepository.save(sessionSpeakerEntity));
  }

  public SessionSpeaker updateSessionSpeaker(
      Long speakerId, SessionSpeakerPatchRequestBody sessionSpeakerPatchRequestBody) {
    var sessionSpeakerEntity = getSessionSpeakerEntityBySpeakerId(speakerId);

    if (!ObjectUtils.isEmpty(sessionSpeakerPatchRequestBody.company())) {
      sessionSpeakerEntity.setCompany(sessionSpeakerPatchRequestBody.company());
    }

    if (!ObjectUtils.isEmpty(sessionSpeakerPatchRequestBody.name())) {
      sessionSpeakerEntity.setName(sessionSpeakerPatchRequestBody.name());
    }

    if (!ObjectUtils.isEmpty(sessionSpeakerPatchRequestBody.description())) {
      sessionSpeakerEntity.setDescription(sessionSpeakerPatchRequestBody.description());
    }

    return SessionSpeaker.from(sessionSpeakerEntityRepository.save(sessionSpeakerEntity));
  }

  public void deleteSessionSpeaker(Long speakerId) {
    var sessionSpeakerEntity = getSessionSpeakerEntityBySpeakerId(speakerId);
    sessionSpeakerEntityRepository.delete(sessionSpeakerEntity);
  }
}
