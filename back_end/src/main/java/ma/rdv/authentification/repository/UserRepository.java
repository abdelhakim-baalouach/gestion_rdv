package ma.rdv.authentification.repository;

import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.utils.StateEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    User findByUsernameAndState(String username, StateEnum stateEnum);
    Page<User> findAll(Specification<User> specification, Pageable pageable);
}
