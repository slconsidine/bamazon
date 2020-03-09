var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});


function start() {
    connection.query("SELECT * FROM products", function(err,results) {
        if (err) throw err;
        for (var i=0; i < results.length; i++) {
            console.log("ID number: " + results[i].id);
            console.log("Product: " + results[i].product_name);
            console.log("Price: $" + results[i].price);
            console.log("--------------------------------");
        };
    });
    inquirer.prompt([
        {
            name: "product_id",
            type: "number",
            message: "What is the ID number of the product you would like to purchase?"
        },
        {
            name: "total_products",
            type: "number", 
            message: "How many would you like to purchase?"
        }
    ]).then(function(answer) {
        var chosenItem;
        connection.query("SELECT * FROM products", function(err,results) {
            if (err) throw err;
            chosenItem = (results[(answer.product_id - 1)].product_name);
            console.log("You would like to purchase " + answer.total_products + " " + chosenItem + " products.");
            for (var i=0; i < results.length; i++) {
                if (results[i].id === answer.product_id) {
                    chosenItem = results[i];
                    if (answer.total_products <= chosenItem.stock_quantity) {
                        console.log("You can buy that! The cost will be $" + (chosenItem.price * answer.total_products + "."));
                        connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenItem.stock_quantity - answer.total_products)
                            },
                            {
                                id: answer.product_id
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " products updated!\n");
                        }
                        );

                    } else {
                        console.log("You cannot buy that. Insufficient quantity.")
                    }
                    connection.end();
                }
            }
        });
    })
};
