const knex = require('knex')({          // require knex here .
    client: 'mysql',                    // name of database 
    connection: {
      host: 'localhost',               // where to use 
      user: "root",                    // path 
      password: "Pradeep@1234",        // database password 
      database: "knex_crud"            // name of database in terminal 
    }
  })
// user_data is a table  name .
knex.schema.createTable('students', t => {
    t.increments().primary();      // column name (id) 
    t.string('name');              // column name (name) 
    t.string('email').unique();    // column name (email)
    t.string('password');          // column name (possword)
    t.timestamp('created_at').defaultTo(knex.fn.now());
})
.then(()=>{
  // table created after show massage.
    console.log("table created successfully")
})
.catch(err=>{
    console.log(err.message)
})

module.exports = knex  // export database.js file from here to index.js