# Universal TodoMVC Example

## Up and Running

Install the dependencies found in the `package.json`, compile the TypeScript to JavaScript, run the server:

```sh
npm install
npm run build
npm start
```

Then, visit `localhost:3000` in your browser.

## What's a universal application?

It's an isomorphic application. Okay, that may need more explanation. Remember that mantra that Java promised of write once, run anywhere. Well, think of that for the web. Code that is environment agnostic and can run on the server or browser.

To do that, we compose our application of libraries that free us from the shackles of specific environmental APIs. React is one of the most important aspects to this idea as you can write view related code without ever referencing any DOM APIs. We then add other libraries for "modeling" that are also universal by nature.

Here's the full tech-stack that we've chosen to execute this idea:

- **TypeScript**: used for transpiling (JSX and ES6) and module bundling for universal module design
- **React**: the V in MVC
- **Redux**: the M in MVC, though, we are abandoning the old MVC philosophy for a more "Flux'ish" approach
- **Rx.js**: This is an powerful async library that uses Reactive Functional Programming at its core
- **Express**: Our lightweight, un-opinionated, server framework
- **Page.js**: our client side routing technology
- **PouchDB**: for data storage and future "offline" capabilities
- **Superagent**: Universal HTTP library

#### A bit on the top 4:

> TypeScript is a language for application-scale JavaScript development. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open Source.

> _[TypeScript - typescriptlang.org](http://typescriptlang.org)_

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

> Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

> _[Redux - http://redux.js.org/](http://redux.js.org/)_

>RxJS (Reactive Extensions Library for JavaScript) is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.

> _[RxJS - https://rxjs.dev/](https://rxjs.dev/)_

## Learning TypeScript

The [TypeScript website](http://typescriptlang.org) is a great resource for getting started.

Here are some links you may find helpful:

- [Tutorial](http://www.typescriptlang.org/Tutorial)
- [Code Playground](http://www.typescriptlang.org/Playground)
- [Documentation](https://github.com/Microsoft/TypeScript/wiki)
- [Applications built with TypeScript](http://www.typescriptlang.org/Samples)
- [Blog](http://blogs.msdn.com/b/typescript)
- [Source Code](https://github.com/Microsoft/TypeScript)

Articles and guides from the community:

- [Thoughts on TypeScript](http://www.nczonline.net/blog/2012/10/04/thoughts-on-typescript)
- [ScreenCast - Why I Like TypeScript](http://www.leebrimelow.com/why-i-like-typescripts)

Get help from other TypeScript users:

- [TypeScript on StackOverflow](http://stackoverflow.com/questions/tagged/typescript)
- [Forums](https://github.com/Microsoft/TypeScript/issues)
- [TypeScript on Twitter](http://twitter.com/typescriptlang)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._

## Learning Express

Express has been around for a very long time and is not new, so documentation is ubiquitous. But, if you need a reference, the framework's main site is the place to go: http://expressjs.com/.

## Learning React

The [React getting started documentation](http://facebook.github.io/react/docs/getting-started.html) is a great way to get started.

Here are some links you may find helpful:

- [Documentation](http://facebook.github.io/react/docs/getting-started.html)
- [API Reference](http://facebook.github.io/react/docs/reference.html)
- [Blog](http://facebook.github.io/react/blog/)
- [React on GitHub](https://github.com/facebook/react)
- [Support](http://facebook.github.io/react/support.html)

Articles and guides from the community:

- [How is Facebook's React JavaScript library](http://www.quora.com/React-JS-Library/How-is-Facebooks-React-JavaScript-library)
- [React: Under the hood](http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood)

Get help from other React users:

* [React on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
* [Discussion Forum](https://discuss.reactjs.org/)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._

## Learning Redux

Redux has some great documentation at their main site here: http://redux.js.org/.

Here are some links you may find helpful:

- [Egghead.io video tutorials](https://egghead.io/series/getting-started-with-redux)
- [Original TodoMVC from which this was made](https://github.com/reactjs/redux/tree/master/examples/todomvc)

## Learning RxJS (RFP)

There's a lot of information out there about Reactive Functional Programming (RFP), much of which can get really academic. What I like to do when teaching RFP is start with something almost any JS dev is going to be familiar with using, and those are arrays and array methods.

Here's are some links that discuss the foundations:

- [2 minute introduction to Rx](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877)
- [Asynchronous Programming: The End of The Loop](https://egghead.io/courses/asynchronous-programming-the-end-of-the-loop)
- [RxJS Beyond the Basics: Creating Observables from scratch](https://egghead.io/courses/rxjs-beyond-the-basics-creating-observables-from-scratch)
- [Save time avoiding common mistakes using RxJS](https://egghead.io/courses/save-time-avoiding-common-mistakes-using-rxjs)

Here is the more academic stuff:

- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

There's even a whole online "manual": [Learn RxJS](https://www.learnrxjs.io/)

## How it works

The large majority of code is universal, and the same code that is executed on the server is bundled up and deployed to the browser. The exceptions to this are `server.ts` versus `client.tsx` and the few appropriately named `client` and `server` files throughout the project. This helps us avoid the need, like in most applications, to duplicate code, or pick an environment that most of the application runs within.

One might think, just build an SPA that runs in the browser! That can be done, but many times it's not optimal if you care about mobile users (especially in developing nations), SEO, or fast deep-linking. With a truly universal application, you can have the benefits of an SPA without the consequences.

## TODO

- [ ] Add hot module reloading
- [ ] Add completion and deletion feature of todos as w/o JS feature
- [x] Add better TypeScript definitions and typings
- [x] Add hooks (`husky`) for Git integration and task running
- [x] Add unit and integration testing (`Jest`)
- [x] Add `react-axe` with accessibility linting and testing to project
- [x] Implement Prettier into ESLint
- [x] Add redux-actions to clean up Redux boilerplate
- [x] Add RxJS to normalize async related work
- [x] Modernize all libraries, frameworks and tooling
- [x] Switch React components to the newer, functional style (rather than class based)
