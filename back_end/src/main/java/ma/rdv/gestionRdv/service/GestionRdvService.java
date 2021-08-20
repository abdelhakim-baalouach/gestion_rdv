package ma.rdv.gestionRdv.service;

import ma.rdv.gestionRdv.domain.GestionRdv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

public interface GestionRdvService {
    Page<GestionRdv> getAll(Date date, Pageable pageable);
    GestionRdv save(GestionRdv gestionRdv);
    GestionRdv update(GestionRdv gestionRdv);
    void delete(Long id);
}
