# planesurvey

## description
### overview
PlaneSurvey, as the name suggests, is a plane survey website. The user is able to fill out this form and record their response into a database.
The user is then able to search the data for any response that was added into the database.

### tech stack
This website was build using vanilla HTML, CSS, and Javascript for the frontend, while using MongoDB as its database, and Java Spring Boot for the
backend. The website is containerized on Docker and hosted on Azure utilizing its Container App feature.

### the journey
Being my first project, this website was a learning adventure into all aspects of web development including building the UI, letting it communicate
with the database and navigate to different pages. Trying to turn my UI visions into reality was difficult as I did not have enough knowledge to do so. Thus, this project was very much done through trial and error, trying other people's code and altering it to fit my needs. Eventually, I picked up on many skills and I was able to create my own solutions to make the frontend like I wanted to. The backend was particularly tricky as well. Spring can either be used in a MVC pattern or a REST pattern, and in an attempt to maintain convention, I struggled to have my application fit one or the other. I opted to have both(?). I am not entirely sure if this follows convention and good coding practice, but it will have to do for now.

### future features
As functional as the website is right now, it is unfortunately specifically tailored to Safari on laptops and PCs. On the phone, it does not look that good and there is a bunch of empty space. In addition, some styling does not reflect on other browsers. Thus, this universalness needs to be implemented. 

Security is another big aspect that needs to be included in this website. Currently, users are able to access any endpoint. This needs to be prevented via Spring Security or some other related technology.

Test cases also need to be written

## access
To access this website, navigate to [link planesurvey.live](https://planesurvey.live).

## license
This project is uses the Apache 2.0 License.


