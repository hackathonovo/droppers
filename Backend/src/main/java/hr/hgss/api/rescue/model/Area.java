package hr.hgss.api.rescue.model;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import java.util.List;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Area {

	private final String id;
	private final String type;
	private final List<List<List<Double>>> coordinates;

	public DBObject toDbObject() {
		BasicDBObject dbObject = new BasicDBObject();
		dbObject.put("id", id);
		dbObject.put("type","Polygon");
		dbObject.put("coordinates", coordinates);
		return dbObject;
	}
}
