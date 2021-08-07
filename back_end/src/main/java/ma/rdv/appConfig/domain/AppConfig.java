package ma.rdv.appConfig.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.rdv.appConfig.utils.TypeEnum;
import ma.rdv.authentification.utils.StateEnum;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;

@Entity
@Table(name = "appConfigs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE appConfigs SET state = 'DELETED' WHERE id=?", check = ResultCheckStyle.COUNT)
public class AppConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @Enumerated(EnumType.STRING)
    private TypeEnum typeEnum;

    @Enumerated(EnumType.STRING)
    private StateEnum state = StateEnum.ACTIVE;
}
