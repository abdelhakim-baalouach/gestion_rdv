package ma.rdv.appConfig.service;

import ma.rdv.appConfig.domain.AppConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface AppConfigService {
    Page<AppConfig> getAllByType(Specification<AppConfig> specification, Pageable pageable);
    AppConfig save(AppConfig appConfig);
    AppConfig update(AppConfig appConfig);
    void delete(Long id);
}
