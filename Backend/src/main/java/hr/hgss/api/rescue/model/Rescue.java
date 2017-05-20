package hr.hgss.api.rescue.model;

import hr.hgss.api.user.models.Location;
import java.util.List;
import java.util.Set;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Rescue {

	private final String id;
	private final String leaderId;
	private final String description;
	private final Set<RescuerStatus> rescuersId;
	private final String injuredContact;
	private final String pearsonWhoCalledContact;
	private final Location lastKnownLocationOfPerson;
	private final Location baseLocation;

	private final List<List<Polygon>> areas;

	private final Long timestampOfRescue;
}
