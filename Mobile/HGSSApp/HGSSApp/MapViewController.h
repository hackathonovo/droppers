//
//  MapViewController.h
//  HGSSApp
//
//  Created by Jure Cular on 19/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>

@interface MapViewController : UIViewController
@property (strong, nonatomic) IBOutlet MKMapView *mapView;

@property (nonatomic) MKPointAnnotation *pointAnnotation;

@end
