package hr.hgss.api.security;

import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * Created by Fredi Šarić on 28.04.17..
 */
public class SecurityUtils {

	public static String getPassHash(String pass) {
		return DigestUtils.sha256Hex(pass);
	}
}
