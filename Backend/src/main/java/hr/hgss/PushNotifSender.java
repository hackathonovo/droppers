package hr.hgss;

import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import com.notnoop.apns.PayloadBuilder;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.java.Log;
import org.springframework.stereotype.Component;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component @Log
public class PushNotifSender {

	public void sendPushNotification(String title, String body, Map<String, String> notifParams, String iosToken) {
		ApnsService serviceDev = APNS.newService()
			.withCert("./certs/Certificates.p12", "abc")
			.withSandboxDestination()
			.build();

		log.info("Loaded cert");
		PayloadBuilder payload = APNS.newPayload();
		payload.alertBody(body);
		payload.alertTitle(title);
		payload.sound("default");
		notifParams.forEach(payload::customField);
		serviceDev.push(iosToken, payload.build());
		log.info("Sent notif.");
	}

	public static void main(String[] args) {
		PushNotifSender pushNotifSender = new PushNotifSender();
		HashMap<String, String> objectObjectHashMap = new HashMap<>();
		pushNotifSender.sendPushNotification("abc", "body", objectObjectHashMap, "1e2d9d0ddf2df86f0594b932394bb5ba2860852d566997a60940108ee80d421a");
	}
}
