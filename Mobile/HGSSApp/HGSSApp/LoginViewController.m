//
//  LoginViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "LoginViewController.h"
#import "HttpHelper.h"
#import "SSKeychain.h"
#import "AppDelegate.h"

@interface LoginViewController ()

@property (weak, nonatomic) IBOutlet UITextField *usernameTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;
@property (weak, nonatomic) IBOutlet UIButton *loginButton;

@end

@implementation LoginViewController

+ (UIViewController *)createViewControllerFromStoryBoard {
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    UIViewController *vc = [sb instantiateViewControllerWithIdentifier:@"LoginViewController"];
    return vc;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    _loginButton.layer.cornerRadius = 10.0f;
    _loginButton.layer.borderColor = [UIColor whiteColor].CGColor;
    _loginButton.layer.borderWidth = 2.0f;
    UIEdgeInsets contentEdgeInsets = UIEdgeInsetsMake(8,8,8,8);
    _loginButton.contentEdgeInsets = contentEdgeInsets;
    // Do any additional setup after loading the view.
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)didPressLoginButton:(id)sender {
    if (self.usernameTextField.isFirstResponder) {
        [self.usernameTextField resignFirstResponder];
    }
    
    if (self.passwordTextField.isFirstResponder) {
        [self.passwordTextField resignFirstResponder];
    }
    
    if (self.usernameTextField.text.length > 0 && self.passwordTextField.text.length > 0) {
        [self signInRequestWithUsername:self.usernameTextField.text andPassword:self.passwordTextField.text];
    } else {
        UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Pogreska"
                                                                                 message:@"Email ili lozinka nisu vazeci."
                                                                          preferredStyle:UIAlertControllerStyleAlert];
        //We add buttons to the alert controller by creating UIAlertActions:
        UIAlertAction *actionOk = [UIAlertAction actionWithTitle:@"Ok"
                                                           style:UIAlertActionStyleDefault
                                                         handler:nil]; //You can use a block here to handle a press on this button
        [alertController addAction:actionOk];
        [self presentViewController:alertController animated:YES completion:nil];
    }
}

- (void)signInRequestWithUsername:(NSString *)username andPassword:(NSString *)password {
    NSMutableURLRequest *httpRequest = [HttpHelper buildRequestWithPath:@"/api/v1/users/login" andMethod:@"POST" andAuthType:HTTPBasicAuthorization andRequestContentType:HTTPJsonContent andRequestBoundry:@""];
    NSString *iosToken = [SSKeychain passwordForService:@"iosToken" account:@"KeyChainService"];
    NSString *usernameString = [HttpHelper createResponseKey:@"email" value:username];
    NSString *passwordString = [HttpHelper createResponseKey:@"password" value:password];
    NSString *iphoneTokenString = [HttpHelper createResponseKey:@"iosToken" value:iosToken];
    httpRequest.HTTPBody = [[[[[[[@"{" stringByAppendingString:usernameString] stringByAppendingString:@","] stringByAppendingString:passwordString] stringByAppendingString:@","] stringByAppendingString:iphoneTokenString] stringByAppendingString:@"}"] dataUsingEncoding:NSUTF8StringEncoding];
    [HttpHelper sendRequest:httpRequest withCompletition:^(NSData * data, NSError * error) {
        if (error != nil) {
            UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Pogreska"
                                                                                     message:@"Doslo je do pogreske kod dohvacanja podataka, pokusajte ponovo."
                                                                              preferredStyle:UIAlertControllerStyleAlert];
            //We add buttons to the alert controller by creating UIAlertActions:
            UIAlertAction *actionOk = [UIAlertAction actionWithTitle:@"Ok"
                                                               style:UIAlertActionStyleDefault
                                                             handler:nil]; //You can use a block here to handle a press on this button
            [alertController addAction:actionOk];
            [self presentViewController:alertController animated:YES completion:nil];
            return;
        }
        
        NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
    
        [SSKeychain setPassword:responseDictionary[@"id"] forService:@"user_id" account:@"KeyChainService"];
        [self updateUserLogin];
        [self saveTokenInKeychain:responseDictionary];
        AppDelegate *delegate = (AppDelegate *)UIApplication.sharedApplication.delegate;
        [delegate startLocationTracking];
    }];
}

- (void)updateUserLogin {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:@"loggedIn" forKey:@"userLoggedIn"];
    [defaults synchronize];
}

- (void)saveTokenInKeychain:(NSDictionary *)tokenDictionary {
    [tokenDictionary enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        NSString *myKey = (NSString *)key;
        NSString *myObj = (NSString *)obj;
        
        if ([myKey  isEqual: @"accessToken"]) {
            [SSKeychain setPassword:myObj forService:@"Auth_Token" account:@"KeyChainService"];
        }
    }];
        
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    if (self.usernameTextField.isFirstResponder) {
        [self.usernameTextField resignFirstResponder];
    }
    
    if (self.passwordTextField.isFirstResponder) {
        [self.passwordTextField resignFirstResponder];
    }
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
