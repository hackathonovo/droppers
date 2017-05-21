package hr.hgss.api.user.models;

import java.util.List;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Location {

	private final String type;
	private final List<Double> coordinates;
}
