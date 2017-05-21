//
//  AreaModel.h
//  HGSSApp
//
//  Created by Jure Cular on 21/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AreaModel : NSObject

@property (nonatomic) NSArray<NSArray<NSNumber *> *> *coordinates;
@property (nonatomic) NSNumber *areaId;
@property (nonatomic) NSString *type;

@end
