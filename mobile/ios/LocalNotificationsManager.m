#import "LocalNotificationsManager.h"
#import <UIKit/UIKit.h>


@implementation LocalNotificationsManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createNotification:(NSDictionary *) options) {

  UILocalNotification* localNotification = [ self buildNotificationFromOptions:options];
  
  UILocalNotification *existingNotification = [self findNotificationEqualTo:localNotification];
  if (existingNotification != nil) {
    [[UIApplication sharedApplication] cancelLocalNotification:existingNotification];
  }
  
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}

RCT_EXPORT_METHOD(findNotification:(NSString *)
                  title body:(NSString *)body
                  fireOn:(NSDate*) fireOn
                  callback:(RCTResponseSenderBlock)callback) {
  
  NSArray *notificationArray = [[UIApplication sharedApplication] scheduledLocalNotifications];
  
  NSMutableArray *dicArray = [NSMutableArray new];
  for(UILocalNotification *currentNotification in notificationArray){
    NSDictionary *notificationPayload = @{
          @"title": currentNotification.alertTitle,
          @"body": currentNotification.alertBody,
          @"action": currentNotification.alertAction,
          @"fireOn": currentNotification.fireDate};
    [dicArray addObject:notificationPayload];
  }
  
  callback(@[dicArray]);
}

-(UILocalNotification *) buildNotificationFromOptions:(NSDictionary *)options {
  NSNumber *seconds = options[@"fireOn"];
  NSString *alertBody = options[@"body"];
  NSString *alertAction = options[@"action"] ? options[@"action"] : @"View Details";
  NSString *alertTitle = options[@"title"];
  
  UILocalNotification* localNotification = [[UILocalNotification alloc] init];
  localNotification.fireDate = [NSDate dateWithTimeIntervalSinceNow:seconds.doubleValue];
  localNotification.alertBody = alertBody;
  localNotification.alertAction = alertAction;
  localNotification.alertTitle = alertTitle;
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  return localNotification;
}

-(UILocalNotification *) findNotificationEqualTo:(UILocalNotification *) notification {
  NSArray *notificationArray = [[UIApplication sharedApplication] scheduledLocalNotifications];
  for(UILocalNotification *currentNotification in notificationArray){
    if ([self isSameNotification:currentNotification as:notification]) {
      return notification;
    }
  }
  return nil;
}

-(BOOL) isSameNotification:(UILocalNotification *)notificationA as:(UILocalNotification *)notificationB {
  return [notificationA.alertTitle isEqualToString:notificationB.alertTitle]
  && [notificationA.alertBody isEqualToString:notificationB.alertBody]
  && [notificationA.fireDate isEqual:notificationB.fireDate];
}

@end
