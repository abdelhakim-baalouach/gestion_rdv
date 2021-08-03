package ma.rdv.authentification.web.request;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleToUserRequest {
    @NotNull
    private String username;
    @NotNull
    private String roleName;
}
