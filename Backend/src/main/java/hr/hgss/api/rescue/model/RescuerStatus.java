package hr.hgss.api.rescue.model;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.Builder;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data @Builder
public class RescuerStatus {

	private String rescuerId;
	private String status;
	private Double longitude;
	private Double latitude;
	private Integer assignedArea;

	public DBObject toDbObject() {
		BasicDBObject obj = new BasicDBObject();
		obj.put("rescuerId", rescuerId);
		obj.put("status", status);
		obj.put("longitude", longitude);
		obj.put("latitude", latitude);
		obj.put("assignedArea", assignedArea);
		return obj;
	}
}
