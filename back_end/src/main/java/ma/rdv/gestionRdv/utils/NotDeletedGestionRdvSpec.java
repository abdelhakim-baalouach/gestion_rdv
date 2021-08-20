package ma.rdv.gestionRdv.utils;

import ma.rdv.gestionRdv.domain.GestionRdv;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;

@Spec(path = "state", constVal = "ACTIVE", spec = Equal.class)
public interface NotDeletedGestionRdvSpec extends Specification<GestionRdv> {
}
