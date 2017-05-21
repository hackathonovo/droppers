package hr.hgss;

import org.springframework.stereotype.Component;

/**
 * Created by Fredi Šarić on 29.04.17..
 */
@Component
public class Time {

	public long currentTimestampSec() {
		return System.currentTimeMillis() / 1000L;
	}

	public long currentTimestampMillis() {
		return System.currentTimeMillis();
	}


}
