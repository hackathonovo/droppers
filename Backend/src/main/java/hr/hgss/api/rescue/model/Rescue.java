package hr.hgss.api.rescue.model;

import java.util.Set;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Rescue {

	private final String id;

	private final String leaderId;
	private final Set<String> rescuersId;

}
