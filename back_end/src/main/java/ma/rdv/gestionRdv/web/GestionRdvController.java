package ma.rdv.gestionRdv.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.client.domain.Client;
import ma.rdv.client.utils.NotDeletedClientSpec;
import ma.rdv.gestionRdv.domain.GestionRdv;
import ma.rdv.gestionRdv.service.GestionRdvService;
import ma.rdv.gestionRdv.utils.NotDeletedGestionRdvSpec;
import ma.rdv.gestionRdv.web.request.RdvRequest;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class GestionRdvController {
    private final GestionRdvService gestionRdvService;

    @GetMapping("gestionrdvs")
    public ResponseEntity<Page<GestionRdv>> getAll(@RequestParam String dateRdv, Pageable pageable
    ) throws ParseException {
         return ResponseEntity
                .ok()
                .body(this.gestionRdvService.getAll(new SimpleDateFormat("yyyy-MM-dd").parse(dateRdv), pageable));
    }

    @PostMapping("gestionrdv")
    public ResponseEntity<GestionRdv> save(@RequestBody GestionRdv request) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/gestionrdv").toUriString());
        return ResponseEntity
                .created(uri).body(this.gestionRdvService.save(request));
    }

    @PutMapping("gestionrdv/{id}")
    public ResponseEntity<GestionRdv> update(@PathVariable Long id, @RequestBody GestionRdv request) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/gestionrdv").toUriString());
        return ResponseEntity
                .created(uri).body(this.gestionRdvService.update(request));
    }

    @DeleteMapping("gestionrdv/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        this.gestionRdvService.delete(id);
        return ResponseEntity.ok().build();
    }
}
