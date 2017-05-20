package hr.hgss;

import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import com.notnoop.apns.PayloadBuilder;
import org.springframework.stereotype.Component;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component
public class PushNotifSender {

	public void sendPushNotification(String title, String body, String iosToken) {
		ApnsService serviceDev = APNS.newService()
			.withCert("certfile", "pass")
			.withSandboxDestination()
			.build();

		PayloadBuilder payload = APNS.newPayload();
		payload.alertBody(body);
		payload.alertTitle(title);
		payload.sound("default");
		serviceDev.push(iosToken, payload.build());
	}
}
