## Building Achievable Applications with flux

<!-- add slides url here for early peeps?-->

---

## Hi
<!-- consider just doing this without a slide? -->

- Front End @ Braintree
- JS all the time
- I like writing poetry

<!-- questions afterwards-->

---

# What is Flux?



## The core

```
actions >>> data >>> view >>> actions
|                                  |
|           ONE WAY DATA           |
|------------<<<<---<<<<-----------|
```

- Created by Facebook
- Simplify the flow of data
- A philsophy, not a framework


---

##  Components

- Dispatcher
- Store
- View
- Action



## Dispatcher

- the heart of a flux application
- publishes all data
- manages subscribing stores



## Store

- "Read only" source of all client-side data
- interprets dispatched payload
- notifies subscribers



## Action

- the "glue" of the data flow
- triggers updates
- from client and server


## Repeat...

---

## Example: TIL



## Setup:

Let's use Angular.

- Popular
- Fast
- Solid services
- (not React ^^)



## Assumptions

- We'll user browserify and commonjs
  - not familiar? don't worry.
- We'll add a simple express + mongo backend
- We are not building bulletproof production code



## Code

[`https://github.com/nicktomlin/flux-talk`](http://github.com/nicktomlin/flux-talk)

---

## Start Simple

`git checkout step-one`

---

## Modularize!

`git checkout step-two`



## Store workflow


---

## Adding an additional store

`git checkout step-three`


---

## Adding a backend

`git checkout step-four`



## Fluxibility

Flux is extremely flexible in this regard.

- frameworks that provide services (angular) are very nice
- but... it's also very easy to build your own services
- go with the best fit for you

---

## Being optimistic

`git checkout -b step-four`




This is where the added structure of flux allows us to do some very interesting things.



## Tweaking our action

Using our client action as catalyst we can dispatch client side, and asynchronously update the server.

This allows us to give immediate feedback for our users while providing us a sane way to handle. Obviously some mission critical things may need a more synchronous flow.

---

## Testing



## Same as usual

- Whatever setup you use to test now should work fine with flux
- Focus on stores
  - stubbing is nice

---

## Not so fun stuff :(



- Large Mental footprint initially
- Boilerplate
- BYO everything
- Things are still in flux (yuk yuk)

---

## Resources

- [flux documentation](https://facebook.github.io/flux/docs/overview.html#content)
- [awesome react flux tuotrials](https://github.com/enaqx/awesome-react#flux-tutorials)
- [building angular apps with flux](http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture)

---

## Thanks

* twitter: @itsnicktomlin
* gh: github.com/nicktomlin
