package hr.hgss;

import hr.hgss.api.Keys;
import hr.hgss.api.security.AuthorisationService;
import hr.hgss.api.security.SecurityUtils;
import hr.hgss.api.user.User;
import hr.hgss.api.user.UserRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

/**
 *
 * Created by Fredi Šarić on 27.04.17..
 */
@ComponentScan
@SpringBootApplication
@Import(Config.class)
public class App {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(App.class, args);
		UserRepo userRepo = context.getBean(UserRepo.class);
		User admin = userRepo.findByEmail(Keys.ADMIN_EMAIL);
		if (admin == null) {
			// Register admin;
			User build = User.builder()
				.email(Keys.ADMIN_EMAIL)
				.passHash(SecurityUtils.getPassHash(Keys.ADMIN))
				.accessToken(context.getBean(AuthorisationService.class).generateAccessToken())
				.build();
			userRepo.insert(build);
		}
	}
}

