//
//  PersonModel.h
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>
@interface PersonModel : NSObject

typedef NS_ENUM(NSInteger, RankType) {
    Member,
    Rookie,
    Expirienced
};

@property (nonatomic, nonnull) NSString *person_id;
@property (nonatomic, nonnull) NSString *firstName;
@property (nonatomic, nonnull) NSString *lastName;
@property (nonatomic, nonnull) NSString *phoneNumber;
@property (nonatomic, nonnull) NSArray<NSString *> *specialities;
@property (nonatomic, nonnull) NSNumber *latitude;
@property (nonatomic, nonnull) NSNumber *longitude;
@property (nonatomic) RankType rank;
@property (nonatomic) BOOL hasSearchDog;

- (instancetype _Nonnull )initWithDictionary:(NSDictionary *_Nonnull)dictionary;
- (NSString *)createJSONString;
@end
