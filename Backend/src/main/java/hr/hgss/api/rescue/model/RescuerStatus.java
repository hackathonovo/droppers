package hr.hgss.api.rescue.model;

import lombok.Builder;
import lombok.Data;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Data @Builder
public class RescuerStatus {
	private String rescuerId;
	private String status;
}
