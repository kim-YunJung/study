package com.fastcampus.crash.controller;

import com.fastcampus.crash.model.crashsession.CrashSession;
import com.fastcampus.crash.model.crashsession.CrashSessionPatchRequestBody;
import com.fastcampus.crash.model.crashsession.CrashSessionPostRequestBody;
import com.fastcampus.crash.model.crashsession.CrashSessionRegistrationStatus;
import com.fastcampus.crash.model.entity.UserEntity;
import com.fastcampus.crash.service.CrashSessionService;
import com.fastcampus.crash.service.RegistrationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/crash-sessions")
public class CrashSessionController {

  @Autowired private CrashSessionService crashSessionService;
  @Autowired private RegistrationService registrationService;

  @GetMapping
  public ResponseEntity<List<CrashSession>> getCrashSessions() {
    var crashSessions = crashSessionService.getCrashSessions();
    return ResponseEntity.ok(crashSessions);
  }

  @GetMapping("/{sessionId}")
  public ResponseEntity<CrashSession> getCrashSessionBySessionId(@PathVariable Long sessionId) {
    var crashSession = crashSessionService.getCrashSessionBySessionId(sessionId);
    return ResponseEntity.ok(crashSession);
  }

  @GetMapping("/{sessionId}/registration-status")
  public ResponseEntity<CrashSessionRegistrationStatus>
      getCrashSessionRegistrationStatusBySessionId(
          @PathVariable Long sessionId, Authentication authentication) {
    var registrationStatus =
        registrationService.getCrashSessionRegistrationStatusBySessionIdAndCurrentUser(
            sessionId, (UserEntity) authentication.getPrincipal());
    return ResponseEntity.ok(registrationStatus);
  }

  @PostMapping
  public ResponseEntity<CrashSession> createCrashSession(
      @Valid @RequestBody CrashSessionPostRequestBody crashSessionPostRequestBody) {
    var crashSession = crashSessionService.createCrashSession(crashSessionPostRequestBody);
    return ResponseEntity.ok(crashSession);
  }

  @PatchMapping("/{sessionId}")
  public ResponseEntity<CrashSession> updateCrashSession(
      @PathVariable Long sessionId,
      @RequestBody CrashSessionPatchRequestBody crashSessionPatchRequestBody) {
    var crashSession =
        crashSessionService.updateCrashSession(sessionId, crashSessionPatchRequestBody);
    return ResponseEntity.ok(crashSession);
  }

  @DeleteMapping("/{sessionId}")
  public ResponseEntity<Void> deleteCrashSession(@PathVariable Long sessionId) {
    crashSessionService.deleteCrashSession(sessionId);
    return ResponseEntity.noContent().build();
  }
}
