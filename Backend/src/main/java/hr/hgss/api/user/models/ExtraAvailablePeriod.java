package hr.hgss.api.user.models;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class ExtraAvailablePeriod {

	private String id; // Just for api method
	private Long fromTimestamp;
	private Long toTimestamp;
	private Boolean isAvailable;

	public DBObject toDbObject() {
		BasicDBObject db = new BasicDBObject();
		db.put("fromTimestamp", fromTimestamp);
		db.put("toTimestamp", toTimestamp);
		db.put("isAvailable", isAvailable);
		return db;
	}
}

