package ma.rdv.client.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.rdv.authentification.utils.StateEnum;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE clients SET state = 'DELETED' WHERE id=?", check = ResultCheckStyle.COUNT)
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomContact;
    private String telephone;
    private String adresse;
    private String chiffreAffaire;

    @Enumerated(EnumType.STRING)
    private StateEnum state = StateEnum.ACTIVE;
}
