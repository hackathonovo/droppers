package hr.hgss.api.rescue;

import hr.hgss.PushNotifSender;
import hr.hgss.Util;
import hr.hgss.api.Keys;
import hr.hgss.api.rescue.model.Rescue;
import hr.hgss.api.rescue.model.RescueDefineModel;
import hr.hgss.api.rescue.model.RescuerStatus;
import hr.hgss.api.user.User;
import hr.hgss.api.user.UserRepo;
import hr.hgss.api.user.models.Location;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.util.Arrays;
import java.util.stream.Collectors;
import javax.util.streamex.StreamEx;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Autowired
	public RescueService(RescueRepo repo, UserRepo userRepo, PushNotifSender pushNotifSender) {
		this.repo = repo;
		this.userRepo = userRepo;
		this.pushNotifSender = pushNotifSender;
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

		Iterable<User> all = userRepo.findAll(model.getRescuersId());
		if (all != null) {
			all.forEach(user -> // Notify users.
				Util.ifNotNull(user.getIosTokens(),
					tokens -> tokens.forEach(
						token -> pushNotifSender.sendPushNotification("ALERT", model.getDescription(), token)
					)
				)
			);
		}
		return repo.insert(rescue);
	}


}
