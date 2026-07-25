const moongo = require("mongoose");

const connectDatabase = async () => {
    const url = 'mongodb+srv://shaw29punam_db_user:WrsWzKiPwKVjrkjG@punam-node-cluster.1nvowha.mongodb.net/?appName=punam-node-cluster';

    await moongo.connect(url);
}


module.exports = connectDatabase