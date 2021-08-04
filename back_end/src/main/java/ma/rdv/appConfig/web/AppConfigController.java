package ma.rdv.appConfig.web;

import lombok.RequiredArgsConstructor;
import ma.rdv.appConfig.domain.AppConfig;
import ma.rdv.appConfig.service.AppConfigService;
import ma.rdv.appConfig.utils.NotDeletedAppConfigSpec;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.utils.NotDeletedUserSpec;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppConfigController {
    private final AppConfigService appConfigService;

    @GetMapping("/appconfis")
    public ResponseEntity<Page<AppConfig>> getByType(
            @Or({
                    @Spec(path="id", params="id", spec= Equal.class),
                    @Spec(path="typeEnum", params="typeEnum", spec= Equal.class),
            })  NotDeletedAppConfigSpec specification, Pageable pageable
    ) {
        return ResponseEntity
                .ok()
                .body(this.appConfigService.getAllByType(specification, pageable));
    }

    @PostMapping("/appconfis")
    public ResponseEntity<AppConfig> save(@RequestBody AppConfig appConfig) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/appconfis").toUriString());
        return ResponseEntity
                .created(uri).body(this.appConfigService.save(appConfig));
    }

    @PutMapping("/appconfis")
    public ResponseEntity<AppConfig> update(@RequestBody AppConfig appConfig) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/appconfis").toUriString());
        return ResponseEntity
                .created(uri).body(this.appConfigService.update(appConfig));
    }

    @DeleteMapping("/appconfis/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        this.appConfigService.delete(id);
        return ResponseEntity.ok().build();
    }
}
