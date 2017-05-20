package hr.hgss.api.rescue.model;

import java.util.List;
import lombok.Data;

/**
 * Created by Fredi Šarić on 21.05.17..
 */
@Data
public class AddAreasModel {

	private final String rescueId;
	private final List<Area> polygons;
}
