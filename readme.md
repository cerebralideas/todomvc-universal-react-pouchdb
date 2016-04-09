# Universal TodoMVC Example

## Up and Running

Install the dependencies found in the `package.json`, compile the TypeScript to JavaScript, run the server:

```sh
npm install
npm run build
node server.js
```

Then, visit `localhost:3000` in your browser.

## What's a universal application?

It's an isomorphic application. Okay, that may need more explanation. Remember that mantra that Java promised of write once, run anywhere. Well, think of that for the web. Code that is environment agnostic and can run on the server or browser.

To do that, we compose our application of libraries that free us from the shackles of specific environmental APIs. React is one of the most important aspects to this idea as you can write view related code without ever referencing any DOM APIs. We then add other libraries for "modeling" that are also universal by nature.

Here's the full tech-stack that we've chosen to execute this idea:

- **TypeScript**: used for transpiling (JSX and ES6) and module bundling for universal module design
- **React**: the V in MVC
- **Redux**: the M in MVC, though, we are abandoning the old MVC philosophy for a more "Flux'ish" approach
- **Express**: Our lightweight, un-opinionated, server framework
- **Page.js**: our client side routing technology [1]
- **PouchDB**: for data storage and future "offline" capabilities
- **Superagent**: Universal HTTP library
- **Babel**: for some polyfilling (TypeScript does most of the transpiling)

#### A bit on the top 3:

> TypeScript is a language for application-scale JavaScript development. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open Source.

> _[TypeScript - typescriptlang.org](http://typescriptlang.org)_

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

> Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

> _[Redux - http://redux.js.org/](http://redux.js.org/)_

## Learning TypeScript

The [TypeScript website](http://typescriptlang.org) is a great resource for getting started.

Here are some links you may find helpful:

* [Tutorial](http://www.typescriptlang.org/Tutorial)
* [Code Playground](http://www.typescriptlang.org/Playground)
* [Documentation](https://github.com/Microsoft/TypeScript/wiki)
* [Applications built with TypeScript](http://www.typescriptlang.org/Samples)
* [Blog](http://blogs.msdn.com/b/typescript)
* [Source Code](https://github.com/Microsoft/TypeScript)

Articles and guides from the community:

* [Thoughts on TypeScript](http://www.nczonline.net/blog/2012/10/04/thoughts-on-typescript)
* [ScreenCast - Why I Like TypeScript](http://www.leebrimelow.com/why-i-like-typescripts)

Get help from other TypeScript users:

* [TypeScript on StackOverflow](http://stackoverflow.com/questions/tagged/typescript)
* [Forums](https://github.com/Microsoft/TypeScript/issues)
* [TypeScript on Twitter](http://twitter.com/typescriptlang)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._

## Learning Express

Express has been around for a very long time and is not new, so documentation is ubiquitous. But, if you need a reference, the framework's main site is the place to go: http://expressjs.com/.

## Learning React

The [React getting started documentation](http://facebook.github.io/react/docs/getting-started.html) is a great way to get started.

Here are some links you may find helpful:

* [Documentation](http://facebook.github.io/react/docs/getting-started.html)
* [API Reference](http://facebook.github.io/react/docs/reference.html)
* [Blog](http://facebook.github.io/react/blog/)
* [React on GitHub](https://github.com/facebook/react)
* [Support](http://facebook.github.io/react/support.html)

Articles and guides from the community:

* [How is Facebook's React JavaScript library](http://www.quora.com/React-JS-Library/How-is-Facebooks-React-JavaScript-library)
* [React: Under the hood](http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood)

Get help from other React users:

* [React on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
* [Discussion Forum](https://discuss.reactjs.org/)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._

## Learning Redux

Redux has some great documentation at their main site here: http://redux.js.org/.

Here are some links you may find helpful:

* [Egghead.io video tutorials](https://egghead.io/series/getting-started-with-redux)
* [Original TodoMVC from which this was made](https://github.com/reactjs/redux/tree/master/examples/todomvc)

## How it works

The large majority of code is universal, and the same code that is executed on the server is bundled up and deployed to the browser. The exceptions to this are server.ts versus client.tsx and the appropriately named client and server files in the `intiators` directory. This helps us avoid the need, like in most applications, to duplicate code, or pick an environment that most of the application runs within.

One might think, just build an SPA that runs in the browser! That can be done, but many times its not optimal if you care about users mobile users or SEO or fast deep-linking. With a truly universal application, you can the benefits of an SPA without the consequences. 

## TODO

- [ ] Add completion feature of todos to server for persistence
- [ ] Add deletion feature of todos to server for persistence
- [ ] Add better TypeScript definitions and typings
- [ ] Switch React components to the newer, functional style (rather than class based)
