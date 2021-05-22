//
//  RCTJitsiMeetModule.m
//  Classmate
//
//  Created by Suraj Kiran on 22/05/21.
//

#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTJitsiMeetModule

// Without passing in a name this will export the native module name as the Objective-C class name with “RCT” removed
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(join:(NSString *)name userInfo:(NSDictionary *)userInfo)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name);
}

@end

