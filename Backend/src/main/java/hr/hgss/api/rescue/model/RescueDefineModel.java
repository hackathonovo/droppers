package hr.hgss.api.rescue.model;

import java.util.Set;
import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class RescueDefineModel {

	private final String leaderId;
	private final String description;
	private final Set<String> rescuersId;
	private final String injuredContact;
	private final String pearsonWhoCalledContact;
	private final Double longitudeOfInjured;
	private final Double latitudeOfInjured;
	private final Double longitudeOfBase;
	private final Double latitudeOfBase;
}
