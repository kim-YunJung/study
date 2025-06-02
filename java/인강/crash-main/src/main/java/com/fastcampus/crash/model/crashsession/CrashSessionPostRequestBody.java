package com.fastcampus.crash.model.crashsession;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.ZonedDateTime;

public record CrashSessionPostRequestBody(
    @NotEmpty String title,
    @NotEmpty String body,
    @NotNull CrashSessionCategory category,
    @NotNull ZonedDateTime dateTime,
    @NotNull Long speakerId) {}
