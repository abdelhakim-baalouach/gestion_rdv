package ma.rdv.appConfig.repository;

import ma.rdv.appConfig.domain.AppConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AppConfigRepository extends JpaRepository<AppConfig, Long>, JpaSpecificationExecutor<AppConfig> {
    Page<AppConfig> findAll(Specification<AppConfig> specification, Pageable pageable);
}
