//
//  HttpHelper.h
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HttpHelper : NSObject
//static NSString const * const BASE_URL = @"";
//static NSString const * const BASE_URL = @"";

typedef NS_ENUM(NSInteger, HTTPRequestContentType) {
    HTTPJsonContent,
    HTTPMultipartContent
};

typedef NS_ENUM(NSInteger, HTTPRequestAuthType) {
    HTTPTokenAuth,
    HTTPBasicAuthorization
};

+(NSMutableURLRequest *)buildRequestWithPath:(NSString *)path andMethod:(NSString *)method andAuthType:(HTTPRequestAuthType)authType andRequestContentType: (HTTPRequestContentType)requestContentType andRequestBoundry:(NSString *)requestBoundry;

+(NSString *)createResponseKey:(NSString *)key value:(NSString *)value;
+ (NSString *)createResponseKey:(NSString *)key numberValue:(NSNumber *)value;
+ (NSString *)createResponseKey:(NSString *)key noValue:(NSString *)value;
+ (void) sendRequest:(NSURLRequest *)request withCompletition:(void (^)(NSData *, NSError *))completition;
@end
