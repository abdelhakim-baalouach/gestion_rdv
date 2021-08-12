package ma.rdv.authentification.web;

import lombok.RequiredArgsConstructor;
import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.service.UserService;
import ma.rdv.authentification.utils.NotDeletedUserSpec;
import ma.rdv.authentification.web.request.CreateUserRequest;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import ma.rdv.authentification.web.request.SetStateRequest;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
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
public class UserController {
    private final UserService userService;

    @GetMapping("users")
    public ResponseEntity<Page<User>> getUsers(
            @Or({
                    @Spec(path="username", params="username", spec= Like.class),
                    @Spec(path="username", params="q", spec= Equal.class),
            })
            NotDeletedUserSpec specification, Pageable pageable
    ) {
        return ResponseEntity
                .ok()
                .body(this.userService.getUsers(specification, pageable));
    }

    @PostMapping("userWithRoles")
    public ResponseEntity<?> saveUser(@RequestBody CreateUserRequest user) {
        this.userService.createUserWithRoles(user);
        return ResponseEntity
                .ok().build();
    }

    @PostMapping("user/setState")
    public ResponseEntity<?> setState(@RequestBody SetStateRequest setState) {
        this.userService.setStateUser(setState);
        return ResponseEntity
                .ok().build();
    }

    @PostMapping("roles/addToUser")
    public ResponseEntity<?> saveRole(@RequestBody RoleToUserRequest roleToUserRequest) {
        this.userService.addRoleToUser(roleToUserRequest);
        return ResponseEntity
                .ok().build();
    }
}
