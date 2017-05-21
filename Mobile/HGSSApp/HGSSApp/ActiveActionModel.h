//
//  ActiveActionModel.h
//  HGSSApp
//
//  Created by Jure Cular on 21/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "ActionModel.h"
#import "AreaModel.h"
#import "SecondLocationModel.h"

@interface ActiveActionModel : ActionModel
@property (nonatomic) BOOL active;
@property (nonatomic) NSArray<AreaModel *> *areas;
@property (nonatomic) SecondLocationModel *baseLocation;
@property (nonatomic) SecondLocationModel *lastKnownLocationOfPerson;
@property (nonatomic) NSString *leaderId;
@property (nonatomic) NSString *actionDescription;
@property (nonatomic) NSArray<PersonModel *> *rescuers;
@property (nonatomic) CLLocationCoordinate2D injuredCoordinates;
@property (nonatomic) CLLocationCoordinate2D baseCoordinates;
@property (nonatomic) NSString *contactPhoneNumber;
@property (nonatomic) NSString *injuredPhoneNumber;

@end
