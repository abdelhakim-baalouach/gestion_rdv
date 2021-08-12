package ma.rdv.authentification.utils;

import ma.rdv.authentification.domain.User;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.NotEqual;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;


@And({
        @Spec(path = "state", constVal = "DELETED", spec = NotEqual.class),
        @Spec(path = "id", constVal = "1", spec = NotEqual.class)
})
public interface NotDeletedUserSpec extends Specification<User> {
}
