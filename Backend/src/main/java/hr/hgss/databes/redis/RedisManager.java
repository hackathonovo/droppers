package hr.hgss.databes.redis;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
@Component
public class RedisManager {

	private Map<String, JedisPool> pools;

	public RedisManager() {
		this.pools = new HashMap<>();
	}

	public Jedis get(Redises redis) {
		return pools.computeIfAbsent(redis.getHost(), host -> new JedisPool(new JedisPoolConfig(), host, redis.getPort())).getResource();
	}
}
