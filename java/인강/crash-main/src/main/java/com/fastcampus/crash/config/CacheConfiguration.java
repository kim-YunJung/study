package com.fastcampus.crash.config;

import com.fastcampus.crash.model.crashsession.CrashSession;
import com.fastcampus.crash.model.entity.UserEntity;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class CacheConfiguration {

  private static final ObjectMapper objectMapper =
      new ObjectMapper().registerModule(new JavaTimeModule());

  @Bean
  RedisConnectionFactory redisConnectionFactory(
      @Value("${redis.host}") String redisHost, @Value("${redis.port}") int redisPort) {
    var config = new RedisStandaloneConfiguration();
    config.setHostName(redisHost);
    config.setPort(redisPort);
    return new LettuceConnectionFactory(config);
  }

  @Bean
  public RedisTemplate<String, UserEntity> userEntityRedisTemplate(
      RedisConnectionFactory redisConnectionFactory) {
    var template = new RedisTemplate<String, UserEntity>();
    template.setConnectionFactory(redisConnectionFactory);
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(
        new Jackson2JsonRedisSerializer<UserEntity>(objectMapper, UserEntity.class));
    return template;
  }

  @Bean
  public RedisTemplate<String, CrashSession> crashSessionRedisTemplate(
      RedisConnectionFactory redisConnectionFactory) {
    var template = new RedisTemplate<String, CrashSession>();
    template.setConnectionFactory(redisConnectionFactory);
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(
        new Jackson2JsonRedisSerializer<CrashSession>(objectMapper, CrashSession.class));
    return template;
  }

  @Bean
  public RedisTemplate<String, List<CrashSession>> crashSessionsListRedisTemplate(
      RedisConnectionFactory redisConnectionFactory) {
    var template = new RedisTemplate<String, List<CrashSession>>();
    template.setConnectionFactory(redisConnectionFactory);
    template.setKeySerializer(new StringRedisSerializer());

    JavaType type =
        objectMapper.getTypeFactory().constructCollectionType(List.class, CrashSession.class);
    template.setValueSerializer(
        new Jackson2JsonRedisSerializer<List<CrashSession>>(objectMapper, type));
    return template;
  }
}
