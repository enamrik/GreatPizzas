#import "CalendarManager.h"
#import <EventKit/EventKit.h>

@interface CalendarManager ()
@property EKEventStore *store;
@property(retain) EKEventEditViewController *controller;
@property(copy) RCTResponseSenderBlock eventCallback;
@end

@implementation CalendarManager

-(id) init {
  self = [super init];
  if (self) {
    _store = [EKEventStore new];
  }
  return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name
                  location:(NSString *)location
                  date:(NSDate *)date
                  callback:(RCTResponseSenderBlock)callback) {
  
  [self.store requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
   
    if(error){
      callback(@[[error description], [NSNull null]]);
    }
    else if(!granted) {
      callback(@[@"ACCESS_DENIED", [NSNull null]]);
    }
    else if (self.controller) {
      callback(@[@"CAL_OPENED", [NSNull null]]);
    }
    else {
      dispatch_async(dispatch_get_main_queue(), ^{
        EKEvent *event = [EKEvent eventWithEventStore:self.store];
        event.title = name;
        event.notes = name;
        event.location = location;
        event.startDate = date;
        event.endDate = date;
        event.calendar = [self.store defaultCalendarForNewEvents];
        
        [self presentEvent: event withStore:self.store callback:callback];
      });
    }
  }];
}

- (void)presentEvent:(EKEvent *) event
           withStore:(EKEventStore *)store
            callback:(RCTResponseSenderBlock)callback {
  
  self.eventCallback = callback;
  self.controller = [[EKEventEditViewController alloc] init];
  self.controller.event = event;
  self.controller.eventStore = store;
  self.controller.editViewDelegate = self;
  
   UIViewController *rootController = [UIApplication sharedApplication].delegate.window.rootViewController;
  [rootController presentViewController:self.controller animated:YES completion:nil];
}

- (void)eventEditViewController:(EKEventEditViewController *)controller
          didCompleteWithAction:(EKEventEditViewAction)action {
  self.eventCallback(@[[NSNull null], [NSNull null]]);
  [self.controller dismissViewControllerAnimated:YES completion:^{
    self.controller = nil;
    self.eventCallback = nil;
  }];
}
@end
