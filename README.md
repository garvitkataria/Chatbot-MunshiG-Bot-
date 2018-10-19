# TopBot - Almost Human
  _12 hour contest- Techfesia, IIIT Sri City
  Saturday, 22 September 2018_
  
## MunshiG Bot:

> The bot is aimed for general grocery stores and it will be help the grocery store to update their stock. It will also help the customers in finding out prices of the grocery items. The main purpose is to provide grocery stores with a easy accounting and stock management system.

 [DialogFlow Demo Link](https://bot.dialogflow.com/078b9e27-8090-4cd2-8bb0-1daed2b7b53d)
 
 [Youtube Link](https://youtu.be/ldi-MGSh-Rs)

• The bot is still in development, so sometimes the queries which must be recognised may not be recognised.

### Functionalities

1. The bot helps the owner find out the out of stock items and low stock items in the store.

2. It helps find out the prices and stock count of items present in the store.

3. It can list out all the item categories and all the items present in those categories.

4. It can update the price and count of an item. It can remember the item referenced in previous chat to update the price of that item (contextual talk).

### To use the bot.

* We can start the chat with the bot by greeting it or by directly asking any question/query we have. If the bot doesn’t understand the query, it will prompt the user to repeat the query.

- Some examples:

> User: Hi.

> Bot: Greetings! How can I assist?

> User: Howdy. How do you do?

> Bot: Good day! What can I do for you today? • User: I have a query.

> Bot: What would you like to know?

* The User can ask to list out the categories and all the items present in a category.

- Some Examples:

> User: List all the categories.

> Bot: All categories are:Pet Supplies, Sweets, diet, Snack, personal hygiene, grocery,

> User: List all items

> Bot: Which category?

> User: Grocery

> Bot: Items of this category are:olive oil, Red-wine vinegar, Tomato sauce, Brown rice, Whole wheat bread,

> User: List all diet items

> Bot: Items of this category are:Cucumber, Shrimp, Tuna, Walnuts, Coconuts,

* The user can query about the price and the count of any item. - Some Examples:

> User: what is the price of cucumber?

> Bot: Price of Cucumber is 60

> User: Tell me the count of gulab jamun.

> Bot: Stock count of Gulab Jamun is 0

* The user can update the price/count of any item. - Some Examples:

> User: what is the price of cucumber?

> Bot: Price of Cucumber is 60

> User: set its price to 80.

> Bot: Price of cucumber successfully updated to 80. 

> User: what is the price of cucumber?

> Bot: Price of Cucumber is 80

> User: Increase the price of cucumber by 30.

> Bot: Price of cucumber successfully updated to 110.

> User: Set the price of cucumber to 50.

> Bot: Price of cucumber successfully updated to 50.

> User: Tell me the count of cucumber.

> Bot: Stock count of Cucumber is 0

> User: Set the count of gulab jamun to 100.

> Bot: Count of gulab jamun successfully updated to 100.

* The user can query for items which are out of stock or have low count - Some Examples:

> User: What are the items out of stock.

> Bot: The Items out of stock are: Cucumber, Walnuts, French fries

> User: Show me the items having low stock count.

> Bot: Items with low stock count are: Cucumber 0, Shrimp 10, Tuna 10, Walnuts 0, Cat Nail Trimmer 10, Pet Bowl 10, Rasgulla 10, French fries 0, Red-wine vinegar 4

#### The bot uses Webhook to communicate to the server connected to the database to get the data, so any mutation, new functionality requires handling some query parameters on the server as well.

### Team Members:

* [Anubhav Ujjawal](https://github.com/AnubhavUjjawal) (anubhav.u16@iiits.in) 

* [Anurag Gupta](https://github.com/anuragiiits) (anurag.g16@iiits.in)

* [Garvit Kataria](https://github.com/garvitkataria) (garvit.k16@iiits.in)
