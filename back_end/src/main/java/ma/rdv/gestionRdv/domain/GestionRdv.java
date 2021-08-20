package ma.rdv.gestionRdv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.rdv.appConfig.domain.AppConfig;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.client.domain.Client;
import ma.rdv.gestionRdv.utils.NatureContact;
import ma.rdv.gestionRdv.utils.TypeAdequatRDV;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Date;

@Entity
@Table(name = "gestion_rdv")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE gestion_rdv SET state = 'DELETED' WHERE id=?", check = ResultCheckStyle.COUNT)
public class GestionRdv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String telephone;
    @Temporal(TemporalType.DATE)
    @JsonIgnore
    private Date date;
    @Temporal(TemporalType.TIME)
    @JsonIgnore
    private Date time;
    @Column(name = "dateRdv", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime dateRdv;
    private String raison;
    @Enumerated(EnumType.STRING)
    private TypeAdequatRDV typeAdequatRDV;
    @Enumerated(EnumType.STRING)
    private NatureContact natureContact;
    @Enumerated(EnumType.STRING)
    private StateEnum state = StateEnum.ACTIVE;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "canal_id")
    private AppConfig canal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_rdv_id")
    private AppConfig type_rdv;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "secteur_id")
    private AppConfig secteur;
}
