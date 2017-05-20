package hr.hgss.api.user.models;

import lombok.Getter;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
public enum Days {

	// Days
	MON ("monday"),
	TUE ("tuesday"),
	WEN ("wednesday"),
	THR ("thursday"),
	FRI ("friday"),
	SAT ("saturday"),
	SUN ("sunday"),

	// Special parts
	WEEKEND ("weekend"),
	ALL("all");

	@Getter
	private final String period;

	Days(String weekend) {
		this.period = weekend;
	}

}
