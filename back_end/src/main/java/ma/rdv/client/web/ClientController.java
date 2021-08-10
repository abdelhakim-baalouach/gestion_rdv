package ma.rdv.client.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.client.domain.Client;
import ma.rdv.client.service.ClientService;
import ma.rdv.client.utils.NotDeletedClientSpec;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping("clients")
    public ResponseEntity<Page<Client>> getByType(
            @Or({
                    //@Spec(path="id", params="q", spec= Equal.class),
                    @Spec(path="nomContact", params="nomContact", spec= Like.class),
            }) NotDeletedClientSpec specification, Pageable pageable
    ) {
        return ResponseEntity
                .ok()
                .body(this.clientService.getAllClient(specification, pageable));
    }

    @PostMapping("client")
    public ResponseEntity<Client> save(@RequestBody Client client) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/clients").toUriString());
        return ResponseEntity
                .created(uri).body(this.clientService.save(client));
    }

    @PutMapping("client/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/clients").toUriString());
        return ResponseEntity
                .created(uri).body(this.clientService.update(client));
    }

    @DeleteMapping("client/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        this.clientService.delete(id);
        return ResponseEntity.ok().build();
    }
}
