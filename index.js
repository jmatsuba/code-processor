const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const vm = require('./lib/vm');

app.set('port', process.env.PORT || 5000);

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan('combined'));
app.use(bodyParser.json());

app.put('/process', async (req, res) => {
  const { num, code } = req.body;
  const codeResult = await vm.process(num, code);
  res.json(codeResult);
});

app.listen(app.get('port'), () => {
  console.log('listening on port', app.get('port'));
});
