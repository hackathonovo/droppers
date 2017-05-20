package hr.hgss;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import hr.hgss.api.AuthInterceptor;
import hr.hgss.api.security.AuthorisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 *
 * Created by Fredi Šarić on 27.04.17..
 */
@Configuration
@EnableSwagger2
public class Config extends WebMvcConfigurerAdapter{

	@Bean
	public Docket swagger2() {
		return new Docket(DocumentationType.SWAGGER_2)
			.select()
			.apis(RequestHandlerSelectors.any())
			.paths(PathSelectors.any())
			.build();
	}

	@Autowired
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	@Bean
	public String mongoDatabase() {
		return "HGSS_HACKATON_DB";
	}

	@Bean
	public MongoTemplate mongoTemplate() {
		return new MongoTemplate(new MongoClient(), mongoDatabase());
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new AuthInterceptor(new AuthorisationService(mongoTemplate())));
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
			.addMapping("/*")
			.allowedOrigins("*");
	}
}
