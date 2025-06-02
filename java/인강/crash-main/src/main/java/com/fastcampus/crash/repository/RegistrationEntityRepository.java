package com.fastcampus.crash.repository;

import com.fastcampus.crash.model.entity.CrashSessionEntity;
import com.fastcampus.crash.model.entity.RegistrationEntity;
import com.fastcampus.crash.model.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationEntityRepository extends JpaRepository<RegistrationEntity, Long> {
  List<RegistrationEntity> findByUser(UserEntity user);

  Optional<RegistrationEntity> findByRegistrationIdAndUser(Long registrationId, UserEntity user);

  Optional<RegistrationEntity> findByUserAndSession(UserEntity user, CrashSessionEntity session);
}
