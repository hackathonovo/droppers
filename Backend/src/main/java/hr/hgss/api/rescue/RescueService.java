package hr.hgss.api.rescue;

import hr.hgss.PushNotifSender;
import hr.hgss.Util;
import hr.hgss.api.Keys;
import hr.hgss.api.rescue.model.AddAreasModel;
import hr.hgss.api.rescue.model.Area;
import hr.hgss.api.rescue.model.Rescue;
import hr.hgss.api.rescue.model.RescueDefineModel;
import hr.hgss.api.rescue.model.RescuerStatus;
import hr.hgss.api.rescue.model.SetRescuerStatusModel;
import hr.hgss.api.user.User;
import hr.hgss.api.user.UserRepo;
import hr.hgss.api.user.models.Location;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import javax.util.streamex.StreamEx;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

	@Autowired
	public RescueService(RescueRepo repo, UserRepo userRepo, PushNotifSender pushNotifSender, MongoOperations rescueOperations) {
		this.repo = repo;
		this.userRepo = userRepo;
		this.pushNotifSender = pushNotifSender;
		this.rescueOperations = rescueOperations;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/define", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
	public Rescue defineRescue(@RequestBody RescueDefineModel model) {
		Rescue rescue = Rescue.builder()
			.injuredContact(model.getInjuredContact())
			.leaderId(model.getLeaderId())
			.rescuersId(StreamEx.of(model.getRescuersId()).map(id -> RescuerStatus.builder().rescuerId(id).status("PENDING").build()).collect(Collectors.toList()))
			.baseLocation(new Location("Point", Arrays.asList(model.getLongitudeOfBase(), model.getLatitudeOfBase())))
			.lastKnownLocationOfPerson(new Location("Point", Arrays.asList(model.getLongitudeOfInjured(), model.getLatitudeOfInjured())))
			.description(model.getDescription())
			.injuredContact(model.getInjuredContact())
			.pearsonWhoCalledContact(model.getPearsonWhoCalledContact())
			.build();

		List<User> all = userRepo.findById(model.getRescuersId());
		Rescue insert = repo.insert(rescue);
		if (all != null) {
			all.forEach(user -> // Notify users.
				Util.ifNotNull(user.getIosTokens(),
					tokens -> tokens.forEach(
						token -> pushNotifSender.sendPushNotification("ALERT", model.getDescription(), insert.getId(), token)
					)
				)
			);
		}
		return insert;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value ="/set_status", method = RequestMethod.POST)
	public Rescue setRescuerStatus(@RequestBody SetRescuerStatusModel model) {
		Rescue one = repo.findOne(model.getRescueId());
		List<RescuerStatus> rescuerStatuses = StreamEx.of(one.getRescuersId())
			.map(rescuerStatus -> {
				if (rescuerStatus.getRescuerId().equals(model.getRescuerId())) {
					return RescuerStatus.builder().rescuerId(model.getRescuerId()).status(model.getStatus()).build();
				}
				return rescuerStatus;
			}).toList();

		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(model.getRescueId())),
			Update.update("rescuersId", StreamEx.of(rescuerStatuses).map(RescuerStatus::toDbObject).toList()),
			Rescue.class
		);

		one.setRescuersId(rescuerStatuses);
		return one;
	}

	@ApiImplicitParams(@ApiImplicitParam(name = Keys.X_AUTHORIZATION_TOKEN, paramType = "header", required = true))
	@RequestMapping(value = "/add_areas", method = RequestMethod.POST)
	public Rescue defineAreas(@RequestBody AddAreasModel model) {
		rescueOperations.updateFirst(
			Query.query(Criteria.where("_id").is(model.getRescueId())),
			Update.update("areas", StreamEx.of(model.getPolygons()).map(Area::toDbObject).toList()),
			Rescue.class
		);
		return repo.findOne(model.getRescueId());
	}
}
