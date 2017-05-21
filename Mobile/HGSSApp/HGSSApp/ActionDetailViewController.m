
//
//  ActionDetailViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "ActionDetailViewController.h"
#import "LastLocationMapViewController.h"
#import "BaseLocationMapViewController.h"
#import "TeamPickerViewController.h"
#import <MapKit/MapKit.h>
#import "ActionModel.h"
#import "SSKeychain.h"

@interface ActionDetailViewController ()

@property (nonatomic) ActionModel *actionModel;

@property (weak, nonatomic) IBOutlet UITextField *missingPersonTextField;
@property (weak, nonatomic) IBOutlet UITextField *contactPersonTextField;
@property (weak, nonatomic) IBOutlet UITextField *shortSearchDescriptionTextField;

@end

@implementation ActionDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _actionModel = [[ActionModel alloc] init];
    _actionModel.leaderId = [SSKeychain passwordForService:@"user_id" account:@"KeyChainService"];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    if (_missingPersonTextField.isFirstResponder) {
        [_missingPersonTextField resignFirstResponder];
    }

    if (_contactPersonTextField.isFirstResponder) {
        [_contactPersonTextField resignFirstResponder];
    }

    if (_shortSearchDescriptionTextField.isFirstResponder) {
        [_shortSearchDescriptionTextField resignFirstResponder];
    }
}

- (IBAction)unwindToActionDetailViewController:(UIStoryboardSegue *)unwindSegue {
    UIViewController *sourceViewController = unwindSegue.sourceViewController;

    if ([sourceViewController isKindOfClass:[LastLocationMapViewController class]]) {
        _actionModel.injuredCoordinates = [(LastLocationMapViewController *)sourceViewController pointAnnotation].coordinate;
    }
}

#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([segue.destinationViewController isKindOfClass:BaseLocationMapViewController.class]) {
        BaseLocationMapViewController *destinationViewController = (BaseLocationMapViewController *)segue.destinationViewController;
        
        _actionModel.actionDescription = _shortSearchDescriptionTextField.text;
        _actionModel.contactPhoneNumber = _contactPersonTextField.text;
        _actionModel.injuredPhoneNumber = _missingPersonTextField.text;
        destinationViewController.actionModel = _actionModel;
    }
    if ([segue.destinationViewController isKindOfClass:LastLocationMapViewController.class]) {
        LastLocationMapViewController *destinationViewController = (LastLocationMapViewController *)segue.destinationViewController;
        destinationViewController.actionModel = _actionModel;
    }
    if ([segue.destinationViewController isKindOfClass:TeamPickerViewController.class]) {
        TeamPickerViewController *destinationViewController = (TeamPickerViewController *)segue.destinationViewController;
        destinationViewController.actionModel = _actionModel;
    }
}


@end
