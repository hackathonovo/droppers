package hr.hgss.api.rescue;

import hr.hgss.api.rescue.model.Rescue;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
public interface RescueRepo extends MongoRepository<Rescue, String> {

	List<Rescue> findAllByActive(Boolean active);
}
