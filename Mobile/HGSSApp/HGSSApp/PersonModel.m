//
//  PersonModel.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "PersonModel.h"
#import "HttpHelper.h"

@implementation PersonModel
- (instancetype)initWithDictionary:(NSDictionary *)dictionary {
    if (self = [super init]) {
        [dictionary enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            NSString *myKey = (NSString *)key;
            
            
            if ([myKey  isEqual: @"id"]) {
                NSString *myObj = (NSString *)obj;
                _person_id = myObj;
            } else if ([myKey  isEqual: @"firstName"]) {
                NSString *myObj = (NSString *)obj;
                if (obj == [NSNull null]) {
                    myObj = @"";
                }
                _firstName = myObj;
            } else if ([myKey  isEqual: @"lastName"]) {
                NSString *myObj = (NSString *)obj;
                if (obj == [NSNull null]) {
                    myObj = @"";
                }
                _lastName = myObj;
            } else if ([myKey  isEqual: @"phoneNumber"]) {
                NSString *myObj = (NSString *)obj;
                _phoneNumber = myObj;
            } else if ([myKey  isEqual: @"specialities"]) {
                NSArray<NSString *> *myObj = (NSArray<NSString *> *)obj;
                _specialities = myObj;
            } else if ([myKey  isEqual: @"lastKnownLocation"]) {
                // @TODO:
            } else if ([myKey  isEqual: @"rank"]) {
                // @TODO:
            } else if ([myKey  isEqual: @"hasSearchDog"]) {
                BOOL myObj = (BOOL)obj;
                _hasSearchDog = myObj;
            }
        }];
    }
    return self;
}

- (NSString *)createJSONString {
    NSString *completeString = @"{";
    NSString *id = [HttpHelper createResponseKey:@"id" value:_person_id];
    completeString = [id stringByAppendingString:@","];
    NSString *firstName = [HttpHelper createResponseKey:@"firstName" value:_firstName];
    completeString = [completeString stringByAppendingString:firstName];
    completeString = [completeString stringByAppendingString:@","];
    NSString *lastName = [HttpHelper createResponseKey:@"lastName" value:_lastName];
    completeString = [completeString stringByAppendingString:lastName];
    completeString = [completeString stringByAppendingString:@","];
    NSString *phoneNumber = [HttpHelper createResponseKey:@"phoneNumber" value:_phoneNumber];
    completeString = [completeString stringByAppendingString:phoneNumber];
    completeString = [completeString stringByAppendingString:@","];
    NSString *hasSearchDog = [HttpHelper createResponseKey:@"hasSearchDog" value:_hasSearchDog?@"True":@"False"];
    completeString = [completeString stringByAppendingString:hasSearchDog];
    completeString = [completeString stringByAppendingString:@"}"];
    return completeString;
}
@end
