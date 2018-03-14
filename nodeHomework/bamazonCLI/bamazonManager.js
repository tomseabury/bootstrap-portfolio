var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  menu();
});


function menu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Select an option: ",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "End Search"
      ]
    })
    .then(function(answer) {
      switch (answer.menu) {
        case "View Products for Sale":
          readProducts();
          break;

        case "View Low Inventory":
          viewLow();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          newProduct();
          break;
        case "End Search":
          connection.end();
          break;
      }
    });
}

function addInventory() {

  inquirer
  .prompt([
    {
      name: "getID",
      type: "input",
      message: "Give the ID of the item you want to restock: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "addition",
      type: "input",
      message: "How much stock are you adding? ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    var query = "SELECT stock_quantity AS stock FROM products WHERE item_id=?";
    connection.query(query, answer.getID, function(err, res) {
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: parseInt(res[0].stock)+parseInt(answer.addition)
          },
          {
            item_id: answer.getID
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " product updated!\n");
          menu();
        }
      );
    });
  });
}

function newProduct() {
  inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What is the product you wish to add? "
    },
    {
      name: "department",
      type: "input",
      message: "What department does this product belong to? "
    },
    {
      name: "price",
      type: "input",
      message: "What is the price of the item? ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "stock",
      type: "input",
      message: "How much stock do you have? ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO products SET ?", 
      {
        product_name: answer.name, 
        department_name: answer.department, 
        price: parseFloat(answer.price), 
        stock_quantity: parseInt(answer.stock)
      },
      function(err, res) {
        console.log(res.affectedRows + " product inserted!\n");

      menu();
      });
  });
  
}

function readProducts() {
  connection.query("SELECT item_id AS ID, product_name AS Name, price AS Price, stock_quantity AS Stock FROM products", function(err, res) {
    if (err) throw err;
    // print out all the results from the SELECT statement
    console.log(" ID:   Price: Stock:  Product Name:            ")
    for (var i = 0; i<res.length; i++) {
      if (i === 2 || i === 8) {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "  "+price+"    "+res[i].Stock+"    "+res[i].Name);
        
      } else if (i === 5 || i === 6) {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "    "+price+"    "+res[i].Stock+"    "+res[i].Name);
      } else if (i >= 9) {
        console.log("  " + res[i].ID+ "   "+parseFloat(res[i].Price).toFixed(2)+"    "+res[i].Stock+"    "+res[i].Name);
      } else {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "   "+price+"    "+res[i].Stock+"    "+res[i].Name);
      }
    }
    console.log("_______________________________________");

  menu();
  });
}

function viewLow() {
  connection.query("SELECT item_id AS ID, product_name AS Name, stock_quantity AS Stock FROM products WHERE stock_quantity<5", function(err, res) {
    if (err) throw err;
    console.log(" ID: Stock: Product Name: ")
    for (var i = 0; i<res.length; i++) {
          console.log("  " + res[i].ID+ "      "+res[i].Stock+"   "+res[i].Name);
    }
    console.log("_______________________________________");

  menu();
  });
}
