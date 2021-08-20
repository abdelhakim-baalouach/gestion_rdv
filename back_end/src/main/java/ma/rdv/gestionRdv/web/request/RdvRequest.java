package ma.rdv.gestionRdv.web.request;

import lombok.Data;
import ma.rdv.gestionRdv.utils.NatureContact;
import ma.rdv.gestionRdv.utils.TypeAdequatRDV;

import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Data
public class RdvRequest {
    private Long id;
    @NotNull
    private OffsetDateTime dateRdv;
    @NotNull
    private String raison;
    @NotNull
    private TypeAdequatRDV typeAdequatRDV;
    @NotNull
    private NatureContact natureContact;
    @NotNull
    private Long client_id;
    @NotNull
    private Long canal_id;
    @NotNull
    private Long type_rdv_id;
    @NotNull
    private Long secteur_id;
}
