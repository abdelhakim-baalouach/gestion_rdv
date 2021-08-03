package ma.rdv.authentification.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class PasswordConfig {
    @Bean
    public BCryptPasswordEncoder getBCPE(){
        return new BCryptPasswordEncoder();
    }
}
