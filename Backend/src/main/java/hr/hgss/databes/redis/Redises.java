package hr.hgss.databes.redis;

import lombok.Getter;
import redis.clients.jedis.Protocol;

/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
@Getter
public enum Redises {

	GEO(Protocol.DEFAULT_DATABASE, Protocol.DEFAULT_HOST, Protocol.DEFAULT_PORT);

	private final int db;
	private final String host;
	private final int port;

	Redises(int db, String host, int port) {
		this.db = db;
		this.host = host;
		this.port = port;
	}
}
