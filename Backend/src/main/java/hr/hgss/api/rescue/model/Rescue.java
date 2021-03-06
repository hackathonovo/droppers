package hr.hgss.api.rescue.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.hgss.api.user.models.Location;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data @Builder
public class Rescue {

	@Field("_id") @Id
	private final String id;
	@Indexed(unique = false, background = true)
	private String leaderId;
	private String description;
	private List<RescuerStatus> rescuers;
	private String contactOfInjuredPerson;
	private String contactOfPersonWhoCalled;
	private Location lastKnownLocationOfPerson;
	private Location baseLocation;
	private List<Area> areas;
	private Long timestampOfRescue;
	private Long timestampOfFinish;
	private String finishNotes;

	private final Boolean active;

	@JsonIgnore
	private final Map<String, List<String>> userIdToTimestampLongLat;

	private List<MessageAndLocation> messages;
}
