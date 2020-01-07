You can preview the application <a href="http://themoviezone.herokuapp.com/">here</a>.

This single page application was build in <b>Angular 8</b>.

The code behind the <b>.NET Core 2.2</b> server running the application can be found <a href="https://github.com/ajinkyad8/MovieAppAPI">here</a>.

## Requirements
- <a href="https://nodejs.org/en/"> Node.js </a>
- <a href="https://cli.angular.io/">Angular CLI </a>
- <a href="https://git-scm.com/">Git (optional)</a>

## Steps
### 1) Copy and Run the .NET Core Server
Follow the steps 1-7 from <a href="https://github.com/ajinkyad8/MovieAppAPI/blob/master/README.md">here</a>. This will be running the backend server for the application.

<i>The API also has seperate requirements. Make sure you go through them and make the necessary downloads to ensure the server is running properly.</i>

### 2) Copy the Angular Application.
Using the same step that you used to copy the .NET Core server copy the angular application.

If using Git run the following command

`git clone https://github.com/ajinkyad8/MovieAppSPA.git`

### 3) Restore the packages
Major Packages Used
- Bootstrap 4
- Ngx-Bootstrap
- Bootswatch
- Font Awesome
- Auth0/Angular-Jwt

In the directory where you have copied the project run the following command

`npm install`

### 4) Build the project
In your project directory run the following command


`ng serve`

On a successfull build the terminal will show the following message
>** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
i ｢wdm｣: Compiled successfully.

Open <i>localhost:4200</i> on your web broswer to access the application.

### 5) Add some role types and get started.
Login as <b>Admin</b>. Click on the Admin option on the navbar. Select <b>Movie Role Types</b>, click on <b>Add</b> and add some role types to get started.

You can add <b>Actor</b> as a role type for starters. Add some movies and artists with their photos, add some movie roles and explore the admin and moderator panels to see all the features of the application.


Details about the application can be found back <a href="https://github.com/ajinkyad8/MovieAppAPI/blob/master/README.md">here</a> under the <b>Flow</b> section.


<b>**Note</b>

Since the built files of this project are already present in the API code you can access the app from <i>localhost:5000</i> on your browser as well, which is the port where the .NET Core server is running.

However, if you make any changes to the Angular code they won't be reflected there and will only be observed on <i>localhost:4200</i>.

To do that in the <b>angular.json</b> file make sure in line 16 the <b>outputPath</b> refers to the wwwroot folder of your API. Once you ensure that run the following command-

`ng build --prod`

After this the changes that you had made will be visible when accessing the application on the .NET Core server port as well.
