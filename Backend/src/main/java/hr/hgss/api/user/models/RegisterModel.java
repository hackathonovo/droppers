package hr.hgss.api.user.models;

import java.util.List;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class RegisterModel {

	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String phoneNumber;
	private List<String> specialities;
	private Address address;

	private final String rank;
	private final String region;
	private final boolean hasSearchDog;



}
