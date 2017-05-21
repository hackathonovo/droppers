package hr.hgss;

import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import com.notnoop.apns.PayloadBuilder;
import lombok.extern.java.Log;
import org.springframework.stereotype.Component;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component @Log
public class PushNotifSender {

	public void sendPushNotification(String title, String body, String rescueId, String iosToken) {
		log.info("Sending " + rescueId + " to " + iosToken);
		ApnsService serviceDev = APNS.newService()
			.withCert("./certs/Certificates.p12", "abc")
			.withSandboxDestination()
			.build();

		log.info("Loaded cert");
		PayloadBuilder payload = APNS.newPayload();
		payload.alertBody(body);
		payload.alertTitle(title);
		payload.sound("default");
		payload.customField("rescue_id", rescueId);
		serviceDev.push(iosToken, payload.build());
		log.info("Sent notif.");
	}
}
