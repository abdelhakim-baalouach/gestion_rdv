package ma.rdv.client.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.client.domain.Client;
import ma.rdv.client.repository.ClientRepository;
import ma.rdv.client.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    @Override
    public Page<Client> getAllClient(Specification<Client> specification, Pageable pageable) {
        log.info("Fetching client: page {} and size {}", pageable.getPageNumber(), pageable.getPageSize());
        return this.clientRepository.findAll(specification, pageable);
    }

    @Override
    public Client save(Client client) {
        log.info("Saving new client {} to the database", client.getNomContact());
        client.setState(StateEnum.ACTIVE);
        return this.clientRepository.saveAndFlush(client);
    }

    @Override
    public Client update(Client client) {
        log.info("Update client ID {}", client.getId());
        return this.clientRepository.saveAndFlush(client);
    }

    @Override
    public void delete(Long id) {
        log.info("Delete appConfig ID {}", id);
        this.clientRepository
                .findById(id)
                .ifPresent(appConfig -> {
                    appConfig.setState(StateEnum.DELETED);
                });
    }
}
