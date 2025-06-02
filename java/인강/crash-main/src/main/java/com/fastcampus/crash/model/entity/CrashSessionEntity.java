package com.fastcampus.crash.model.entity;

import com.fastcampus.crash.model.crashsession.CrashSessionCategory;
import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table(name = "crashsession")
public class CrashSessionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long sessionId;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String body;

  @Column(nullable = false)
  @Enumerated(value = EnumType.STRING)
  private CrashSessionCategory category;

  @Column(nullable = false)
  private ZonedDateTime dateTime;

  @ManyToOne
  @JoinColumn(name = "speakerid")
  private SessionSpeakerEntity speaker;

  public Long getSessionId() {
    return sessionId;
  }

  public void setSessionId(Long sessionId) {
    this.sessionId = sessionId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public CrashSessionCategory getCategory() {
    return category;
  }

  public void setCategory(CrashSessionCategory category) {
    this.category = category;
  }

  public ZonedDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(ZonedDateTime dateTime) {
    this.dateTime = dateTime;
  }

  public SessionSpeakerEntity getSpeaker() {
    return speaker;
  }

  public void setSpeaker(SessionSpeakerEntity speaker) {
    this.speaker = speaker;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof CrashSessionEntity that)) return false;
    return Objects.equals(getSessionId(), that.getSessionId())
        && Objects.equals(getTitle(), that.getTitle())
        && Objects.equals(getBody(), that.getBody())
        && getCategory() == that.getCategory()
        && Objects.equals(getDateTime(), that.getDateTime())
        && Objects.equals(getSpeaker(), that.getSpeaker());
  }

  @Override
  public int hashCode() {
    return Objects.hash(
        getSessionId(), getTitle(), getBody(), getCategory(), getDateTime(), getSpeaker());
  }

  public static CrashSessionEntity of(
      String title,
      String body,
      CrashSessionCategory crashSessionCategory,
      ZonedDateTime dateTime,
      SessionSpeakerEntity sessionSpeakerEntity) {
    var crashSessionEntity = new CrashSessionEntity();
    crashSessionEntity.setTitle(title);
    crashSessionEntity.setBody(body);
    crashSessionEntity.setCategory(crashSessionCategory);
    crashSessionEntity.setDateTime(dateTime);
    crashSessionEntity.setSpeaker(sessionSpeakerEntity);
    return crashSessionEntity;
  }
}
