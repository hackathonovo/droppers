package hr.hgss.api.rescue.model;

import lombok.Data;

/**
 * Created by Fredi Šarić on 21.05.17..
 */
@Data
public class MessageAndLocationModel {

	public final String rescueId;
	public final String rescuerId;
	public final String message;
	public final Double longitude;
	public final Double latitude;
}
