package hr.hgss.api;

import hr.hgss.api.security.AuthorisationService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * Created by Fredi Šarić on 20.05.17..
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

	private final AuthorisationService authorisationService;

	@Autowired
	public AuthInterceptor(AuthorisationService authorisationService) {
		this.authorisationService = authorisationService;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String path = request.getServletPath();
		System.out.println("THIS IS PATH -------------------------------------------------- " + path);
		if (path.startsWith("/swagger-resources") ||
			path.equals("error") ||
			path.equals("/v2/api-docs") ||
			path.contains("login") ||
			path.contains("register")) {
			return true;
		}
		String token = request.getHeader(Keys.X_AUTHORIZATION_TOKEN);
		if (token == null || token.isEmpty() || !authorisationService.authorise(token)) {
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			return false;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {}
}
