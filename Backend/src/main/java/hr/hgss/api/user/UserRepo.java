package hr.hgss.api.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component
public interface UserRepo extends MongoRepository<User, String> {

	User findByEmail(String email);

	User findByAccessToken(String accessToken);
}
