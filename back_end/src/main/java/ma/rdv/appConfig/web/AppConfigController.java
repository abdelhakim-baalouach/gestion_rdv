package ma.rdv.appConfig.web;

import lombok.RequiredArgsConstructor;
import ma.rdv.appConfig.domain.AppConfig;
import ma.rdv.appConfig.service.AppConfigService;
import ma.rdv.appConfig.utils.NotDeletedAppConfigSpec;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Conjunction;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AppConfigController {
    private final AppConfigService appConfigService;

    @GetMapping("appconfigs")
    public ResponseEntity<Page<AppConfig>> getByType(
            @Conjunction(value = {
                    @Or({
                            @Spec(path="nom", params="nom", spec= LikeIgnoreCase.class)
                    }),
            }, and = @Spec(path="typeEnum", params="typeEnum", spec= Equal.class))
                NotDeletedAppConfigSpec specification, Pageable pageable
        ) {
        return ResponseEntity
                .ok()
                .body(this.appConfigService.getAllByType(specification, pageable));
    }

    @PostMapping("appconfig")
    public ResponseEntity<AppConfig> save(@RequestBody AppConfig appConfig) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("appconfig").toUriString());
        return ResponseEntity
                .created(uri).body(this.appConfigService.save(appConfig));
    }

    @PutMapping("appconfig/{id}")
    public ResponseEntity<AppConfig> update(@PathVariable Long id, @RequestBody AppConfig appConfig) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("appconfig").toUriString());
        return ResponseEntity
                .created(uri).body(this.appConfigService.update(appConfig));
    }

    @DeleteMapping("appconfig/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        this.appConfigService.delete(id);
        return ResponseEntity.ok().build();
    }
}
