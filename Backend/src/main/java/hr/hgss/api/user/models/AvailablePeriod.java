package hr.hgss.api.user.models;

import java.util.List;
import lombok.Data;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
@Data
public class AvailablePeriod {

	private List<Days> days;
	private String timezone;
	private int startHour;
	private int endHour;

	public boolean isAvaiable(long timestamp) {
		DateTimeZone dateTimeZone = DateTimeZone.forID(timezone);
		DateTime dateTime = new DateTime(timestamp, dateTimeZone);


		return false;
	}
}
