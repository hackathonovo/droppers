//
//  MapViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 19/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "MapViewController.h"

@interface MapViewController () <MKMapViewDelegate>

@property (nonatomic) IBOutlet UIBarButtonItem *revealButtonItem;

@end

@implementation MapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _mapView.delegate = self;
    UILongPressGestureRecognizer *lpgr = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(handleLongPress:)];
    lpgr.minimumPressDuration = 0.5; // user needs to press for 2 seconds
    [self.mapView addGestureRecognizer:lpgr];
}


- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    if (_pointAnnotation != nil) {
        [_mapView addAnnotation:_pointAnnotation];
    }
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


//#pragma mark - MKMapViewDelegate
//
//- (MKOverlayRenderer *)mapView:(MKMapView *)map viewForOverlay:(id<MKOverlay>)overlay {
//    MKPolygonRenderer *circleView = [[MKPolygonRenderer alloc] initWithOverlay:overlay];
//    circleView.strokeColor = [UIColor redColor];
//    circleView.fillColor = [[UIColor redColor] colorWithAlphaComponent:0.4];
//    return circleView;
//}

@end
