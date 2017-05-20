package hr.hgss.api.user;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;
import hr.hgss.Time;
import static hr.hgss.Util.ifNotNull;
import hr.hgss.api.Keys;
import hr.hgss.api.security.AuthorisationService;
import hr.hgss.api.security.SecurityUtils;
import hr.hgss.api.user.models.ExtraAvailablePeriod;
import hr.hgss.api.user.models.LoginModel;
import hr.hgss.api.user.models.RegisterModel;
import hr.hgss.api.user.models.SetLocationModel;
import hr.hgss.databes.redis.MongoCollections;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.BasicUpdate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Fredi Šarić on 29.04.17..
 */
@Log
@CrossOrigin
@RestController
@RequestMapping(value = Keys.API_ENPOINT + "users", produces = APPLICATION_JSON_VALUE)
public class UserService {

	// Needed for updates.
	private final AuthorisationService authorisationService;
	private final UserRepo userRepo;
	private final MongoOperations userOperations;
	private final Time time;
	private final MongoTemplate mongoTemplate;

	@Autowired
	public UserService(AuthorisationService authorisationService, UserRepo userRepo, MongoOperations userOperations, Time time, MongoTemplate mongoTemplate) {
		this.authorisationService = authorisationService;
		this.userRepo = userRepo;
		this.userOperations = userOperations;
		this.time = time;
		this.mongoTemplate = mongoTemplate;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<User> getAll() {
		return userRepo.findAll();
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public User getUser(@RequestParam("id") String id, HttpServletResponse response) {
		User user = userOperations.findOne(
			Query.query(Criteria.where("_id").is(id)),
			User.class,
			MongoCollections.USERS
		);
		if (user == null) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return null;
		}
		return user;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User updateUser(@RequestBody User updatedUser, HttpServletResponse response) {
		DBObject dbObject = updatedUser.toDbObject();
		dbObject.removeField("_id");
		WriteResult writeResult = userOperations.updateFirst(
			Query.query(Criteria.where("_id").is(updatedUser.getId())),
			Update.fromDBObject(new BasicDBObject("$set", dbObject), "_id"),
			User.class
		);
		if (writeResult.getN() == 0) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return null;
		}
		return updatedUser;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
		User user = userRepo.findByEmail(loginModel.getEmail());
		if (user != null && loginModel.getIosToken() != null) {
			Set<String> tokens = user.getIosTokens();
			if (tokens == null) {
				tokens = new HashSet<>();
				user.setIosTokens(tokens);
			}
			tokens.add(loginModel.getIosToken());
			userRepo.save(user);
		}

		if (user == null) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return null;
		}
		if (!Objects.equals(user.getPassHash(), SecurityUtils.getPassHash(loginModel.getPassword()))) {
			response.setStatus(HttpStatus.FORBIDDEN.value());
			return null;
		}

		response.setHeader(Keys.X_AUTHORIZATION_TOKEN, user.getAccessToken());
		return user;
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User register(@RequestBody RegisterModel registerModel, HttpServletResponse response) {
		String email = registerModel.getEmail();
		User userByEmail = userRepo.findByEmail(email);
		if (userByEmail != null) {
			response.setStatus(HttpStatus.CONFLICT.value());
			return null;
		}

		// Generate unique token
		String token;
		while (true) {
			token = authorisationService.generateAccessToken();
			if (userRepo.findByAccessToken(token) == null) break;
		}

		response.addHeader(Keys.X_AUTHORIZATION_TOKEN, token);
		User user = User.builder()
			.email(registerModel.getEmail())
			.phoneNumber(registerModel.getPhoneNumber())
			.passHash(SecurityUtils.getPassHash(registerModel.getPassword()))
			.address(registerModel.getAddress())
			.accessToken(token)
			.specialties(registerModel.getSpecialties())
			.firstName(registerModel.getFirstName())
			.lastName(registerModel.getLastName())
			.rank(registerModel.getRank())
			.region(registerModel.getRegion())
			.hasSearchDog(registerModel.getHasSearchDog())
			.build();

		return userRepo.insert(user);
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/location", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User setLastKnownLocation(@RequestBody SetLocationModel setLocationModel, HttpServletResponse response) {
		BasicDBObject basicDBObject = new BasicDBObject();
		basicDBObject.put("lastKnownLocation.type", "Point");
		List<Double> coordinates = Arrays.asList(setLocationModel.getLongitude(), setLocationModel.getLatitude());
		basicDBObject.put("lastKnownLocation.coordinates", coordinates);
		userOperations.updateFirst(
			Query.query(Criteria.where("_id").is(setLocationModel.getId())),
			new BasicUpdate(new BasicDBObject("$set", basicDBObject)),
			User.class
		);
		return userRepo.findOne(setLocationModel.getId());
	}


	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<User> search(
		@RequestParam(value = "firstName", required = false) String firstName,
		@RequestParam(value = "lastName", required = false) String lastName,
		@RequestParam(value = "rank", required = false) String rank,
		@RequestParam(value = "isAvailable", required = false) Boolean isAvailable,
		@RequestParam(value = "hasSearchDog", required = false) Boolean hasSearchDog,
		@RequestParam(value = "specialties", required = false) List<String> specialities,
		@RequestParam(value = "region", required = false) String region
	) {
		BasicDBObject obj = new BasicDBObject();
		ifNotNull(firstName, first -> obj.put("firstName", first));
		ifNotNull(lastName, last -> obj.put("lastName", last));
		ifNotNull(rank, r -> obj.put("rank", rank));
		ifNotNull(hasSearchDog, d -> obj.put("hasSearchDog", d));
		ifNotNull(specialities, s -> obj.put("specialties", new BasicDBObject("$in", specialities)));
		ifNotNull(region, r -> obj.put("region", r));
		List<User> users = userOperations.find(new BasicQuery(obj), User.class);
		if (isAvailable == null || isAvailable) {
			long now = time.currentTimestampMillis();
			return users.stream().filter(user -> user.isAvailable(now)).collect(Collectors.toList());
		}
		return users;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/setExtraAvailablePeriod", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public User setExtraAvailablePeriod(@RequestBody ExtraAvailablePeriod period, HttpServletResponse response) {
		BasicDBObject update = new BasicDBObject("$push",
			new BasicDBObject("extraAvailablePeriods", period.toDbObject())
		);
		WriteResult writeResult = userOperations.updateFirst(
			Query.query(Criteria.where(Keys._ID).is(period.getId())),
			new BasicUpdate(update),
			User.class
		);
		if (writeResult.getN() == 0) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return null;
		}
		return userRepo.findOne(period.getId());
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
