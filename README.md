# spring2020-cs160-team-smores

<h1>FoodButler</h1>
<p>Grocery Stock Management App</p>

<!-- Insert screenshot of app here. -->

<h2>Description</h2>
<p>
The FoodButler is a grocery list organizer available on Web browsers and smartphones (Android, Apple).
This application is for households and grocery shoppers,
who are looking for better tools to organize and manage their household’s grocery stock.
</p>

<h2>Features</h2>
<ul>
  <li>Checks food inside pantries, refridgerators, and other storage places.</li>
  <li>Share shopping lists and grocery stock with friends and families.</li>
</ul>

<h2>Requirements</h2>
<ul>
  <!-- Web requirements for HTML support. -->
  <li>Web browser that supports the latest HTML+CSS.</li>
</ul>

<h2>Updates</h2>
<h3>04/02</h3>
<p>
Integrated products with storages. They can be added in inital create and can be viewed in the storage list.
Deleting the products or storages will update the database.
</p>
<h3>03/29</h3>
<p>
Test front-back-db setup for storages. Based on a tutorial.
Storages can be added to a list and the list is displayed.
Selecting a storage displays it and allows it to be edited.
Storages can be deleted.
REST api
CRUD
</p>


<h2>Installation</h2>
<p>Requires:</p>
<ul>
  <li>Node js</li>
  <li>npm or yarn</li>
  <li>mySQL</li>
</ul>
<p>
Download the project and put the files into a workplace folder.
Install the dependancies using 'npm install'.
At the root of the project, create a .env file with 
  <code>PORT=8081</code> as the content.
 The mySQL server needs to have a database named <code>testdb</code>, and a user matching the specifications in
 the dbconfig file. Afterwards, run the init.sql file.
  Make sure the mySQL server is running and use the init script inside the database folder for first time setup.
Using a command prompt:
  Start the front-end server with '<code>npm start</code>' or '<code>yarn run</code>' at the root folder.
  Start the back-end server with '<code>node server.js</code>' at the root folder.

</p>

<h2>Automated Testing</h2>
<p>Requires:</p>
<ul>
  <li>Node js</li>
  <li>npm or yarn</li>
  <li>mySQL</li>
  <li>Cypress</li>
</ul>
<p>
  Install Cypress to the project using '<code> npm install cypress --save-dev</code>'
  Move the test file automated_tests.js to the cypress/integration.
  Open Cypress after installed using '<code> npx cypress open</code>'
  The automated_test.js tests: 
    -the frontend webpage structure of the website
    -adding products
    -editing products
    -adding storages
    -editing storages
    -removing storages and products
</p>
<h2>Authors</h2>
<ul>
  <li>Alvin Nguyen</li>
  <li>Zachary Costa</li>
  <li>Micheal Chu</li>
  <li>Gricelda Tecun</li>
  <li>Hunter Wright</li>
</ul>
