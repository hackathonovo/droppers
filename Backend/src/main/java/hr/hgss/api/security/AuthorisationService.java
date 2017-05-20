package hr.hgss.api.security;

import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import hr.hgss.api.Keys;
import hr.hgss.databes.redis.MongoCollections;
import java.math.BigInteger;
import java.security.SecureRandom;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component
public class AuthorisationService {

	private final MongoTemplate userRepository;

	private final SecureRandom random;

	@Autowired
	public AuthorisationService(MongoTemplate userRepository) {
		this.userRepository = userRepository;
		this.random = new SecureRandom();
	}

	public boolean authorise(String token) {
		DBCollection mc = userRepository.getCollection(MongoCollections.USERS);
		DBObject one = mc.findOne(new Document(Keys.ACCESS_TOKEN, token));
		return one != null;
	}

	public String generateAccessToken() {
		return new BigInteger(256, random).toString(32);
	}
}
