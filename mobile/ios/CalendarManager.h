#import <Foundation/Foundation.h>
#import <EventKitUI/EventKitUI.h>
#import "RCTBridgeModule.h"

@interface CalendarManager : NSObject <RCTBridgeModule, EKEventEditViewDelegate>

@end
