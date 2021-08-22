package ma.rdv.authentification.web.request;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class UpdatePassword {
    @NotNull
    private String username;
    @NotNull
    private String password;
}
