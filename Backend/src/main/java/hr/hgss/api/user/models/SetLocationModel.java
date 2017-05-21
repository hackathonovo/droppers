package hr.hgss.api.user.models;

import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class SetLocationModel {
	private String id;
	private Double longitude;
	private Double latitude;
}
