# VueJS FrontEnd App
 `Hosted link` - click here : <a href="https://restfront.netlify.app/#/">App</a>

TeamMembers-Dhayanand Dharmalingam , Aninda Maulik , Poulomi Nandy.
## About the Project
This application helps to manage heater and window IoT devices remotely. This front-end application developed using VUE -JS framework. 

## What functionalities it has?
1. **Room Management**


This has 2 Tabs:
  - TAB Rooms where we can see the details like current temperature,Target temperature,Floor,No. of heater with heater status,No. of windows with window status.Also the app has 4 buttons **Close All Window** which will close all the windows. **Off All Heaters** which will switch off the heaters.**Windows** which will take user to the windows tab.**Heaters** which will take user to heater tab. 
  - TAB Create-Room where you can add a new room with target temperature floor detail and building name. 

2. **Windows Management**


This has 2 Tabs:
   - TAB Windows: where we can see the window details and its corresponding room number and its status. User has the provision to change the status and to delete any particular window if he wants to.
   - TAB Create-Windows: where user can add a new windo to the list by choosing the correct option from the drop down for window status and room.

3. **Heater**

     Where user can see the list of heaters and heater status. Each heater detail has 2 buttons where user can change the status of the heater and can delete any particular heater.

The data are getting fetched from remote API which is hosted in <a href="rest-api.cleverapps.io">clever cloud</a>


  

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
