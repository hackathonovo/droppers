//
//  BaseLocationMapViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "BaseLocationMapViewController.h"

@interface BaseLocationMapViewController ()

@end

@implementation BaseLocationMapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    if (CLLocationCoordinate2DIsValid(_actionModel.baseCoordinates)) {
        self.pointAnnotation = [[MKPointAnnotation alloc] init];
        self.pointAnnotation.coordinate = _actionModel.baseCoordinates;
        [self.mapView addAnnotation:self.pointAnnotation];
    }
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    _actionModel.baseCoordinates = self.pointAnnotation.coordinate;
    BaseLocationMapViewController *destinationViewController = (BaseLocationMapViewController *)segue.destinationViewController;
    destinationViewController.actionModel = _actionModel;
}

@end
