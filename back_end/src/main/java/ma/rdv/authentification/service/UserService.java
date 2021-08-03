package ma.rdv.authentification.service;

import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(RoleToUserRequest roleToUserRequest);
    User getUser(String username);
    Page<User> getUsers(Specification<User> specification, Pageable pageable);
}
