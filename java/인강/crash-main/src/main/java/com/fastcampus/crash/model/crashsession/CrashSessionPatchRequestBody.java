package com.fastcampus.crash.model.crashsession;

import java.time.ZonedDateTime;

public record CrashSessionPatchRequestBody(
    String title,
    String body,
    CrashSessionCategory category,
    ZonedDateTime dateTime,
    Long speakerId) {}
