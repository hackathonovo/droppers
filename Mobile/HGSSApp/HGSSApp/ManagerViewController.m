//
//  ViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 19/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "ManagerViewController.h"
#import "UIColor+Additions.h"

@interface ManagerViewController ()

@property (weak, nonatomic) IBOutlet UIButton *searchButton;
@property (weak, nonatomic) IBOutlet UIButton *saveButton;

@end

@implementation ManagerViewController

+ (UIViewController *)createViewControllerFromStoryBoard {
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    UIViewController *vc = [sb instantiateViewControllerWithIdentifier:@"ManagerViewController"];
    return vc;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    


    _saveButton.layer.borderWidth = 2.0f;
    _saveButton.layer.cornerRadius = 10.0f;
    _saveButton.layer.borderColor = [UIColor hgss_redColor].CGColor;
    UIEdgeInsets contentEdgeInsets = UIEdgeInsetsMake(8,8,8,8);
    _saveButton.contentEdgeInsets = contentEdgeInsets;
    
    _searchButton.layer.borderWidth = 2.0f;
    _searchButton.layer.cornerRadius = 10.0f;
    _searchButton.layer.borderColor = [UIColor hgss_redColor].CGColor;
    _searchButton.contentEdgeInsets = contentEdgeInsets;
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
