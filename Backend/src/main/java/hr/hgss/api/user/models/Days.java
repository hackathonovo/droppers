package hr.hgss.api.user.models;

import lombok.Getter;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
public enum Days {

	// Days
	MON ("monday", 1),
	TUE ("tuesday", 2),
	WEN ("wednesday", 3),
	THR ("thursday", 4),
	FRI ("friday", 5),
	SAT ("saturday", 6),
	SUN ("sunday", 7),

	// Special parts
	WEEKEND ("weekend", -1),
	ALL("all", -2);

	@Getter
	private final String period;

	@Getter
	private final int dayOfWeek;
	Days(String weekend, int dayOfWeek) {
		this.period = weekend;
		this.dayOfWeek = dayOfWeek;
	}

}
