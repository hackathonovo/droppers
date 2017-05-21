//
//  ActionModel.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "ActionModel.h"
#import "HttpHelper.h"

@implementation ActionModel

- (instancetype)initWithDictionary:(NSDictionary *)dictionary {
//    if (self = [super init]) {
//        [dictionary enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
//            NSString *myKey = (NSString *)key;
//            
//            
//            if ([myKey  isEqual: @"id"]) {
//                NSString *myObj = (NSString *)obj;
//                _person_id = myObj;
//            } else if ([myKey  isEqual: @"firstName"]) {
//                NSString *myObj = (NSString *)obj;
//                if (obj == [NSNull null]) {
//                    myObj = @"";
//                }
//                _firstName = myObj;
//            } else if ([myKey  isEqual: @"lastName"]) {
//                NSString *myObj = (NSString *)obj;
//                if (obj == [NSNull null]) {
//                    myObj = @"";
//                }
//                _lastName = myObj;
//            } else if ([myKey  isEqual: @"phoneNumber"]) {
//                NSString *myObj = (NSString *)obj;
//                _phoneNumber = myObj;
//            } else if ([myKey  isEqual: @"specialities"]) {
//                NSArray<NSString *> *myObj = (NSArray<NSString *> *)obj;
//                _specialities = myObj;
//            } else if ([myKey  isEqual: @"lastKnownLocation"]) {
//                // @TODO:
//            } else if ([myKey  isEqual: @"rank"]) {
//                // @TODO:
//            } else if ([myKey  isEqual: @"hasSearchDog"]) {
//                BOOL myObj = (BOOL)obj;
//                _hasSearchDog = myObj;
//            }
//        }];
//    }
    return self;
}

/*
 {
 "leaderId": "string",
 "description": "string",
 "rescuers": [
 "string"
 ],
 "contactOfInjuredPerson": "string",
 "contactOfPersonWhoCalled": "string",
 "longitudeOfInjured": 0,
 "latitudeOfInjured": 0,
 "longitudeOfBase": 0,
 "latitudeOfBase": 0
 }
 */

- (NSString *)createJSONString {
    NSString *completeString = @"{";
    NSString *leaderId = [HttpHelper createResponseKey:@"leaderId" value:_leaderId];
    completeString = [completeString stringByAppendingString:leaderId];
    completeString = [completeString stringByAppendingString:@","];
    NSString *actionDescription = [HttpHelper createResponseKey:@"description" value:_actionDescription];
    completeString = [completeString stringByAppendingString:actionDescription];
    completeString = [completeString stringByAppendingString:@","];
    NSString *rescuers =  [HttpHelper createResponseKey:@"rescuers" noValue:[self getArrayOfPersonIds]];
    completeString = [completeString stringByAppendingString:rescuers];
    completeString = [completeString stringByAppendingString:@","];
    NSString *contactOfInjuredPerson = [HttpHelper createResponseKey:@"contactOfInjuredPerson" value:_injuredPhoneNumber];
    completeString = [completeString stringByAppendingString:contactOfInjuredPerson];
    completeString = [completeString stringByAppendingString:@","];
    NSString *contactOfPersonWhoCalled = [HttpHelper createResponseKey:@"contactOfPersonWhoCalled" value:_contactPhoneNumber];
    completeString = [completeString stringByAppendingString:contactOfPersonWhoCalled];
    completeString = [completeString stringByAppendingString:@","];
    NSString *longitude = [HttpHelper createResponseKey:@"longitudeOfInjured" numberValue:[NSNumber numberWithDouble:_injuredCoordinates.longitude]];
    completeString = [completeString stringByAppendingString:longitude];
    completeString = [completeString stringByAppendingString:@","];
    NSString *latitude = [HttpHelper createResponseKey:@"latitudeOfInjured" numberValue:[NSNumber numberWithDouble:_injuredCoordinates.latitude]];
    completeString = [completeString stringByAppendingString:latitude];
    completeString = [completeString stringByAppendingString:@","];
    NSString *longitudeBase = [HttpHelper createResponseKey:@"longitudeOfBase" numberValue:[NSNumber numberWithDouble:_baseCoordinates.longitude]];
    completeString = [completeString stringByAppendingString:longitudeBase];
    completeString = [completeString stringByAppendingString:@","];
    NSString *latitudeBase = [HttpHelper createResponseKey:@"latitudeOfBase" numberValue:[NSNumber numberWithDouble:_baseCoordinates.latitude]];
    completeString = [completeString stringByAppendingString:latitudeBase];
    completeString = [completeString stringByAppendingString:@"}"];
    return completeString;
}

- (NSString *) getArrayOfPersonIds{
    NSString *ids = @"[";
    for (int i = 0; i < _rescuers.count; ++i) {
        ids = [[ids stringByAppendingString:[@"\"" stringByAppendingString:_rescuers[i].person_id]] stringByAppendingString:@"\""];
        if (i != _rescuers.count - 1) {
            ids = [ids stringByAppendingString:@","];
        }
    }
    ids = [ids stringByAppendingString:@"]"];
    return ids;
}



@end
