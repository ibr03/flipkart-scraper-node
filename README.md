# Flipkart Scraper Node.js App

This is a Node.js application built using Express.js and MongoDB for scraping Flipkart product data. The application provides APIs for user authentication, saving Flipkart URLs, and retrieving scraped data.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/ibr03/flipkart-scraper-node.git
   cd flipkart-scraper-node
   ```

2. Install dependencies 

    ```
    npm install
    ```

3. Register with MongoDB Atlas

   Create your free MongoDB atlas account, create a cluster and collection to get MONGO_URI. Plug in the MONGO_URI inside your own .env file.

   ```
   MONGO_URI=your-mongo-uri
   ```  

4. Set up JWT_KEY

   Add your JWT (jsonwebtoken) secret inside the .env file. 
   
   ```
   JWT_SECRET=your-secret-key
   ```   

5. Set up your PORT

   Inside your .env file, enter your desired PORT value - 

   ```
   PORT=your-port
   ```   

## Usage

1. Run the application 

   ```
   npm run dev
   ```

2. API Routes -

* POST /signup: Create a new user account.
* POST /login: Authenticate and get a JWT token.

  Authenticated Routes:

* POST /postFlipkartUrl: Save a Flipkart URL (requires JWT token in headers).
* GET /getFlipkartData: Get scraped Flipkart data (requires JWT token in headers).

3. Testing with Postman - 

   Check out the following Postman collection to test out the APIs - 
   https://www.postman.com/telecoms-technologist-44260770/workspace/my-workspace/collection/26804310-07c177c2-643a-4749-b8ac-39aea571c22d?action=share&creator=26804310


