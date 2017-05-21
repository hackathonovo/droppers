package hr.hgss.api.user.models;

import lombok.Data;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class LoginModel {

	private String email;
	private String password;

	private String iosToken;
}
