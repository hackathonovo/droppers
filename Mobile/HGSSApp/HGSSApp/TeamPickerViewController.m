//
//  TeamPickerViewController.m
//  HGSSApp
//
//  Created by Jure Cular on 20/05/2017.
//  Copyright © 2017 HGSS-hackathon. All rights reserved.
//

#import "TeamPickerViewController.h"
#import "HttpHelper.h"
#import "PersonTableViewCell.h"
#import "SWRevealViewController.h"

@interface TeamPickerViewController ()

@property (nonatomic) NSArray<PersonModel *> *datasource;
@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end

@implementation TeamPickerViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _datasource = [[NSArray alloc] init];
    NSMutableURLRequest *httpRequest = [HttpHelper buildRequestWithPath:@"/api/v1/users/" andMethod:@"GET" andAuthType:HTTPTokenAuth andRequestContentType:HTTPJsonContent andRequestBoundry:@""];
    
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
        

        
        NSArray<NSDictionary *> *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
        _datasource = [self createDatasourceFromArray:responseDictionary];
        [self.tableView reloadData];
    }];
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSArray<PersonModel *> *)createDatasourceFromArray:(NSArray<NSDictionary *> *)array {
    NSMutableArray<PersonModel *> *datasource = [[NSMutableArray alloc] init];
    for (NSDictionary *person in array) {
        [datasource addObject:[[PersonModel alloc] initWithDictionary:person]];
    }
    return datasource;
}

#pragma mark - TableViewDelegate 

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return _datasource.count;
}

// Row display. Implementers should *always* try to reuse cells by setting each cell's reuseIdentifier and querying for available reusable cells with dequeueReusableCellWithIdentifier:
// Cell gets various attributes set automatically based on table (separators) and data source (accessory views, editing controls)

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    PersonTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PersonTableViewCell" forIndexPath:indexPath];
    
    cell.fullNameLabel.text = [[_datasource[indexPath.row].firstName stringByAppendingString:@" "]stringByAppendingString: _datasource[indexPath.row].lastName];
    
    return cell;
}




#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([segue.destinationViewController isKindOfClass:SWRevealViewController.class]) {
        NSMutableArray *rescuers = [[NSMutableArray alloc] init];
        for(NSIndexPath *indexPath in _tableView.indexPathsForSelectedRows) {
            [rescuers addObject:_datasource[indexPath.row]];
        }
        _actionModel.rescuers = rescuers;
        NSMutableURLRequest *httpRequest = [HttpHelper buildRequestWithPath:@"/api/v1/rescue/define" andMethod:@"POST" andAuthType:HTTPTokenAuth andRequestContentType:HTTPJsonContent andRequestBoundry:@""];
        httpRequest.HTTPBody = [[_actionModel createJSONString] dataUsingEncoding:NSUTF8StringEncoding];
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
        }];
    }
}


@end
