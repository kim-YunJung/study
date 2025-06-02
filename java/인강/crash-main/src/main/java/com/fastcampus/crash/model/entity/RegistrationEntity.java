package com.fastcampus.crash.model.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table(
    name = "registration",
    indexes = {
      @Index(
          name = "registration_userid_sessionid_idx",
          columnList = "userid, sessionid",
          unique = true)
    })
public class RegistrationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long registrationId;

  @ManyToOne
  @JoinColumn(name = "userid")
  private UserEntity user;

  @ManyToOne
  @JoinColumn(name = "sessionid")
  private CrashSessionEntity session;

  @Column private ZonedDateTime createdDateTime;

  public Long getRegistrationId() {
    return registrationId;
  }

  public void setRegistrationId(Long registrationId) {
    this.registrationId = registrationId;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public CrashSessionEntity getSession() {
    return session;
  }

  public void setSession(CrashSessionEntity session) {
    this.session = session;
  }

  public ZonedDateTime getCreatedDateTime() {
    return createdDateTime;
  }

  public void setCreatedDateTime(ZonedDateTime createdDateTime) {
    this.createdDateTime = createdDateTime;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof RegistrationEntity that)) return false;
    return Objects.equals(getRegistrationId(), that.getRegistrationId())
        && Objects.equals(getUser(), that.getUser())
        && Objects.equals(getSession(), that.getSession())
        && Objects.equals(getCreatedDateTime(), that.getCreatedDateTime());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getRegistrationId(), getUser(), getSession(), getCreatedDateTime());
  }

  public static RegistrationEntity of(UserEntity userEntity, CrashSessionEntity sessionEntity) {
    var registrationEntity = new RegistrationEntity();
    registrationEntity.setUser(userEntity);
    registrationEntity.setSession(sessionEntity);
    return registrationEntity;
  }

  @PrePersist
  private void prePersist() {
    this.createdDateTime = ZonedDateTime.now();
  }
}
