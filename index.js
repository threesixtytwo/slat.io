const express = require('express')

const app = express()
const port = 3000

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'slackcent'
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Hello Worlds!'))

app.get('/catcher', function (req, res) {
    
    //get data from request
    
    res.send(req + 'Hello World!')
    //format data from request

    //U8GNT2ME0 = me ?
    //C5UABG52B = kudos

})
app.post('/slackresponse', function (req, res) {
  console.log(req.body.event.item)
  if(req.body.challenge)  {
    res.send('done '+ req.body.challenge +'')
  }else{
    if(req.body.event.item)  {
      var itemType = req.body.event.item.type;
      var itemChannel = req.body.event.item.channel;
      var itemTs = req.body.event.item.ts;
    }else {
      var itemType = '';
      var itemChannel = '';
      var itemTs = '';
    }
  
    insert = "INSERT INTO messages (token,team_id,api_app_id,event_client_msg_id,event_type,event_text,event_user,event_ts,event_channel,event_channel_type,subtype,type,event_id,event_time,authed_users,event_reaction,event_item_user, event_item_type, event_item_channel, event_item_ts) VALUES ('"+req.body.token+"','"+req.body.team_id+"','"+req.body.api_app_id+"','"+req.body.event.client_msg_id+"','"+req.body.event.type+"','"+req.body.event.text+"','"+req.body.event.user+"','"+req.body.event.ts+"','"+req.body.event.channel+"','"+req.body.event.channel_type+"','"+req.body.event.subtype+"','"+req.body.type+"','"+req.body.event_id+"','"+req.body.event_time+"','"+req.body.authed_users+"','"+req.body.event.reaction+"','"+req.body.event.item_user+"','"+itemType+"','"+itemChannel+"','"+itemTs+"')"           
    connection.query(insert, function (err, rows, fields) {
      if (err) throw err

      console.log(rows[0])
    })
   
    console.log(insert);
  }
})

app.listen(port, () => console.log(`slackcent listening on port ${port}!`))


