package ma.rdv.appConfig.utils;

import ma.rdv.appConfig.domain.AppConfig;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;

@Spec(path = "state", constVal = "ACTIVE", spec = Equal.class)
public interface NotDeletedAppConfigSpec extends Specification<AppConfig> {
}
