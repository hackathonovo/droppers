package hr.hgss.api.rescue;

import hr.hgss.api.Keys;
import hr.hgss.api.rescue.model.Rescue;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Log
@RestController
@RequestMapping(value = Keys.API_ENPOINT + "rescue", produces = APPLICATION_JSON_VALUE)
public class RescueService {

	private final RescueRepo repo;

	@Autowired
	public RescueService(RescueRepo repo) {
		this.repo = repo;
	}

	public Rescue defineRescue() {

		return null;
	}
}
