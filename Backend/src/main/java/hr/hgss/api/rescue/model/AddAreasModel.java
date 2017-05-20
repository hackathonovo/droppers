package hr.hgss.api.rescue.model;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import java.util.List;
import lombok.Data;

/**
 * Created by Fredi Šarić on 21.05.17..
 */
@Data
public class AddAreasModel {

	private final String rescueId;
	private final List<List<List<Double>>> coordinates;

	public DBObject toDbObject(Integer id) {
		BasicDBObject dbObject = new BasicDBObject();
		dbObject.put("id", id);
		dbObject.put("type","Polygon");
		dbObject.put("coordinates", coordinates);
		return dbObject;
	}
}
