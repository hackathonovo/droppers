package hr.hgss.api.user.models;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import static hr.hgss.Util.ifNotNull;
import lombok.Builder;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data @Builder
public class AvailablePeriod {

	// Mode one
	/*
	* If none days is matched than it considered that user availability status is negation of
	* availability field.
	*
	* If its matched than start and end hour is looked.
	* than its returned
	*
	* */
	private Days day;
	private Integer endHour;
	private Integer startHour;

	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		ifNotNull(day, d -> obj.put("day", d.toString()));
		ifNotNull(endHour, e -> obj.put("endHour", e));
		ifNotNull(startHour, s -> obj.put("startHour", s));
		return obj;
	}
}
