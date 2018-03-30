# MongoDB-Migration-Node-Script

### This was a challenge/assignment from [EDX](https://edx.org), course ["Introduction to Node.js"](https://www.edx.org/course/introduction-to-nodejs), Module 3. 

#### The project is a implementation of a Node.js script that will merge two JSON data that are incomplete to make the full information dataset. The program will create smaller sets of the full dataset and insert them on the database with multiple queries using the "async" module. This dataset has 1000 values and will be saved to a database using the "mongodb" npm module.

- - - - 

___LINUX/MAC___:

To easily test it, you need to open two *terminal* windows, with the sole condition that one of them has to be on the working directory folder. Follow the instructions section below.

___WINDOWS___:

  * If you have *Git* installed on your pc, you just need to go to the folder where you downloaded the project, unzip it, enter on the project folder, right click on a blank space, and click the option "Git Bash Here". Then, follow the instructions section below
  * If you dont have *Git*, then:
     1. Click **Windows Key** + **R** and type **cmd**
     2. Find the directory where you downloaded the project and unzip it
     3. Repeat i.
     4. The project probably is saved on your Downloads or Desktop folder, so just type: 
 ```
    cd Downloads\MongoDB-Migration-Node-Script   OR   cd Downloads\MongoDB-Migration-Node-Script 
 ``` 
    
- - - -

### INSTRUCTIONS

  1. On the *terminal/cmd* window that does not require to be working on the project folder, use the command: 
  ```
  mongod
  ```
  2. At the other *terminal/cmd*, use the command: 
  ```
  npm i
  ```
  3. Still on the second one, after the packages are installed, type:
  ```
  node migrate-data.js INTVALUE       <-- INTVALUE = integer value between 1 and 1000
  ```
  4. To check if the values were saved on the database, open another *terminal/cmd* and execute the following commands:
  ```
  mongo
  use edx-course-db
  db.customers.find({}).count()       <-- The output value has to be 1000
  db.customers.find({id: "ANYID"})    <-- ANYID = integer value between 1 and 1000
  ```
    
- - - -    

### SOME OBSERVATIONS

* Node.JS and MongoDB have to be installed in order to run this project.

* INTVALUE should be any integer value between 1 and 1000, so the program runs correctly. This value will be the size of the smaller sets of the complete json file.

* The queries to write the information will be done simultaneously. The amout of queries is defined by **N_QUERIES = FULL_DATASET / INTVALUE**.

* The *JSON* files are not saved on the database. They are first merged on the program and then saved through the queries.
