//
//  LocationModel.h
//  HGSSApp
//
//  Created by Jure Cular on 21/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LocationModel : NSObject

@property (nonatomic) NSString *userId;
@property (nonatomic) NSNumber *longitude;
@property (nonatomic) NSNumber *latitude;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;
- (NSString *)createJSONString;
@end
