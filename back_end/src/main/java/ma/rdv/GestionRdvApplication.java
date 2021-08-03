package ma.rdv;

import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.service.UserService;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
public class GestionRdvApplication implements CommandLineRunner {

	private final UserService userService;

	public GestionRdvApplication(UserService userService) {
		this.userService = userService;
	}

	public static void main(String[] args) {
		SpringApplication.run(GestionRdvApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Role ROLE_USER = new Role(null, "ROLE_USER");
		Role ROLE_ADMIN = new Role(null, "ROLE_ADMIN");

		userService.saveRole(ROLE_USER);
		userService.saveRole(ROLE_ADMIN);

		User admin = new User(null, "Admin name", "role_admin", "1234", StateEnum.ACTIVE, new ArrayList<>());
		User user = new User(null, "Admin name", "role_user", "1234", StateEnum.ACTIVE, new ArrayList<>());

		userService.saveUser(user);
		userService.saveUser(admin);

		RoleToUserRequest addRoleAdmin = new RoleToUserRequest("role_admin", "ROLE_ADMIN");
		RoleToUserRequest addRoleAdminu = new RoleToUserRequest("role_admin", "ROLE_USER");
		RoleToUserRequest addRoleUser = new RoleToUserRequest("role_user", "ROLE_USER");

		userService.addRoleToUser(addRoleAdmin);
		userService.addRoleToUser(addRoleAdminu);
		userService.addRoleToUser(addRoleUser);


	}
}
