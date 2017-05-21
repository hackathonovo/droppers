//
//  MapViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 19/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "MenuTableViewController.h"

@implementation SWUITableViewCell
@end

@implementation MenuTableViewController


- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // configure the destination view controller:
    if ([sender isKindOfClass:[UITableViewCell class]]) {
        UILabel *c = [(SWUITableViewCell *)sender label];
        UINavigationController *navController = segue.destinationViewController;
        //        ColorViewController* cvc = [navController childViewControllers].firstObject;
        //        if ( [cvc isKindOfClass:[ColorViewController class]] )
        //        {
        //            cvc.color = c.textColor;
        //            cvc.text = c.text;
        //        }
    }
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 0;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    //    static NSString *CellIdentifier = @"Cell";
    //
    //    switch ( indexPath.row )
    //    {
    //        case 0:
    //            CellIdentifier = @"map";
    //            break;
    //
    //        case 1:
    //            CellIdentifier = @"blue";
    //            break;
    //
    //        case 2:
    //            CellIdentifier = @"red";
    //            break;
    //    }
    //
    //    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier: CellIdentifier forIndexPath: indexPath];

    return nil;
}

#pragma mark state preservation / restoration
- (void)encodeRestorableStateWithCoder:(NSCoder *)coder {
    NSLog(@"%s", __PRETTY_FUNCTION__);

    // TODO save what you need here

    [super encodeRestorableStateWithCoder:coder];
}

- (void)decodeRestorableStateWithCoder:(NSCoder *)coder {
    NSLog(@"%s", __PRETTY_FUNCTION__);

    // TODO restore what you need here

    [super decodeRestorableStateWithCoder:coder];
}

- (void)applicationFinishedRestoringState {
    NSLog(@"%s", __PRETTY_FUNCTION__);

    // TODO call whatever function you need to visually restore
}

@end
