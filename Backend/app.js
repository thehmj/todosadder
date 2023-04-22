const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./connection');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const Posts = require('./module/postschema');

const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello programmer');
})



app.post('/api/addtolist',  async (req, res) => {
    try {
        const { item } = req.body;
       
        if (!item) {
            return res.status(400).send("Cannot be empty");
        }
        const list = await Posts.find();
        const order = list.length + 1;
        const Createpost = new Posts({
          item: item,
          order: order
        })

        const a = await Createpost.save();
        res.status(200).send("Successfully posted");

    } catch (error) {

        res.status(500).send("error" + error);
    }
})



app.get('/api/getlist',  async (req, res) => {
    try {
        const getlist = await Posts.find();
        res.status(200).json({ getlist});

    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/api/updatecheck',async(req,res)=>{
 try {
    const {id ,value} =req.body;
    // console.log(!value);
    if (!id ) {
        return res.status(400).send("Cannot be empty");
    }
    if (value==true) {
        await Posts.updateOne({_id:id},{
            check: false
        })
    } else {

        await Posts.updateOne({_id:id},{
            check: true
        })
        
    }
  
    res.status(200).send("Successfully changed");
    
 } catch (error) {
    res.status(500).send("error" + error);
    
 }

})

app.post('/api/updatelist',  async (req, res) => {
    try {
        const { id1,id2, order1,order2 } = req.body;
       
        if (!id1 || !id2 || !order1 || !order2) {
            return res.status(400).send("Cannot be empty");
        }
        // console.log(id1,id2,order1,order2);
        const change1 = await Posts.updateOne({_id: id1},{
            order:order1
        });
        const change2 = await Posts.updateOne({_id: id2},{
            order:order2
        });
        res.status(200).send("Successfully posted");

    } catch (error) {

        res.status(500).send("error" + error);
    }
})

app.listen(port, () => {
    console.log('server is running....');
})