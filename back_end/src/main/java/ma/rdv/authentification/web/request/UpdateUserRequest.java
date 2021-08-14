package ma.rdv.authentification.web.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class UpdateUserRequest {
    @NotNull
    private String fullName;
    @NotNull
    private String username;
    @NotNull
    private List<String> roles = new ArrayList<>();
}
