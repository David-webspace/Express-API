const express = require('express');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Hello World');
});

app.get('/add', (req, res) => {
  // 取得網址中的參數 a 和 b
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  // 計算 a 和 b 的和
  const sum = a + b;

  // 回應計算結果
  res.send(`The sum is: ${sum}`);
});

app.get('/greet', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

app.get('/calculate', (req, res) => {
  const operator = req.query.operation;
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  switch (operator) {
    case 'add':
      const sum = a + b;
      res.send(`The sum is: ${sum}`);
      break;
    case 'subtract':
      const difference = a - b;
      res.send(`The difference is: ${difference}`);
      break;
    case 'multiply':
      const product = a * b;
      res.send(`The product is: ${product}`);
      break;
    case 'divide':
      if (b === 0) {
        res.send('Error: Division by zero is not allowed.');
        return;
      }else{
        const quotient = a / b;
        res.send(`The quotient is: ${quotient}`);
      }
      break;
    default:
      res.send('Invalid operation');
  }
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
