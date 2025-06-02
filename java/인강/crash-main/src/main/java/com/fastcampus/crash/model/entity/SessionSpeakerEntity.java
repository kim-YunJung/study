package com.fastcampus.crash.model.entity;

import jakarta.persistence.*;
import java.util.Objects;
import java.util.Random;

@Entity
@Table(name = "sessionspeaker")
public class SessionSpeakerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long speakerId;

  @Column(nullable = false)
  private String company;

  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String description;

  @Column(nullable = false)
  private String profile;

  public Long getSpeakerId() {
    return speakerId;
  }

  public void setSpeakerId(Long speakerId) {
    this.speakerId = speakerId;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getProfile() {
    return profile;
  }

  public void setProfile(String profile) {
    this.profile = profile;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof SessionSpeakerEntity that)) return false;
    return Objects.equals(getSpeakerId(), that.getSpeakerId())
        && Objects.equals(getCompany(), that.getCompany())
        && Objects.equals(getName(), that.getName())
        && Objects.equals(getDescription(), that.getDescription())
        && Objects.equals(getProfile(), that.getProfile());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getSpeakerId(), getCompany(), getName(), getDescription(), getProfile());
  }

  public static SessionSpeakerEntity of(String company, String name, String description) {
    var sessionSpeakerEntity = new SessionSpeakerEntity();
    sessionSpeakerEntity.setCompany(company);
    sessionSpeakerEntity.setName(name);
    sessionSpeakerEntity.setDescription(description);
    sessionSpeakerEntity.setProfile(
        "https://dev-jayce.github.io/public/profile/" + (new Random().nextInt(100) + 1) + ".png");
    return sessionSpeakerEntity;
  }
}
