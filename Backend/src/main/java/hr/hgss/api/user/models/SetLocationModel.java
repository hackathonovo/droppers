package hr.hgss.api.user.models;

import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class SetLocationModel {

	private final String id;
	private final Double longitude;
	private final Double latitude;
}
