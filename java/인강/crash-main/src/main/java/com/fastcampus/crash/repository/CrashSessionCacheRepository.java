package com.fastcampus.crash.repository;

import com.fastcampus.crash.model.crashsession.CrashSession;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

@Repository
public class CrashSessionCacheRepository {
  @Autowired private RedisTemplate<String, CrashSession> crashSessionRedisTemplate;

  @Autowired private RedisTemplate<String, List<CrashSession>> crashSessionsListRedisTemplate;

  public void setCrashSessionCache(CrashSession crashSession) {
    var redisKey = getRedisKey(crashSession.sessionId());
    crashSessionRedisTemplate.opsForValue().set(redisKey, crashSession);
  }

  public void setCrashSessionsListCache(List<CrashSession> crashSessions) {
    crashSessionsListRedisTemplate.opsForValue().set("sessions", crashSessions);
  }

  public Optional<CrashSession> getCrashSessionCache(Long sessionId) {
    var redisKey = getRedisKey(sessionId);
    var crashSession = crashSessionRedisTemplate.opsForValue().get(redisKey);
    return Optional.ofNullable(crashSession);
  }

  public List<CrashSession> getCrashSessionsListCache() {
    var crashSessions = crashSessionsListRedisTemplate.opsForValue().get("sessions");
    if (ObjectUtils.isEmpty(crashSessions)) {
      return Collections.emptyList();
    }
    return crashSessions;
  }

  private String getRedisKey(Long sessionId) {
    return "session:" + sessionId;
  }
}
