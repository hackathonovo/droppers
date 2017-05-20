package hr.hgss.api.rescue.model;

import java.util.List;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Polygon {
	private final String type;
	private final List<List<List<Double>>> coordinates;
}
