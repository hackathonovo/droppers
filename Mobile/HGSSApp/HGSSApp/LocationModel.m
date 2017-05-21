//
//  LocationModel.m
//  HGSSApp
//
//  Created by Jure Cular on 21/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "LocationModel.h"
#import "HttpHelper.h"

@implementation LocationModel

- (instancetype)initWithDictionary:(NSDictionary *)dictionary {
    if (self = [super init]) {
        [dictionary enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            NSString *myKey = (NSString *)key;
            if ([myKey  isEqual: @"longitude"]) {
                NSNumber *myObj = (NSNumber *)obj;
                _longitude = myObj;
            } else if ([myKey  isEqual: @"latitude"]) {
                NSNumber *myObj = (NSNumber *)obj;
                _latitude = myObj;
            } else if ([myKey  isEqual: @"id"]) {
                NSString *myObj = (NSString *)obj;
                _userId = myObj;
            }
        }];
    }
    return self;
}

- (NSString *)createJSONString {
    NSString *completeString = @"{";
    NSString *userId = [HttpHelper createResponseKey:@"id" value:_userId];
    completeString = [completeString stringByAppendingString:userId];
    completeString = [completeString stringByAppendingString:@","];
    NSString *longitude = [HttpHelper createResponseKey:@"longitude" numberValue:_longitude];
    completeString = [completeString stringByAppendingString:longitude];
    completeString = [completeString stringByAppendingString:@","];
    NSString *latitude = [HttpHelper createResponseKey:@"latitude" numberValue:_latitude];
    completeString = [completeString stringByAppendingString:latitude];
    completeString = [completeString stringByAppendingString:@"}"];
    return completeString;
}
@end
