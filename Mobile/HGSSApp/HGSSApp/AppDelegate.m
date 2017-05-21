//
//  AppDelegate.m
//  HGSSApp
//
//  Created by Jure Cular on 19/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "AppDelegate.h"
#import "LoginViewController.h"
#import "ManagerViewController.h"
#import "SSKeychain.h"
#import "LocationModel.h"
#import "HttpHelper.h"

#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
@interface AppDelegate () <CLLocationManagerDelegate>

@property (nonatomic) CLLocationManager *locationManager;
@property (nonatomic) NSTimer *locationSendTimer;
@property (nonatomic) BOOL startUpdatingLocation;

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    _startUpdatingLocation = YES;
//    [defaults removeObjectForKey:@"userLoggedIn"];
    
    if ([defaults objectForKey:@"userLoggedIn"] == nil) {
        UIViewController *loginController = [LoginViewController createViewControllerFromStoryBoard];
        [self.window makeKeyAndVisible];
        [self.window.rootViewController presentViewController:loginController animated:YES completion:nil];
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = self;
        [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge)
                              completionHandler:^(BOOL granted, NSError *_Nullable error) {
                                  if (!error) {
                                      [[UIApplication sharedApplication] registerForRemoteNotifications]; // required to get the app to do
                                                                                                          // anything at all about push
                                                                                                          // notifications
                                      NSLog(@"Push registration success.");
                                  } else {
                                      NSLog(@"Push registration FAILED");
                                      NSLog(@"ERROR: %@ - %@", error.localizedFailureReason, error.localizedDescription);
                                      NSLog(@"SUGGESTIONS: %@ - %@", error.localizedRecoveryOptions, error.localizedRecoverySuggestion);
                                  }
                              }];
    } else {
        [self startLocationTracking];
        
        
//        UIViewController *managerViewController = [ManagerViewController createViewControllerFromStoryBoard];
//        [self.window makeKeyAndVisible];
//        [self.window.rootViewController showViewController:managerViewController sender:self.window.rootViewController];
    }
    return YES;
}

- (void)startLocationTracking {
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
    self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)])
    {
        [self.locationManager requestAlwaysAuthorization];
    }
    [self.locationManager startUpdatingLocation];
    NSTimeInterval interval = 300.0f;
    _locationSendTimer = [NSTimer scheduledTimerWithTimeInterval:interval target:self selector:@selector(startUpdatingAgain) userInfo:nil repeats:YES];
}

- (void)startUpdatingAgain {
    _startUpdatingLocation = YES;
    [_locationManager startUpdatingLocation];
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (void)application:(UIApplication *)app didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet: [NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];
    [SSKeychain setPassword:token forService:@"iosToken" account:@"KeyChainService"];
}

-(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void
                                                                                                                               (^)(UIBackgroundFetchResult))completionHandler
{
    // iOS 10 will handle notifications through other methods
    
    if( SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO( @"10.0" ) )
    {
        NSLog( @"iOS version >= 10. Let NotificationCenter handle this one." );
        self.window = [[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
        
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        
        UIViewController *viewController = // determine the initial view controller here and instantiate it with [storyboard instantiateViewControllerWithIdentifier:<storyboard id>];
        
        self.window.rootViewController = viewController;
        [self.window makeKeyAndVisible];
        // set a member variable to tell the new delegate that this is background
        return;
    }
    NSLog( @"HANDLE PUSH, didReceiveRemoteNotification: %@", userInfo );
    
    // custom code to handle notification content
    
    if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
    {
        NSLog( @"INACTIVE" );
        completionHandler( UIBackgroundFetchResultNewData );
    }
    else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
    {
        NSLog( @"BACKGROUND" );
        completionHandler( UIBackgroundFetchResultNewData );
    }
    else
    {
        NSLog( @"FOREGROUND" );
        completionHandler( UIBackgroundFetchResultNewData );
    }
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo  
{  
    [self application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:^(UIBackgroundFetchResult result) {  
    }];  
}

#pragma mark - CLLocationManagerDelegate

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError: %@", error);
}

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation
{
    NSLog(@"didUpdateToLocation: %@", newLocation);
    CLLocation *currentLocation = newLocation;
    
    if (currentLocation != nil && _startUpdatingLocation) {
        _startUpdatingLocation = NO;
        NSString *userId = [SSKeychain passwordForService:@"user_id" account:@"KeyChainService"];
        LocationModel *location = [[LocationModel alloc] init];
        location.longitude = [NSNumber numberWithDouble:currentLocation.coordinate.longitude];
        location.latitude = [NSNumber numberWithDouble:currentLocation.coordinate.latitude];
        location.userId = userId;
        
        NSMutableURLRequest *httpRequest = [HttpHelper buildRequestWithPath:@"/api/v1/users/location" andMethod:@"POST" andAuthType:HTTPTokenAuth andRequestContentType:HTTPJsonContent andRequestBoundry:@""];
        httpRequest.HTTPBody = [[location createJSONString] dataUsingEncoding:NSUTF8StringEncoding];
        [HttpHelper sendRequest:httpRequest withCompletition:nil];
    }
    [self.locationManager stopUpdatingLocation];
}

@end
