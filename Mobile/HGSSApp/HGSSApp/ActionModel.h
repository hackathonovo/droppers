//
//  ActionModel.h
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>
#import "PersonModel.h"
@interface ActionModel : NSObject

@property (nonatomic) NSString *leaderId;
@property (nonatomic) NSString *actionDescription;
@property (nonatomic) NSArray<PersonModel *> *rescuers;
@property (nonatomic) CLLocationCoordinate2D injuredCoordinates;
@property (nonatomic) CLLocationCoordinate2D baseCoordinates;
@property (nonatomic) NSString *contactPhoneNumber;
@property (nonatomic) NSString *injuredPhoneNumber;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;
- (NSString *)createJSONString;
@end

