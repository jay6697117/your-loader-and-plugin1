import mytest from './mytest.txt'

function fn() {
  console.log('this is a message')
  console.log(`mytest:`, mytest)
  return '1234'
}

fn()
