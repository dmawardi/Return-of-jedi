# FACE IN
CheckIn CheckIn is a website that will aim to provide a SAAS for businesses to manage their employees’ attendance at work. As organizations continue to grow and expand globally, it becomes increasingly difficult to track whether or not employees attend the workplace for the contracted work hours. Our CheckIn system aims to solve that issue while also being a cheap implementation for businesses.

How does it work: An organization can establish an account with us which will allow them to setup employees in a database with a face profile. The employees can then check in and out of work using facial recognition. We will serve as a data-capture software and allow employers to use this information for analytical purposes. The user experience will be designed in a way where once an employee has completed initial setup, coming in and out of work everyday should be seamless.

## Deployment
[Return of JEDI](https://return-of-the-jedi.herokuapp.com/)

## Employer Pages (Wireframes)
Initial planning for this project is visualized in the following diagram where and Employer have two options
                
1. An Employer can Signup
2. An Employer can Login. After logged in, he can add a new employee or search for an employee.
                
![Admin](https://github.com/dmawardi/Return-of-jedi/blob/master/public/imgs/adminpages.png?raw=true=300x242)

## Employee page (Wireframe)
From the main page, an employee can register using face recognition for the first time. After registered, he can use his facial recognition to check in. The interface is simple with some basic details.

![Employee](https://github.com/dmawardi/Return-of-jedi/blob/master/public/imgs/customerview.png?raw=true=150x120)

# Architecture diagram
The following architecture diagram explains how the frontend and backend technologies are used to create the application. On the client side we have used the following technologies:
## FRONTEND 
1. Templating Engine (handlebars)
2. HTML5
3. CSS
4. JQUERY (to dynamically manipulate the views)

## SERVER ENVIRONMENT
To make ther server functional we have used: 
1. Node Js (enables JavaScript to run on the server)
2. Express (A Node.js web application framework, providing a robust set of features for building single and multi page and hybrid web applications.)

## MIDDLEWARES
1. PASSPORT (authentication module based on username and password)

## APIS
1. REST APIs (HTTP methods)
2. Face-API

## ORM
1. Sequelize (manipulate data from a database using an object-oriented paradigm)

## DATA STORE
We use MySQL to create a schema for our Employee, Employer, and Timesheet models

![Architecture Diagram](https://drive.google.com/uc?export=view&id=1BHZby0O6Y4c5Z_89Qn38T4tJ-NLIkVKx)


## Authors

Seethe list of [contributors](https://github.com/dmawardi/Return-of-jedi/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


