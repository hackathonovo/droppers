//
//  SearchDetailsViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "SearchDetailsViewController.h"
#import <MapKit/MapKit.h>
#import "UIColor+Additions.h"
@interface SearchDetailsViewController () <MKMapViewDelegate>

@property (weak, nonatomic) IBOutlet UITextField *missingNumberTextField;
@property (weak, nonatomic) IBOutlet UIStepper *missingNumberStepper;
@property (weak, nonatomic) IBOutlet MKMapView *mapView;
@property (weak, nonatomic) IBOutlet UIButton *continueButton;

@property (nonatomic) MKPointAnnotation *pointAnnotation;
@property (nonatomic) NSNumber *missingNumber;

@end

@implementation SearchDetailsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"Potraga";
    
    _mapView.layer.cornerRadius = 20.0f;
//    _mapView.layer.borderWidth = 2.0f;
//    _mapView.layer.borderColor = [UIColor hgss_redColor].CGColor;
    _mapView.delegate = self;
    
    UILongPressGestureRecognizer *lpgr = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(handleLongPress:)];
    lpgr.minimumPressDuration = 0.3; // user needs to press for 2 seconds
    
    [_mapView addGestureRecognizer:lpgr];
    
    _continueButton.layer.cornerRadius = 10.0f;
    _continueButton.layer.borderColor = [UIColor hgss_redColor].CGColor;
    _continueButton.layer.borderWidth = 2.0f;
    // Do any additional setup after loading the view.
}

- (void)handleLongPress:(UIGestureRecognizer *)gestureRecognizer {
    if (gestureRecognizer.state != UIGestureRecognizerStateBegan)
        return;
    
    if(_pointAnnotation != nil) {
        [_mapView removeAnnotation:_pointAnnotation];
    }
    
    CGPoint touchPoint = [gestureRecognizer locationInView:self.mapView];
    CLLocationCoordinate2D touchMapCoordinate = [self.mapView convertPoint:touchPoint toCoordinateFromView:self.mapView];
    
    _pointAnnotation = [[MKPointAnnotation alloc] init];
    _pointAnnotation.coordinate = touchMapCoordinate;
    [self.mapView addAnnotation:_pointAnnotation];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)didPressStepper:(id)sender {
    _missingNumberTextField.text = [[NSNumber numberWithDouble:_missingNumberStepper.value] stringValue];
}
- (IBAction)didChangeMissingNumber:(id)sender {
    _missingNumberStepper.value = [_missingNumberTextField.text doubleValue];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
