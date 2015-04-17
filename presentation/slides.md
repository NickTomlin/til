## Building Achievable Applications with flux

---

## Hi
<!-- consider just doing this without a slide? -->

- Front End @ Braintree (surprise: we are hiring)
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
- Stores
- Views
- Actions
<!-- Not sure if we want to go more in depth here? -->


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

code available here:

    http://github.com/nicktomlin/flux-talk

---

## Start Simple

```shell
git checkout step-one
```

## Components



## Dispatcher

- The heart of a flux application.
- Responsible for globally publishing data


## Break it out

```shell
git checkout step-two
```


## Store workflow

---

## Testing



## Same as usual

- Whatever setup you use to test now should work fine with flux
- Focus on stores
  - stubbing is nice
