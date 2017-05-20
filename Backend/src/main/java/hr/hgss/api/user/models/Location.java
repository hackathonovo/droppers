package hr.hgss.api.user.models;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import hr.hgss.Util;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Location {

	private final Long latitude;
	private final Long longitude;

	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		Util.ifNotNull(latitude, o -> obj.put("latitude",o));
		Util.ifNotNull(longitude, o -> obj.put("longitude",o));
		return obj;
	}

}
