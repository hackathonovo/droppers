package hr.hgss.api.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * Created by Fredi Šarić on 29.04.17..
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserMissingException extends RuntimeException {

	public UserMissingException(long id) {
		super("User with id: " + id + " is missing.");
	}

}
