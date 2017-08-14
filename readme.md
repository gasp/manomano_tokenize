tokenize counts word occurences

# install

`npm i wordcount -S`


# simple usage:

```
const { tokenize } = require('tokenize');
const words = tokenize('This is my world, a wonderful world');
```

words is a Map object such as
```
Map {
  'this' => 1,
  'is' => 1,
  'my' => 1,
  'world' => 2,
  'a' => 0,
  'wonderful' => 1 }
```

# limit word size

limit all words 2 characters and less
```
const { tokenize } = require('tokenize');
const words = tokenize('This is a wonderful world', 2);
```

```
Map {
  'this' => 1,
  'wonderful' => 1,
  'world' => 1 }
```
