
#import "MainViewController.h"

@implementation MainViewController

-(void) viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  [self registerForNotifications];
}

-(void) registerForNotifications {
  UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
  UIUserNotificationSettings *mySettings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:mySettings];
}

@end
