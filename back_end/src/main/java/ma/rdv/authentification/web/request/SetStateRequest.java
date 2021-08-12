package ma.rdv.authentification.web.request;

import lombok.Data;
import ma.rdv.authentification.utils.StateEnum;

import javax.validation.constraints.NotNull;

@Data
public class SetStateRequest {
    @NotNull
    private Long id;
    @NotNull
    private StateEnum status;
}
