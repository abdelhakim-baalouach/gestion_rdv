package ma.rdv;

import ma.rdv.authentification.domain.Role;
import ma.rdv.authentification.domain.User;
import ma.rdv.authentification.service.UserService;
import ma.rdv.authentification.utils.AclRoleEnum;
import ma.rdv.authentification.utils.StateEnum;
import ma.rdv.authentification.web.request.RoleToUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;

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
		User admin = new User(null, "Admin name", "role_admin", "1234", StateEnum.ACTIVE, new ArrayList<>());
		userService.saveUser(admin);

		/**
		 * for test
		 */
		Role ROLE_ADMIN = new Role(null, "ROLE_ADMIN");
		userService.saveRole(ROLE_ADMIN);
		RoleToUserRequest addRoleAdmin = new RoleToUserRequest("role_admin", "ROLE_ADMIN");
		userService.addRoleToUser(addRoleAdmin);

		/**
		 * ACL Client
		 */

		Role ROLE_CLIENT = new Role(null, "ROLE_CLIENT");
		Role ROLE_CLIENT_ADD = new Role(null, "ROLE_CLIENT_ADD");
		Role ROLE_CLIENT_UPDATE = new Role(null, "ROLE_CLIENT_UPDATE");
		Role ROLE_CLIENT_DELETE = new Role(null, "ROLE_CLIENT_DELETE");

		userService.saveRole(ROLE_CLIENT);
		userService.saveRole(ROLE_CLIENT_ADD);
		userService.saveRole(ROLE_CLIENT_UPDATE);
		userService.saveRole(ROLE_CLIENT_DELETE);


		RoleToUserRequest addROLE_CLIENT = new RoleToUserRequest("role_admin", "ROLE_CLIENT");
		RoleToUserRequest addROLE_CLIENT_ADD= new RoleToUserRequest("role_admin", "ROLE_CLIENT_ADD");
		RoleToUserRequest addROLE_CLIENT_UPDATE = new RoleToUserRequest("role_admin", "ROLE_CLIENT_UPDATE");
		RoleToUserRequest addROLE_CLIENT_DELETE = new RoleToUserRequest("role_admin", "ROLE_CLIENT_DELETE");

		userService.addRoleToUser(addROLE_CLIENT);
		userService.addRoleToUser(addROLE_CLIENT_ADD);
		userService.addRoleToUser(addROLE_CLIENT_UPDATE);
		userService.addRoleToUser(addROLE_CLIENT_DELETE);

		/**
		 * ACL ROLE_USER
		 */

		Role ROLE_USER = new Role(null, "ROLE_USER");
		Role ROLE_USER_ADD = new Role(null, "ROLE_USER_ADD");
		Role ROLE_USER_UPDATE = new Role(null, "ROLE_USER_UPDATE");
		Role ROLE_USER_DELETE = new Role(null, "ROLE_USER_DELETE");

		userService.saveRole(ROLE_USER);
		userService.saveRole(ROLE_USER_ADD);
		userService.saveRole(ROLE_USER_UPDATE);
		userService.saveRole(ROLE_USER_DELETE);


		RoleToUserRequest addROLE_USER = new RoleToUserRequest("role_admin", "ROLE_USER");
		RoleToUserRequest addROLE_USER_ADD= new RoleToUserRequest("role_admin", "ROLE_USER_ADD");
		RoleToUserRequest addROLE_USER_UPDATE = new RoleToUserRequest("role_admin", "ROLE_USER_UPDATE");
		RoleToUserRequest addROLE_USER_DELETE = new RoleToUserRequest("role_admin", "ROLE_USER_DELETE");

		userService.addRoleToUser(addROLE_USER);
		userService.addRoleToUser(addROLE_USER_ADD);
		userService.addRoleToUser(addROLE_USER_UPDATE);
		userService.addRoleToUser(addROLE_USER_DELETE);


	}
}
