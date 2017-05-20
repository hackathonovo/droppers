package hr.hgss.api.user;

import hr.hgss.api.Keys;
import hr.hgss.api.security.SecurityUtils;
import java.util.Objects;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * Created by Fredi Šarić on 29.04.17..
 */
@Log
@RestController
@RequestMapping(value = Keys.API_ENPOINT + "users", produces = APPLICATION_JSON_VALUE)
public class UserService {

	// Needed for updates.
	private final MongoTemplate userMongoTemplate;
	private final UserRepo userRepo;

	@Autowired
	public UserService(MongoTemplate userMongoTemplate, UserRepo userRepo) {
		this.userMongoTemplate = userMongoTemplate;
		this.userRepo = userRepo;
	}



	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User login(
		@RequestBody String userNameAndPass,
		HttpServletResponse response
	) {
		JSONObject json = new JSONObject(userNameAndPass);
		String userName = json.getString(Keys.USERNAME);
		String pass = json.getString(Keys.PASS);

		User user = userRepo.findByUserName(userName);

		if (user == null) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return null;
		}
		if (!Objects.equals(user.getPassHash(), SecurityUtils.getPassHash(pass))) {
			response.setStatus(HttpStatus.FORBIDDEN.value());
			return null;
		}

		response.setHeader(Keys.X_AUTHORIZATION_TOKEN, user.getAccessToken());
		return user;
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User register(
		@RequestParam("name") String name,
		@RequestParam("username") String username,
		@RequestParam("pass") String pass,
		@RequestParam("email") String email,
		@RequestParam("phone_number") String phoneNumber
	) {
		User inMongo = userRepo.findByUserName(username);
		if (inMongo != null) {

		}


		User user = User.builder()
			.name(name)
			.userName(username)
			.passHash(SecurityUtils.getPassHash(pass))
			.email(email)
			.phoneNumber(phoneNumber)
			.build();
		return null;
	}

//	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
//	public User getUser(@PathVariable  Long id) {
//		User one = userRepository.findOne(id);
//		if (one == null) throw new UserMissingException(id);
//		return one;
//	}
//
//	@RequestMapping(value = "/{id}/location", method = RequestMethod.GET)
//	public GeoJsonPoint getUserLocation(@PathVariable Long id) {
//		return null;
//	}
//
//	@RequestMapping(value = "/{id}/location", method = RequestMethod.POST)
//	public void saveUserLocation(@PathVariable Long id, @RequestParam("point") GeoJsonPoint newLocation) {
//		WriteResult writeResult = userMongoTemplate.updateFirst(
//			Query.query(Criteria.where(Key.USER_ID).is(id)),
//			Update.update(Key.LOCATION, newLocation),
//			User.class
//		);
//		if (writeResult.getN() == 0) throw new UserMissingException(id);
//
//		try (Jedis rdb = redisManager.get(Redises.GEO)) {
//			Transaction multi = rdb.multi();
//			String key = String.valueOf(id);
//
//			multi.lpush(key, PointInTimeAndSpace.builder()
//				.longitude(newLocation.getX())
//				.latitude(newLocation.getY())
//				.timestamp(time.currentTimestampSec())
//				.build().getRedisValue()
//			);
//			multi.ltrim(key, 0, MAX_NUMBER_OF_USER_LOCATIONS_STORED);
//			multi.exec();
//		}
//	}
//
//	@RequestMapping(value = "/{id}/path", method = RequestMethod.GET)
//	public List<PointInTimeAndSpace> getUserPath(@PathVariable Long id) {
//		if (!userRepository.exists(id)) throw new UserMissingException(id);
//		try (Jedis rdb = redisManager.get(Redises.GEO)) {
//			List<String> path = rdb.lrange(String.valueOf(id), 0, -1);
//			if (path == null) return Collections.emptyList();
//			return StreamEx.of(path).map(PointInTimeAndSpace::new).toList();
//		}
//	}

//	@Data @Builder @RequiredArgsConstructor
//	public static final class PointInTimeAndSpace {
//		private final long timestamp;
//		private final double longitude;
//		private final double latitude;
//		PointInTimeAndSpace(String redisRepresentation) {
//			String[] parts = redisRepresentation.split("_");
//			longitude = Double.parseDouble(parts[0]);
//			latitude = Double.parseDouble(parts[1]);
//			timestamp = Long.parseLong(parts[2]);
//		}
//
//		private String getRedisValue() {
//			return longitude + "_" + latitude + "_" + timestamp;
//		}
//	}
}
