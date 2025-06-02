package com.fastcampus.crash.model.entity;

import com.fastcampus.crash.model.user.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(
    name = "\"user\"",
    indexes = {@Index(name = "user_username_idx", columnList = "username", unique = true)})
public class UserEntity implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String email;

  @Column
  @Enumerated(value = EnumType.STRING)
  private Role role;

  @Column private ZonedDateTime createdDateTime;

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
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
    if (!(o instanceof UserEntity that)) return false;
    return Objects.equals(getUserId(), that.getUserId())
        && Objects.equals(getUsername(), that.getUsername())
        && Objects.equals(getPassword(), that.getPassword())
        && Objects.equals(getName(), that.getName())
        && Objects.equals(getEmail(), that.getEmail())
        && getRole() == that.getRole()
        && Objects.equals(getCreatedDateTime(), that.getCreatedDateTime());
  }

  @Override
  public int hashCode() {
    return Objects.hash(
        getUserId(),
        getUsername(),
        getPassword(),
        getName(),
        getEmail(),
        getRole(),
        getCreatedDateTime());
  }

  @Override
  @JsonIgnore
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role.equals(Role.ADMIN)) {
      return List.of(
          new SimpleGrantedAuthority("ROLE_" + Role.ADMIN.name()),
          new SimpleGrantedAuthority(Role.ADMIN.name()),
          new SimpleGrantedAuthority("ROLE_" + Role.USER.name()),
          new SimpleGrantedAuthority(Role.USER.name()));
    } else {
      return List.of(
          new SimpleGrantedAuthority("ROLE_" + Role.USER.name()),
          new SimpleGrantedAuthority(Role.USER.name()));
    }
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isEnabled() {
    return true;
  }

  public static UserEntity of(String username, String password, String name, String email) {
    var userEntity = new UserEntity();
    userEntity.setUsername(username);
    userEntity.setPassword(password);
    userEntity.setName(name);
    userEntity.setEmail(email);
    userEntity.setRole(Role.USER);
    return userEntity;
  }

  @PrePersist
  private void prePersist() {
    this.createdDateTime = ZonedDateTime.now();
  }
}
