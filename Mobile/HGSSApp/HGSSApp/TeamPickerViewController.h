//
//  TeamPickerViewController.h
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ActionModel.h"

@interface TeamPickerViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

@property (nonatomic) ActionModel *actionModel;

@end
