package ma.rdv.authentification.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.repository.RoleRepository;
import ma.rdv.authentification.repository.UserRepository;
import ma.rdv.authentification.service.UserService;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to the database", user.getFullName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setState(StateEnum.ACTIVE);
        return this.userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return this.roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(RoleToUserRequest roleToUserRequest) {
        log.info("Adding role {} to user {}", roleToUserRequest.getRoleName(), roleToUserRequest.getUsername());
        User user = this.userRepository.findByUsernameAndState(roleToUserRequest.getUsername(), StateEnum.ACTIVE);
        Role role = this.roleRepository.findByName(roleToUserRequest.getRoleName());
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user {} ", username);
        return this.userRepository.findByUsernameAndState(username, StateEnum.ACTIVE);
    }

    @Override
    public Page<User> getUsers(Specification<User> specification, Pageable pageable) {
        log.info("Fetching users page {} and size {}", pageable.getPageNumber(), pageable.getPageSize());
        return this.userRepository.findAll(specification, pageable);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsernameAndState(username, StateEnum.ACTIVE);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(
                role -> {
                    authorities.add(new SimpleGrantedAuthority(role.getName()));
                }
        );
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(), authorities);
    }
}
