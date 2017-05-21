package hr.hgss.api.user.models;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import hr.hgss.Util;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Address {

	private final String city;
	private final String country;
	private final String postalCode;
	private final String street;
	private final String streetNumber;

	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		Util.ifNotNull(city, o -> obj.put("city", o));
		Util.ifNotNull(country, o -> obj.put("country", o));
		Util.ifNotNull(postalCode, o -> obj.put("postalCode", o));
		Util.ifNotNull(street, o -> obj.put("street", o));
		Util.ifNotNull(streetNumber, o -> obj.put("streetNumber", o));
		return obj;
	}
}
