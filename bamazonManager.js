var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql",
    database: "bamazon_db"
  });
  

function viewProducts() {
    connection.query("SELECT * FROM products", function(err,results) {
        if (err) throw err;
        console.log("Here is a list of all products: ")
        for (var i=0; i < results.length; i++) {
            console.log("ID number: " + results[i].id);
            console.log("Product: " + results[i].product_name);
            console.log("Department: " + results[i].department_name);
            console.log("Price: $" + results[i].price);
            console.log("Stock Quantity: " + results[i].stock_quantity);
            console.log("--------------------------------");
        };
        connection.end();
    });
};

function viewLow() {
    connection.query("SELECT * FROM products", function(err,results) {
        if (err) throw err;
        for (var i=0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log(results[i].product_name + " products are low.");
                console.log("ID number: " + results[i].id);
                console.log("Product: " + results[i].product_name);
                console.log("Department: " + results[i].department_name);
                console.log("Price: $" + results[i].price);
                console.log("Stock Quantity: " + results[i].stock_quantity);
                console.log("--------------------------------");
            } else {
                console.log(results[i].product_name + " products are well stocked.");
            }
        };
        connection.end();
    });
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "restock",
                type: "list",
                message: "Select the item you would like to add more of.",
                choices: function() {
                    var choiceArray = [];
                    for (var i=0; i<results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                name: "quantity",
                type: "number",
                message: "What is the new total amount of items?"
            }
        ]).then(function(answer) {
            connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: answer.quantity
                },
                {
                    product_name: answer.restock
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!");
            })
            connection.end();
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            name: "prodName",
            type: "input",
            message: "Type the product name.",
        },
        {
            name: "prodDepartment",
            type: "list",
            message: "Select the product's department.",
            choices: [
                "Electronics", 
                "Clothing",
                "Personal Care",
                "Pets",
                "Grocery",
                "Home Essentials",
                "Books/Toys",
                "Miscellaneous"
            ]
        },
        {
            name: "prodPrice",
            type: "number",
            message: "What is the price for one item?"
        },
        {
            name: "prodStock",
            type: "number",
            message: "How much of this item is stocked?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: answer.prodName, 
            department_name: answer.prodDepartment, 
            price: answer.prodPrice,
            stock_quantity: answer.prodStock
        },
        function(err, res) {
            if (err) throw err;
            console.log(answer.prodStock + " " + answer.prodName + " product(s) has/have been added to the " + answer.prodDepartment + " department at $" + answer.prodPrice + " per item.");
        });
        connection.end();
    });
}

inquirer.prompt([
    {
        name: "menu",
        type: "list",
        message: "Select an action.",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }
]).then(function(answer) {
    console.log(answer);
    if (answer.menu === "View Products for Sale") {
        viewProducts();
    } else if (answer.menu === "View Low Inventory") {
        viewLow();
    } else if (answer.menu === "Add to Inventory") {
        addInventory();
    } else if (answer.menu === "Add New Product") {
        addProduct();
    } else {
        console.log("Command not recognized.");
    }
});

