package com.fastcampus.crash.model.registration;

import jakarta.validation.constraints.NotNull;

public record RegistrationPostRequestBody(@NotNull Long sessionId) {}
