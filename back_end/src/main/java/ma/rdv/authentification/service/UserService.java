package ma.rdv.authentification.service;

import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.web.request.CreateUserRequest;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import ma.rdv.authentification.web.request.SetStateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    void createUserWithRoles(CreateUserRequest request);
    Role saveRole(Role role);
    void setStateUser(SetStateRequest setStateRequest);
    void addRoleToUser(RoleToUserRequest roleToUserRequest);
    User getUser(String username);
    Page<User> getUsers(Specification<User> specification, Pageable pageable);
}
