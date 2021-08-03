package ma.rdv.authentification.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.rdv.authentification.utils.StateEnum;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "users")
@SQLDelete(sql = "UPDATE users SET state = 'DELETED' WHERE id=?", check = ResultCheckStyle.COUNT)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    @Column(unique=true)
    private String username;
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private StateEnum state = StateEnum.ACTIVE;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

}
