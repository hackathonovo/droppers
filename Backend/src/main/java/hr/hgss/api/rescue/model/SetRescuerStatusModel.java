package hr.hgss.api.rescue.model;

import lombok.Data;

/**
 * Created by Fredi Šarić on 21.05.17..
 */
@Data
public class SetRescuerStatusModel {

	private final String rescueId;
	private final String rescuerId;
	private final String status;

}
