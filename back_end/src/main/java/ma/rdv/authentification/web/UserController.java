package ma.rdv.authentification.web;

import lombok.RequiredArgsConstructor;
import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.service.UserService;
import ma.rdv.authentification.utils.NotDeletedUserSpec;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getUsers(
            NotDeletedUserSpec specification, Pageable pageable
    ) {
        return ResponseEntity
                .ok()
                .body(this.userService.getUsers(specification, pageable));
    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users").toUriString());
        return ResponseEntity
                .created(uri).body(this.userService.saveUser(user));
    }

    @PostMapping("/roles")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/roles").toUriString());
        return ResponseEntity
                .created(uri).body(this.userService.saveRole(role));
    }

    @PostMapping("/roles/addToUser")
    public ResponseEntity<?> saveRole(@RequestBody RoleToUserRequest roleToUserRequest) {
        this.userService.addRoleToUser(roleToUserRequest);
        return ResponseEntity
                .ok().build();
    }
}
