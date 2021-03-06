package hr.hgss.api.rescue;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import hr.hgss.PushNotifSender;
import hr.hgss.Util;
import hr.hgss.api.Keys;
import hr.hgss.api.rescue.model.AddAreasModel;
import hr.hgss.api.rescue.model.Area;
import hr.hgss.api.rescue.model.AssignAreaRequest;
import hr.hgss.api.rescue.model.FinishAction;
import hr.hgss.api.rescue.model.MessageAndLocationModel;
import hr.hgss.api.rescue.model.Rescue;
import hr.hgss.api.rescue.model.RescueDefineModel;
import hr.hgss.api.rescue.model.RescuerStatus;
import hr.hgss.api.rescue.model.SetRescuerStatusModel;
import hr.hgss.api.user.User;
import hr.hgss.api.user.UserRepo;
import hr.hgss.api.user.models.Location;
import hr.hgss.databes.redis.RedisManager;
import hr.hgss.databes.redis.Redises;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.util.streamex.EntryStream;
import javax.util.streamex.StreamEx;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
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
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.Response;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Log
@CrossOrigin
@RestController
@RequestMapping(value = Keys.API_ENPOINT + "rescue", produces = APPLICATION_JSON_VALUE)
public class RescueService {

	private final RescueRepo repo;
	private final UserRepo userRepo;
	private final PushNotifSender pushNotifSender;
	private final MongoOperations rescueOperations;
	private final RedisManager redisManager;

	@Autowired
	public RescueService(
		RescueRepo repo,
		UserRepo userRepo,
		PushNotifSender pushNotifSender,
		MongoOperations rescueOperations,
		RedisManager redisManager
	) {
		this.repo = repo;
		this.userRepo = userRepo;
		this.pushNotifSender = pushNotifSender;
		this.rescueOperations = rescueOperations;
		this.redisManager = redisManager;
	}

