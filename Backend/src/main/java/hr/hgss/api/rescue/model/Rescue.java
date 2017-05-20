package hr.hgss.api.rescue.model;

import hr.hgss.api.user.models.Location;
import java.util.List;
import lombok.Builder;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data @Builder
public class Rescue {

	private final String id;
	private String leaderId;
	private String description;
	private List<RescuerStatus> rescuersId;
	private String injuredContact;
	private String pearsonWhoCalledContact;
	private Location lastKnownLocationOfPerson;
	private Location baseLocation;
	private List<List<Polygon>> areas;
	private Long timestampOfRescue;
	private Long timestampOfFinish;
	private String finishNotes;
}
