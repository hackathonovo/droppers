//
//  HttpHelper.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "HttpHelper.h"
#import "SSKeychain.h"

@implementation HttpHelper

static NSString const * BASE_URL = @"http://192.168.201.43:8080";

+(NSMutableURLRequest *)buildRequestWithPath:(NSString *)path andMethod:(NSString *)method andAuthType:(HTTPRequestAuthType)authType andRequestContentType: (HTTPRequestContentType)requestContentType andRequestBoundry:(NSString *)requestBoundry{
    
    NSURL *requestURL = [NSURL URLWithString:[BASE_URL stringByAppendingString:path]];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:requestURL];
    
    request.HTTPMethod = method;
    
    switch (requestContentType) {
        case HTTPJsonContent:
            [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
            break;
        case HTTPMultipartContent:
            [request addValue:[@"multipart/form-data; boundry" stringByAppendingString:requestBoundry] forHTTPHeaderField:@"Content-Type"];
        default:
            break;
    }
    
    switch (authType) {
        case HTTPTokenAuth: {
            NSString *userToken = [SSKeychain passwordForService:@"Auth_Token" account:@"KeyChainService"];
            [request addValue:userToken forHTTPHeaderField:@"X-Authorization-Token"];
            break;
        }
        case HTTPBasicAuthorization: {
            break;
        }
        default:
            break;
    }
    
//    case .HTTPBasicAuth:
//        // Set BASIC authentication header
//        let basicAuthString = "\(HTTPHelper.API_AUTH_NAME):\(HTTPHelper.API_AUTH_PASSWORD)"
//        let utf8str = basicAuthString.dataUsingEncoding(NSUTF8StringEncoding)
//        let base64EncodedString = utf8str?.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(0))
//        
//        request.addValue("Basic \(base64EncodedString!)", forHTTPHeaderField: "Authorization")
  
    
    return request;
}

+ (void) sendRequest:(NSURLRequest *)request withCompletition:(void (^)(NSData *, NSError *))completition {
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if(error != nil) {
            dispatch_async(dispatch_get_main_queue(), ^{
                completition(data, error);
            });
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            NSHTTPURLResponse *httpResponse = ((NSHTTPURLResponse *)response);
            if (httpResponse.statusCode == 200) {
                if (completition) {completition(data, nil);}
            } else {
                //error response
            }

        });
    }];

    [task resume];
}
+ (NSString *)createResponseKey:(NSString *)key noValue:(NSString *)value {
    return [[[[@"\"" stringByAppendingString:key] stringByAppendingString: @"\":"] stringByAppendingString:value] stringByAppendingString:@""];
}
+ (NSString *)createResponseKey:(NSString *)key value:(NSString *)value {
    return [[[[@"\"" stringByAppendingString:key] stringByAppendingString: @"\":\""] stringByAppendingString:value] stringByAppendingString:@"\""];
}
+ (NSString *)createResponseKey:(NSString *)key numberValue:(NSNumber *)value {
    return [[[[@"\"" stringByAppendingString:key] stringByAppendingString: @"\":"] stringByAppendingString:[value stringValue]] stringByAppendingString:@""];
}
@end
