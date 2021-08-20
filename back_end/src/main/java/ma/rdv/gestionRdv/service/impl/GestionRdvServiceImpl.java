package ma.rdv.gestionRdv.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.appConfig.domain.AppConfig;
import ma.rdv.appConfig.repository.AppConfigRepository;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.client.domain.Client;
import ma.rdv.client.repository.ClientRepository;
import ma.rdv.error.ResourceNotFoundException;
import ma.rdv.gestionRdv.domain.GestionRdv;
import ma.rdv.gestionRdv.repository.GestionRdvRepository;
import ma.rdv.gestionRdv.service.GestionRdvService;
import ma.rdv.gestionRdv.web.request.RdvRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GestionRdvServiceImpl implements GestionRdvService {
    private final GestionRdvRepository gestionRdvRepository;
    private final AppConfigRepository appConfigRepository;
    private final ClientRepository clientRepository;

    @Override
    public Page<GestionRdv> getAll(Date date, Pageable pageable) {
        log.info("Fetching GestionRdv: page {} and size {}", pageable.getPageNumber(), pageable.getPageSize());
        return this.gestionRdvRepository.findAllByDateOrderByTimeAsc(date, pageable);
    }

    @Override
    public GestionRdv save(GestionRdv request) {
        log.info("Saving new Rdv clientId {} to the database", request.getId());
        long epochMilli = request.getDateRdv().toInstant().toEpochMilli();
        request.setState(StateEnum.ACTIVE);
        request.setDate(new Date(epochMilli));
        request.setTime(new Date(epochMilli));
        return this.gestionRdvRepository.saveAndFlush(request);
    }

    @Override
    public GestionRdv update(GestionRdv request) {
        log.info("Update RDV ID {}", request.getId());
        return this.gestionRdvRepository.saveAndFlush(request);
    }

    @Override
    public void delete(Long id) {
        log.info("Delete RDV ID {}", id);
        this.gestionRdvRepository
                .findById(id)
                .ifPresent(rdv -> {
                    rdv.setState(StateEnum.DELETED);
                });
    }

    public GestionRdv mapToGestionRdv(RdvRequest request) {
        Client client = this.clientRepository.findById(request.getClient_id())
                .orElseThrow(() -> new ResourceNotFoundException("Client"));

        AppConfig canal = this.appConfigRepository.findById(request.getCanal_id())
                .orElseThrow(() -> new ResourceNotFoundException("Canal"));

        AppConfig secteur = this.appConfigRepository.findById(request.getSecteur_id())
                .orElseThrow(() -> new ResourceNotFoundException("Secteur"));

        AppConfig type_rdv = this.appConfigRepository.findById(request.getCanal_id())
                .orElseThrow(() -> new ResourceNotFoundException("Type RDV"));

        GestionRdv gestionRdv = new GestionRdv();
        gestionRdv.setId(request.getId());
        gestionRdv.setCanal(canal);
        gestionRdv.setSecteur(secteur);
        gestionRdv.setType_rdv(type_rdv);
        gestionRdv.setClient(client);
        gestionRdv.setDateRdv(request.getDateRdv());
        gestionRdv.setRaison(request.getRaison());
        gestionRdv.setNatureContact(request.getNatureContact());
        gestionRdv.setTypeAdequatRDV(request.getTypeAdequatRDV());
        gestionRdv.setState(StateEnum.ACTIVE);
        return gestionRdv;
    }
}
