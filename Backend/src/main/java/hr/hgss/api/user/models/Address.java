package hr.hgss.api.user.models;

import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class Address {

	private final String city;
	private final String country;
	private final String postalCode;
	private final String street;
	private final String streetNumber;
}
