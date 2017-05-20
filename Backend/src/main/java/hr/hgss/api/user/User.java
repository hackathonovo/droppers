package hr.hgss.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.hgss.api.Keys;
import hr.hgss.databes.redis.MongoCollections;
import lombok.Builder;
import lombok.Data;
import org.bson.Document;
import org.springframework.data.mongodb.core.index.Indexed;


/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
@Data @Builder
@org.springframework.data.mongodb.core.mapping.Document(collection = MongoCollections.USERS)
public class User {

	@Indexed(unique = true)
	private final String userName;

	@JsonIgnore
	private final String passHash;

	private final String email;

	private final String name;

	@JsonIgnore
	@Indexed(unique = true, background = true)
	private final String accessToken;

	public Document toDocument() {
		Document doc = new Document();
		doc.put(Keys.NAME, name);
		doc.put(Keys.EMAIL, email);
		doc.put(Keys.PASS_HASH, passHash);
		doc.put(Keys.ACCESS_TOKEN, accessToken);
		return doc;
	}
}
