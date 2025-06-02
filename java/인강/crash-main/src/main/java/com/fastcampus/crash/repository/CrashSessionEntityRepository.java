package com.fastcampus.crash.repository;

import com.fastcampus.crash.model.entity.CrashSessionEntity;
import com.fastcampus.crash.model.entity.SessionSpeakerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrashSessionEntityRepository extends JpaRepository<CrashSessionEntity, Long> {}
