package ma.rdv.client.service;


import ma.rdv.client.domain.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface ClientService {
    Page<Client> getAllClient(Specification<Client> specification, Pageable pageable);
    Client save(Client client);
    Client update(Client client);
    void delete(Long id);
}
