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
public class GestionRdvApplication {

	private final UserService userService;

	public GestionRdvApplication(UserService userService) {
		this.userService = userService;
	}

	public static void main(String[] args) {
		SpringApplication.run(GestionRdvApplication.class, args);
	}

	//@Override
	public void run(String... args) throws Exception {
		User admin = new User(null, "Admin name", "role_admin", "1234", StateEnum.ACTIVE, new ArrayList<>());
		userService.saveUser(admin);

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
		Role ROLE_USER_STATUS = new Role(null, "ROLE_USER_STATUS");

		userService.saveRole(ROLE_USER);
		userService.saveRole(ROLE_USER_ADD);
		userService.saveRole(ROLE_USER_UPDATE);
		userService.saveRole(ROLE_USER_STATUS);


		RoleToUserRequest addROLE_USER = new RoleToUserRequest("role_admin", "ROLE_USER");
		RoleToUserRequest addROLE_USER_ADD= new RoleToUserRequest("role_admin", "ROLE_USER_ADD");
		RoleToUserRequest addROLE_USER_UPDATE = new RoleToUserRequest("role_admin", "ROLE_USER_UPDATE");
		RoleToUserRequest addROLE_USER_STATUS = new RoleToUserRequest("role_admin", "ROLE_USER_STATUS");

		userService.addRoleToUser(addROLE_USER);
		userService.addRoleToUser(addROLE_USER_ADD);
		userService.addRoleToUser(addROLE_USER_UPDATE);
		userService.addRoleToUser(addROLE_USER_STATUS);

		/**
		 * ACL ROLE_CANAL
		 */

		Role ROLE_CANAL = new Role(null, "ROLE_CANAL");
		Role ROLE_CANAL_ADD = new Role(null, "ROLE_CANAL_ADD");
		Role ROLE_CANAL_UPDATE = new Role(null, "ROLE_CANAL_UPDATE");
		Role ROLE_CANAL_DELETE = new Role(null, "ROLE_CANAL_DELETE");

		userService.saveRole(ROLE_CANAL);
		userService.saveRole(ROLE_CANAL_ADD);
		userService.saveRole(ROLE_CANAL_UPDATE);
		userService.saveRole(ROLE_CANAL_DELETE);


		RoleToUserRequest addROLE_CANAL = new RoleToUserRequest("role_admin", "ROLE_CANAL");
		RoleToUserRequest addROLE_CANAL_ADD= new RoleToUserRequest("role_admin", "ROLE_CANAL_ADD");
		RoleToUserRequest addROLE_CANAL_UPDATE = new RoleToUserRequest("role_admin", "ROLE_CANAL_UPDATE");
		RoleToUserRequest addROLE_CANAL_DELETE = new RoleToUserRequest("role_admin", "ROLE_CANAL_DELETE");

		userService.addRoleToUser(addROLE_CANAL);
		userService.addRoleToUser(addROLE_CANAL_ADD);
		userService.addRoleToUser(addROLE_CANAL_UPDATE);
		userService.addRoleToUser(addROLE_CANAL_DELETE);

		/**
		 * ACL ROLE_TYPE_RDV
		 */

		Role ROLE_TYPE_RDV = new Role(null, "ROLE_TYPE_RDV");
		Role ROLE_TYPE_RDV_ADD = new Role(null, "ROLE_TYPE_RDV_ADD");
		Role ROLE_TYPE_RDV_UPDATE = new Role(null, "ROLE_TYPE_RDV_UPDATE");
		Role ROLE_TYPE_RDV_DELETE = new Role(null, "ROLE_TYPE_RDV_DELETE");

		userService.saveRole(ROLE_TYPE_RDV);
		userService.saveRole(ROLE_TYPE_RDV_ADD);
		userService.saveRole(ROLE_TYPE_RDV_UPDATE);
		userService.saveRole(ROLE_TYPE_RDV_DELETE);


		RoleToUserRequest addROLE_TYPE_RDVL = new RoleToUserRequest("role_admin", "ROLE_TYPE_RDV");
		RoleToUserRequest addROLE_TYPE_RDV_ADD= new RoleToUserRequest("role_admin", "ROLE_TYPE_RDV_ADD");
		RoleToUserRequest addROLE_TYPE_RDV_UPDATE= new RoleToUserRequest("role_admin", "ROLE_TYPE_RDV_UPDATE");
		RoleToUserRequest addROLE_TYPE_RDV_DELETE= new RoleToUserRequest("role_admin", "ROLE_TYPE_RDV_DELETE");

		userService.addRoleToUser(addROLE_TYPE_RDVL);
		userService.addRoleToUser(addROLE_TYPE_RDV_ADD);
		userService.addRoleToUser(addROLE_TYPE_RDV_UPDATE);
		userService.addRoleToUser(addROLE_TYPE_RDV_DELETE);

		/**
		 * ACL ROLE_SECTEUR
		 */

		Role ROLE_SECTEUR = new Role(null, "ROLE_SECTEUR");
		Role ROLE_SECTEUR_ADD = new Role(null, "ROLE_SECTEUR_ADD");
		Role ROLE_SECTEUR_UPDATE = new Role(null, "ROLE_SECTEUR_UPDATE");
		Role ROLE_SECTEUR_DELETE = new Role(null, "ROLE_SECTEUR_DELETE");

		userService.saveRole(ROLE_SECTEUR);
		userService.saveRole(ROLE_SECTEUR_ADD);
		userService.saveRole(ROLE_SECTEUR_UPDATE);
		userService.saveRole(ROLE_SECTEUR_DELETE);


		RoleToUserRequest addROLE_SECTEUR= new RoleToUserRequest("role_admin", "ROLE_SECTEUR");
		RoleToUserRequest addROLE_SECTEUR_ADD= new RoleToUserRequest("role_admin", "ROLE_SECTEUR_ADD");
		RoleToUserRequest addROLE_SECTEUR_UPDATE= new RoleToUserRequest("role_admin", "ROLE_SECTEUR_UPDATE");
		RoleToUserRequest addROLE_SECTEUR_DELETE= new RoleToUserRequest("role_admin", "ROLE_SECTEUR_DELETE");

		userService.addRoleToUser(addROLE_SECTEUR);
		userService.addRoleToUser(addROLE_SECTEUR_ADD);
		userService.addRoleToUser(addROLE_SECTEUR_UPDATE);
		userService.addRoleToUser(addROLE_SECTEUR_DELETE);

		/**
		 * ACL ROLE_RDV
		 */

		Role ROLE_RDV = new Role(null, "ROLE_RDV");
		Role ROLE_RDV_ADD = new Role(null, "ROLE_RDV_ADD");
		Role ROLE_RDV_UPDATE = new Role(null, "ROLE_RDV_UPDATE");
		Role ROLE_RDV_DELETE = new Role(null, "ROLE_RDV_DELETE");

		userService.saveRole(ROLE_RDV);
		userService.saveRole(ROLE_RDV_ADD);
		userService.saveRole(ROLE_RDV_UPDATE);
		userService.saveRole(ROLE_RDV_DELETE);


		RoleToUserRequest addROLE_RDV= new RoleToUserRequest("role_admin", "ROLE_RDV");
		RoleToUserRequest addROLE_RDV_ADD = new RoleToUserRequest("role_admin", "ROLE_RDV_ADD");
		RoleToUserRequest addROLE_RDV_UPDATE= new RoleToUserRequest("role_admin", "ROLE_RDV_UPDATE");
		RoleToUserRequest addROLE_RDV_DELETE= new RoleToUserRequest("role_admin", "ROLE_RDV_DELETE");

		userService.addRoleToUser(addROLE_RDV);
		userService.addRoleToUser(addROLE_RDV_ADD);
		userService.addRoleToUser(addROLE_RDV_UPDATE);
		userService.addRoleToUser(addROLE_RDV_DELETE);

		/**
		 * ACL ROLE_STATISTIQUE
		 */

		Role ROLE_STATISTIQUE = new Role(null, "ROLE_STATISTIQUE");
		userService.saveRole(ROLE_STATISTIQUE);
		RoleToUserRequest addROLE_STATISTIQUE= new RoleToUserRequest("role_admin", "ROLE_STATISTIQUE");
		userService.addRoleToUser(addROLE_STATISTIQUE);

	}
}
