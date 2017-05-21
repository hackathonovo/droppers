package hr.hgss.api.rescue.model;

import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 21.05.17..
 */
@Data
public class AssignAreaRequest {

	private String rescueId;
	private String rescuerId;
	private Integer areaId;
}