	@RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	public List<Rescue> getActions(@RequestParam(defaultValue = "true") boolean active) {
		return repo.findAllByActive(active);
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/define", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public Rescue defineRescue(@RequestBody RescueDefineModel model) {
		log.info(model.toString());
		Map<String, Location> idToLocation = StreamEx.of(userRepo.findById(model.getRescuers()))
			.mapToEntry(User::getId, User::getLastKnownLocation)
			.toMap();

		Rescue rescue = Rescue.builder()
			.leaderId(model.getLeaderId())
			.rescuers(StreamEx.of(model.getRescuers()).map(id -> {
				RescuerStatus.RescuerStatusBuilder builder = RescuerStatus.builder().rescuerId(id).status("PENDING");
				Location location = idToLocation.get(id);
				if (location != null) {
					builder.longitude(location.getCoordinates().get(0)).latitude(location.getCoordinates().get(1));
				}
				return builder.build();
			}).collect(Collectors.toList()))
			.baseLocation(new Location("Point", Arrays.asList(model.getLongitudeOfBase(), model.getLatitudeOfBase())))
			.lastKnownLocationOfPerson(new Location("Point", Arrays.asList(model.getLongitudeOfInjured(), model.getLatitudeOfInjured())))
			.description(model.getDescription())
			.contactOfInjuredPerson(model.getContactOfInjuredPerson())
			.contactOfPersonWhoCalled(model.getContactOfPersonWhoCalled())
			.timestampOfRescue(System.currentTimeMillis())
			.active(true)
			.build();

		List<User> all = userRepo.findById(model.getRescuers());
		Rescue insert = repo.insert(rescue);
		if (all != null) {
			log.info("Sending to push notif: " + all);
			all.forEach(user -> {
				HashMap<String, String> notifParams = new HashMap<>();
				notifParams.put("rescue_id", user.getId());
				Util.ifNotNull(user.getIosTokens(),
					tokens -> tokens.forEach(
						token -> pushNotifSender.sendPushNotification("ALERT", model.getDescription(),  notifParams, insert.getId())
					)
				);
			});
		}
		return insert;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value ="/set_status", method = RequestMethod.POST)
	public Rescue setRescuerStatus(@RequestBody SetRescuerStatusModel model) {
		log.info(model.toString());
		Rescue one = repo.findOne(model.getRescueId());
		List<RescuerStatus> rescuerStatuses = StreamEx.of(one.getRescuers())
			.map(rescuerStatus -> {
				if (rescuerStatus.getRescuerId().equals(model.getRescuerId())) {
					return RescuerStatus.builder().rescuerId(model.getRescuerId()).status(model.getStatus()).build();
				}
				return rescuerStatus;
			}).toList();

		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(model.getRescueId())),
			Update.update("rescuers", StreamEx.of(rescuerStatuses).map(RescuerStatus::toDbObject).toList()),
			Rescue.class
		);

		one.setRescuers(rescuerStatuses);
		return one;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/add_areas", method = RequestMethod.POST)
	public void defineAreas(@RequestBody AddAreasModel model, HttpServletResponse response) {
		log.info(model.toString());
		Rescue one = repo.findOne(model.getRescueId());
		if (one == null) {
			response.setStatus(HttpStatus.NOT_FOUND.value());
			return;
		}

		List<Area> areas = one.getAreas();
		Integer id;
		if (areas == null) {
			id = 0;
		} else {
			id = StreamEx.of(areas).mapToInt(Area::getId).max().getAsInt();
		}

		BasicDBObject obj = new BasicDBObject("$push", new BasicDBObject("areas", model.toDbObject(id + 1)));
		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(model.getRescueId())),
			new BasicUpdate(obj),
			Rescue.class
		);
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/assign_area", method = RequestMethod.POST)
	public void assignArea(@RequestBody AssignAreaRequest assignAreaRequest) {
		log.info(assignAreaRequest.toString());
		Rescue rescue = repo.findOne(assignAreaRequest.getRescueId());
		if (rescue == null) {
			return;
		}
		List<DBObject> objects = StreamEx.of(rescue.getRescuers())
			.map(r -> {
				if (r.getRescuerId().equals(assignAreaRequest.getRescuerId())) {
					return RescuerStatus.builder()
						.rescuerId(r.getRescuerId())
						.longitude(r.getLongitude())
						.latitude(r.getLatitude())
						.status(r.getStatus())
						.assignedArea(assignAreaRequest.getAreaId())
						.build();
				}
				return r;
			})
			.map(RescuerStatus::toDbObject)
			.toList();
		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(assignAreaRequest.getRescueId())),
			Update.update("rescuers", objects),
			User.class
		);
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value ="/add_message", method = RequestMethod.POST)
	public void addMessageAndLocation(@RequestBody MessageAndLocationModel model) {
		log.info(model.toString());
		BasicDBObject obj = new BasicDBObject();
		obj.put("rescuerId", model.getRescuerId());
		obj.put("message", model.getMessage());

		Util.ifNotNull(model.getLongitude(), longitude -> obj.put("longitude", longitude));
		Util.ifNotNull(model.getLatitude(), lat -> obj.put("latitude", lat));
		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(model.getRescueId())),
			Update.update("$push", new BasicDBObject("messages", obj)),
			Rescue.class
		);
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/finish", method = RequestMethod.POST)
	public void finishAction(@RequestBody FinishAction finish) {
		Rescue rescue = repo.findOne(finish.getRescueId());
		BasicDBObject updateObj = new BasicDBObject();
		updateObj.put("finishNotes", finish.getFinishNotes());
		updateObj.put("timestampOfFinish", System.currentTimeMillis());
		updateObj.put("active", false);

		List<String> ids = StreamEx.of(rescue.getRescuers())
			.map(RescuerStatus::getRescuerId)
			.toList();
		try (Jedis jedis = redisManager.get(Redises.GEO)) {
			Pipeline pipeline = jedis.pipelined();
			Map<String, Response<List<String>>> responseMap = StreamEx.of(ids).mapToEntry(id -> pipeline.lrange(id, 0, -1)).toMap();
			pipeline.sync();
			Map<String, List<String>> locations = EntryStream.of(responseMap)
				.mapValues(Response::get)
				.mapValues(list ->
					StreamEx.of(list)
						.filter(l -> {
							long timestamp = Long.parseLong(l.split("_")[0]);
							return rescue.getTimestampOfRescue() <= timestamp;
						}).toList()
				)
				.toMap();
			updateObj.put("userIdToTimestampLongLat", locations);
		}

		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(finish.getRescueId())),
			Update.fromDBObject(new BasicDBObject("$set", updateObj)),
			Rescue.class
		);
	}
}
