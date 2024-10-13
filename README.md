How to Run This Project Locally
Follow the steps below to run the project on your local machine:

1. Clone the GitHub Repository
Open your terminal and run the following command to clone the project:

git clone https://github.com/Mujahid2000/Next-Dashboard.git

2. Navigate to the Project Directory
After cloning, move into the project folder using the terminal:

cd <project-folder>

3. Install Dependencies
Run the following command to install the necessary dependencies:

npm install
4. Open the Project in VS Code
Once the installation is complete, open the project in Visual Studio Code by typing:

code .
This will launch VS Code with the current project folder.
5. Start the Development Server
To start the local development server, run the following command:

npm run dev
This will start the server on localhost:3000.
6. Open the Application in Browser
Open your browser and navigate to:

http://localhost:3000
You should now see the login page.
7. Sign In or Sign Up
When you visit the root URL (/), you will be directed to the Sign In page.
If you don't have an account, click the Sign Up link at the bottom of the Sign In form to register a new account.
8. Access the Dashboard
After successfully signing in, you will be redirected to the Dashboard.


API Documentation:
1. Data GET Method in Nextjs api folder. in this GET api get all data filtered by email.Which is comes from Supabase data table.
2. Data POST Method in Nextjs api folder. In this POST api user can post the data insert the supabase order table.
3. Data DELETE Method in Nextjs api folder. In this DELETE api user can delete a specific data using data ID.
4. Data PUT Method in Nextjs api folder. In this PUT api user can update a specific product quantity using data ID. 


Problems I faced and how I solved them.
Before complete this task I didn't know the supabase. It's a very challenging task for me with use a new technology. But I successfully complete the task. When I work on signUp section I faced some issue for signUp with email.when I try to singUp I see a error in console. after some hours I explore the supabase email authentication. I caught the problem. The problem is when i did not enable email authentication properly. Then I enable the email authentication on right way and then I success to signUp.