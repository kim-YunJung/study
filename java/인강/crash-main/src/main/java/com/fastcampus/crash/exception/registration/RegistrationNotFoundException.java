package com.fastcampus.crash.exception.registration;

import com.fastcampus.crash.exception.ClientErrorException;
import com.fastcampus.crash.model.entity.UserEntity;
import org.springframework.http.HttpStatus;

public class RegistrationNotFoundException extends ClientErrorException {
  public RegistrationNotFoundException() {
    super(HttpStatus.NOT_FOUND, "Registration not found.");
  }

  public RegistrationNotFoundException(Long registrationId, UserEntity userEntity) {
    super(
        HttpStatus.NOT_FOUND,
        "Registration with registrationId "
            + registrationId
            + " and name "
            + userEntity.getName()
            + " not found.");
  }
}
