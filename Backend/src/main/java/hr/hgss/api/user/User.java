package hr.hgss.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.hgss.api.user.models.Address;
import hr.hgss.api.user.models.Location;
import hr.hgss.databes.redis.MongoCollections;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;


/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
@Data @Builder
@org.springframework.data.mongodb.core.mapping.Document(collection = MongoCollections.USERS)
public class User {

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

	@JsonIgnore
	@Indexed(unique = true, background = true)
	private final String accessToken;
}
