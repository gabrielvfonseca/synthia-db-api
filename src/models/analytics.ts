// src/modals/user.ts

/* MongoDB */
import { ObjectId } from "mongodb";

export class NavAnalyticsProps {
  constructor ( 
    public timestamp: Date,
    public page: string, // page
    public userId: ObjectId,
    public ipAddress: string, // 192.168.0.1
    public browser: string, // chrome
    public device: string, // desktop
    public os: string, // windows
    public referrer: string, // https://www.google.com/
    public screenWidth: number, // 1920
    public screenHeight: number, // 1080

    public event: string,
    public eventData: object,
    public userDemographics: {
        location: {
            city: string, // New York
            state: string, // NY
            country: string, // USA
        }
    },
    public userBehavior: {
        pagesVisited: string[], // '/home', '/products', '/cart'
        timeSpentOnPage: { // just example
          '/home': 120,
          '/products': 180,
          '/cart': 60
        },
        actionsTaken: {
          loginButton: 1 // number of times user clicked the button
        }
      },
    public userPreferences: {
        preferredCategories: string[] // 'Electronics', 'Home Goods'
    },
    public performanceMetric: string,
    public performanceValue: number,
  ) {}
};


export class ChatAnalyticsProps {
  constructor (
    public userId: ObjectId,
    public messageId: ObjectId,
    public responseTime: 1500,
    public timestamp: Date,
    public metadata: {
      location: {
        city: string, // New York
        state: string, // NY
        country: string, // USA
      },
      ipAddress: string, // 192.168.0.1
      browser: string, // chrome
      device: string, // desktop
      os: string, // windows
      performanceMetric: string,
      performanceValue: number,
    },
    
    public id?: ObjectId,
  ) {}
}; 