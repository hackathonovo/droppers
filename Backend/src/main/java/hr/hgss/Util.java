package hr.hgss;

import java.util.function.Consumer;

/**
 * Created by Fredi Šarić on 20.05.17..
 */
public class Util {

	public static <T> void ifNotNull(T object, Consumer<T> consumer) {
		if (object != null) {
			consumer.accept(object);
		}
	}
}
