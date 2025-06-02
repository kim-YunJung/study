package com.fastcampus.crash.service;

import com.fastcampus.crash.exception.user.UserAlreadyExistsException;
import com.fastcampus.crash.exception.user.UserNotFoundException;
import com.fastcampus.crash.model.entity.UserEntity;
import com.fastcampus.crash.model.user.User;
import com.fastcampus.crash.model.user.UserAuthenticationResponse;
import com.fastcampus.crash.model.user.UserLoginRequestBody;
import com.fastcampus.crash.model.user.UserSignUpRequestBody;
import com.fastcampus.crash.repository.UserEntityCacheRepository;
import com.fastcampus.crash.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Autowired private UserEntityRepository userEntityRepository;

  @Autowired private UserEntityCacheRepository userEntityCacheRepository;

  @Autowired private BCryptPasswordEncoder passwordEncoder;

  @Autowired private JwtService jwtService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return getUserEntityByUsername(username);
  }

  public User signUp(UserSignUpRequestBody userSignUpRequestBody) {
    userEntityRepository
        .findByUsername(userSignUpRequestBody.username())
        .ifPresent(
            user -> {
              throw new UserAlreadyExistsException();
            });

    var userEntity =
        userEntityRepository.save(
            UserEntity.of(
                userSignUpRequestBody.username(),
                passwordEncoder.encode(userSignUpRequestBody.password()),
                userSignUpRequestBody.name(),
                userSignUpRequestBody.email()));

    return User.from(userEntity);
  }

  public UserAuthenticationResponse authenticate(UserLoginRequestBody userLoginRequestBody) {
    var userEntity = getUserEntityByUsername(userLoginRequestBody.username());

    if (passwordEncoder.matches(userLoginRequestBody.password(), userEntity.getPassword())) {
      var accessToken = jwtService.generateAccessToken(userEntity);
      return new UserAuthenticationResponse(accessToken);
    } else {
      throw new UserNotFoundException();
    }
  }

  private UserEntity getUserEntityByUsername(String username) {
    return userEntityCacheRepository
        .getUserEntityCache(username)
        .orElseGet(
            () -> {
              var userEntity =
                  userEntityRepository
                      .findByUsername(username)
                      .orElseThrow(() -> new UserNotFoundException(username));
              userEntityCacheRepository.setUserEntityCache(userEntity);
              return userEntity;
            });
  }
}
