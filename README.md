# Evergist

<a href="https://assembly.com/evergist/bounties"><img src="https://asm-badger.herokuapp.com/evergist/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## ev*rnote but with version control

This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/evergist](https://assembly.com/evergist).

### How Assembly Works

Assembly products are like open-source and made with contributions from the community. Assembly handles the boring stuff like hosting, support, financing, legal, etc. Once the product launches we collect the revenue and split the profits amongst the contributors.

Visit [https://assembly.com](https://assembly.com) to learn more.

### Development

#### build
1. compile
```sh
npm install
gulp build
```
2. watch
```sh
gulp watch
```
#### task board
I'm using github issues and gira plugin to manage tasks, so

1. install [gira](https://github.com/jcouyang/gira)
2. open https://github.com/jcouyang/evergist/issues
3. then you should see some tasks like this ![](https://www.evernote.com/shard/s23/sh/1dff5525-3a5d-4ea7-bee9-9f8e7572e679/4753f0a9b7f75fbf4ea2c6e574623c69/deep/0/Issues---jcouyang-evergist.png)

#### UI/View
- [material-ui](http://material-ui.com)
- [foundation grid](http://foundation.zurb.com/docs/components/grid.html)
- [React.js](http://facebook.github.io)

#### Model
- [Immutabel data structure](http://facebook.github.io)
- [restful client](https://github.com/cujojs/rest)

#### Test
[jest](http://facebook.github.io/jest/)

```
npm test
```

#### CI
[![](https://travis-ci.org/asm-products/evergist.svg)](https://travis-ci.org/asm-products/evergist)
