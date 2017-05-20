package hr.hgss.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import static hr.hgss.Util.ifNotNull;
import hr.hgss.api.user.models.Address;
import hr.hgss.api.user.models.Location;
import hr.hgss.databes.redis.MongoCollections;
import java.util.List;
import lombok.Builder;
import lombok.Data;
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
	private final List<String> specialities;
	private final Address address;
	private final Location lastKnownLocation;
	private final String rank;
	private final String region;
	private final Boolean hasSearchDog;
	@JsonIgnore
	@Indexed(unique = true, background = true)
	private final String accessToken;


	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		ifNotNull(id, o ->  obj.put("_id", o));
		ifNotNull(email, o -> obj.put("email", o));
		ifNotNull(firstName, o -> obj.put("firstName", o));
		ifNotNull(lastName, o -> obj.put("lastName", o));
		ifNotNull(passHash, o -> obj.put("passHash", o));
		ifNotNull(phoneNumber, o -> obj.put("phoneNumber", o));
		ifNotNull(specialities, o -> obj.put("specialities", o));
		ifNotNull(address, o -> obj.put("address", o.toDbObject()));
		ifNotNull(lastKnownLocation, o -> obj.put("lastKnownLocation", o.toDbObject()));
		ifNotNull(rank, o -> obj.put("rank", o));
		ifNotNull(region, o -> obj.put("region", o));
		ifNotNull(hasSearchDog, o -> obj.put("hasSearchDog", o));
		return obj;
	}
}
