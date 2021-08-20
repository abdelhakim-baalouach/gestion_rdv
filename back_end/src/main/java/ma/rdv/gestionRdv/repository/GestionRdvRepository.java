package ma.rdv.gestionRdv.repository;

import ma.rdv.gestionRdv.domain.GestionRdv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Date;

@Repository
public interface GestionRdvRepository extends JpaRepository<GestionRdv, Long>, JpaSpecificationExecutor<GestionRdv> {
    Page<GestionRdv> findAllByDateOrderByTimeAsc(Date date, Pageable pageable);
}
