package ma.rdv.appConfig.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.appConfig.domain.AppConfig;
import ma.rdv.appConfig.repository.AppConfigRepository;
import ma.rdv.appConfig.service.AppConfigService;
import ma.rdv.authentification.utils.StateEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AppConfigServiceImpl implements AppConfigService {
    private final AppConfigRepository appConfigRepository;

    @Override
    public Page<AppConfig> getAllByType(Specification<AppConfig> specification, Pageable pageable) {
        log.info("Fetching appConfig by Typ, page {} and size {}", pageable.getPageNumber(), pageable.getPageSize());
        return this.appConfigRepository.findAll(specification, pageable);
    }

    @Override
    public AppConfig save(AppConfig appConfig) {
        log.info("Saving new {} type {} to the database", appConfig.getNom(), appConfig.getTypeEnum());
        appConfig.setState(StateEnum.ACTIVE);
        return this.appConfigRepository.saveAndFlush(appConfig);
    }

    @Override
    public AppConfig update(AppConfig appConfig) {
        log.info("Update appConfig ID {}", appConfig.getId());
        return this.appConfigRepository.saveAndFlush(appConfig);
    }

    @Override
    public void delete(Long id) {
        log.info("Delete appConfig ID {}", id);
        this.appConfigRepository
                .findById(id)
                .ifPresent(appConfig -> {
                    appConfig.setState(StateEnum.DELETED);
                });
    }
}
