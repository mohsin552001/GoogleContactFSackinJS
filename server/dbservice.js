let mysql = require('mysql');
let dotenv = require('dotenv');
let instance = null;
dotenv.config();


const connection = mysql.createConnection({
    user: process.env.USERNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    debug: false
})

connection.connect((err) => {
    if (err) throw err
    console.log('backend has been connected')
})


class DBService {
    static getdbservicinstance() {
        return instance ? instance : new DBService();
    }

    async getAlldata() {
        try {
            let response = await new Promise((resolve, reject) => {
                const query = "select * from crud_app"
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results);
                })
            })
            // console.log(response)
            return response;
        } catch (err) {
            console.log(err)
        }
    }


    async insertNewName(Name, email, phoneNumber, jobTitleAndComp) {
        try {

            let insertId = await new Promise((resolve, reject) => {
                const query = "insert into  crud_app (name,email,phoneNumber,jobTitleAndComp) values (?,?,?,?)"
                connection.query(query, [Name, email, phoneNumber, jobTitleAndComp], (err, result) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(result.insertId);
                    }



                })
            })
            //  console.log(insertId)
            // // return response;

            return {
                id: insertId,
                Name: Name,


                email: email,
                phoneNumber: phoneNumber,
                jobTitleAndComp: jobTitleAndComp
            };

        } catch (error) {
            console.log(error)
        }
    }


    async deleteRowbyId(id) {
        try {
            id = parseInt(id, 10)
            let response = await new Promise((resolve, reject) => {
                const query = "delete from crud_app where id =?;"
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result.affectedRows);


                })
            })
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err)
            return false
        }

    }


    async updateNameById(id, Name, email, phoneNumber, jobTitleAndComp) {

        try {
            id = parseInt(id)
            let response = await new Promise((resolve, reject) => {
                const query = "update crud_app set Name =?,email=?,phoneNumber=?,jobTitleAndComp=?  where id=?";
                connection.query(query, [Name,  email, phoneNumber, jobTitleAndComp, id], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(new Error(err.message));

                    }
                    else {

                        resolve(result.affectedRows)

                    }

                })
            })



            return response === 1 ? true : false;
        } catch (err) {
            console.log(err)
            return false
        }

    }

    async searchByName(Name) {
        try {
            console.log('name', Name);
            let response = await new Promise((resolve, reject) => {
                const query = "select * from crud_app where Name=?;"
                connection.query(query,[Name], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results);
                })
            })
     
            return response;
        } catch (err) {
            console.log(err)
        }
    }
}




//start of divs section 



class DBserviceDivs {
    static secondDBServiceinstance() {
        return instance ? instance : new DBserviceDivs()
    }

    async getwholedata() {
        try {
            let response = await new Promise((resolve, reject) => {
                let query = "select * from creatdivs";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                      console.log(results);

                    resolve(results);
                })
            })
            return response
        } catch (err) {
            console.log(err)
        }
    }



    async insertDivName(name) {
        try {
   
            console.log(name)
            let insertId = await new Promise((resolve, reject) => {
                let query = "insert into creatdivs (name) values (?);";

                connection.query(query, [name], (err, result) => {
                    if (err) { reject(new Error(err.message)) }
                    else { resolve(result.insertId) }

                })
            })

            //   return  insertId;

            return {
                 id: insertId,
                name: name,
               
            }
        } catch (err) {
            console.log(err)
        }
    }


    async deleteRowByIdDivs(id) {
        id = parseInt(id)
        try {


            let response = await new Promise((resolve, reject) => {
                let query = "delete from creatdivs where id=?";

                connection.query(query, [id], (err, result) => {
                    if (err) { reject(new Error(err.message)) }
                    else { resolve(result.affectedRows) }

                })
            })

         return response ===1 ? true :false;


        } catch (err) {
            console.log(err)
            return false
        }
    }




    async   updataNameByIdDivs(id,name){
        {console.log(id)
            id = parseInt(id)
            try {
    
    
                let response = await new Promise((resolve, reject) => {
                    let query = "update creatdivs set Name=? where id=?";
    
                    connection.query(query, [name,id], (err, result) => {
                        if (err) { reject(new Error(err.message)) }
                        else { resolve(result.affectedRows) }
    
                    })
                })
    
             return response ===1 ? true :false;
    
    console.log(response)
            } catch (err) {
                console.log(err)
                 return false
            }
        }




    }
}











module.exports = {DBService, DBserviceDivs}
