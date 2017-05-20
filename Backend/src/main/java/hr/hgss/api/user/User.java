package hr.hgss.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import static hr.hgss.Util.ifNotNull;
import hr.hgss.api.user.models.Address;
import hr.hgss.api.user.models.AvailablePeriod;
import hr.hgss.api.user.models.ExtraAvailablePeriod;
import hr.hgss.api.user.models.Location;
import hr.hgss.databes.redis.MongoCollections;
import java.util.List;
import javax.util.streamex.StreamEx;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;


/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
@Data @Builder
@org.springframework.data.mongodb.core.mapping.Document(collection = MongoCollections.USERS)
public class User {

	@Field("_id")
	public final String id;

	@Indexed(unique = true)
	private final String email;
	private final String firstName;
	private final String lastName;
	@JsonIgnore
	private final String passHash;
	private final String phoneNumber;
	private final List<String> specialties;
	private final Address address;
	private final Location lastKnownLocation;
	private final String rank;
	private final String region;
	private final Boolean hasSearchDog;
	@Indexed(unique = true, background = true)
	private final String accessToken;
	private final String timezone;


	// Availability
	private final List<AvailablePeriod> availablePeriods;
	private final List<ExtraAvailablePeriod> extraAvailablePeriods;


	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		ifNotNull(id, o ->  obj.put("_id", o));
		ifNotNull(email, o -> obj.put("email", o));
		ifNotNull(firstName, o -> obj.put("firstName", o));
		ifNotNull(lastName, o -> obj.put("lastName", o));
		ifNotNull(passHash, o -> obj.put("passHash", o));
		ifNotNull(phoneNumber, o -> obj.put("phoneNumber", o));
		ifNotNull(specialties, o -> obj.put("specialties", o));
		ifNotNull(address, o -> obj.put("address", o.toDbObject()));
		ifNotNull(lastKnownLocation, o -> obj.put("lastKnownLocation", o.toDbObject()));
		ifNotNull(rank, o -> obj.put("rank", o));
		ifNotNull(region, o -> obj.put("region", o));
		ifNotNull(hasSearchDog, o -> obj.put("hasSearchDog", o));
		return obj;
	}

	public boolean isAvailable(long currentTimestamp) {
		if (availablePeriods == null || availablePeriods.isEmpty()) {
			return true;
		}
		DateTime now = new DateTime(currentTimestamp, DateTimeZone.forID(timezone));
		int dayOfWeek = now.getDayOfWeek();
		int hourOfDay = now.getHourOfDay();
		boolean condition1 = StreamEx.of(availablePeriods)
			.anyMatch(period ->
				period.getDay().getDayOfWeek() == dayOfWeek &&
					period.getStartHour() <= hourOfDay &&
					hourOfDay < period.getEndHour());
		boolean condition2 = StreamEx.of(extraAvailablePeriods)
			.allMatch(period -> {
				if (currentTimestamp >= period.getFromTimestamp() && currentTimestamp < period.getToTimestamp()) {
					return period.getIsAvailable();
				}
				return true;
			});
		return condition1 && condition2;
	}

}
