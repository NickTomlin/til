Building attainable applications with Flux

---

[FLUX LOGO HERE]

# Summary

Facebook's Flux architecture is designed to make managing complex and dynamic views simple and maintainable. This talk focuses on how Flux provides a solid base for creating and scaling front-end applications, regardless of framework or size. We will build a small application and gradually scale it out, showing how Flux helps encourage sustainable decisions each step of the way.

# Outline

1. Hello
 - FED at BT
 - interested in architecture
 - repo/slide links!
 - there will be time to ask questions afterwards, but feel free to interject if something is pressing
2. Flux
  a. what it is
    - Facebook yadayda
    - Simplify data (one way flow diagram)
    - a philosophy, not a framework
  c. open ended
    - Facebook's interpretation of flux is available `flux` npm module (`npm i flux`)
    - none of this is set in stone. Everyone interprets things a little differently.
    - there are plenty of libraries out their `fluxor` yahoo's `flux examples` TODO that provide "off the shelf" flux patterns.
      - basic flux, tuxedojs, refluxjs, marytjs, fluxxor, fynx, mcfly, delorean, and alt.
    - we are going to be building on "vanilla" flux today, but I'd suggest looking at the other implementations
  d. not a panecea
    - Flux is
    - Flux has problems (which we will get to)
  e. A note about rendering
    - Flux is designed for applications that can easily re-render when data changes. Thankfully this means most major frameworks out there today. Backbone can also be used with a binding library or React as a view layer.
    - Angular will benefit from [track-by](http://www.codelord.net/2014/04/15/improving-ng-repeat-performance-with-track-by/)
<!-- it almost feels like this should be included after our intial application. Otherwise there's too much of a gap and it gets too abstract -->
  b. components
    - Dispatcher
      - the core of the flux model
      - a global publisher of data
    - Stores
      - stores subscribe to the dispatcher
      - stores can depend on other stores
    - Views
      - views subscribe to the stores, and ask the store for updated data when they have been notified it is available
    - Actions
      - actions are how data enters the flux "flow"
      - they can be propogated by the client or server
      - a simple, but powerful, way to make changes to your application

3. Our example: TIL
  0. intro: Angular
    - popular/ubiquitous
    - solid core services (but also heavy)
    - not React
      - I <3 React though :)
  1. start simple: (branch 0)
    - single file
    - quick feedback loop for adding a TIL item
    - basic origanization:
      - non abstracted store
      - dispatcher
      - actions
  2. reorganize (branch 1) (maybe have this later on?)
    - break out into multiple files
    - go through the loop again
  3. Add another store (branch 2)
    - user store
  4. Add the server
  5. Let's be optimistic

5. Q/A

## notes
- I don't want to add too much work for myself in backporting stuff because it will be unmaintainable...
- *err* I'm not sure how to do the module thing. Should dispatcher be handled by angular? also base store...

## Notes from talk with Kyle (review, merge and delete)
- CJS is a ++ (how we do at BT)
- Flux value is not necessarily "up front" since it takes more time to get "set up" but it is for scaling!
- Try to provide error cases for optimistic handling
- how to prime a store? e.g. dealing with the server etc.



# Example Application

Things that shine are uni directional <=> in that data core to the views is coming in and out all the time.

- testing for prs
  - would require a lot of backend work with github webhooks to enable functionality
- slack app
  - sort of simple, but also very overdone...
- dashboard for ...
  - application health (aggregate New Relic with some other services / mixpanel?)
- craigslist?
- stock ticker?
- TIL
  - today I learned with communal updates, comments, likes etc...

# Tough Stuff
- animation (app level states)
- "assocations"
  - is the "mongo" way of doing this actually sustainable?
- preloading data
- sub-components with data needs



# Linkz

[should flux stores or actions, or both, touch external services?](http://stackoverflow.com/a/25648726/1048479)
  - this is nice because it explores both routes and showcases some the wins in simplifying the lgoic around data
[Where should ajax request be made in Flux app?](http://stackoverflow.com/a/26635597/1048479)
  - I am doing this wrong methinks
[general resource awesomeness from fisherwebdev](http://stackoverflow.com/a/27267083/1048479)
[multiple flux instances](http://stackoverflow.com/questions/26597311/flux-multiple-store-instances)
[nuclear mail flux example](https://github.com/ianobermiller/nuclearmail/blob/master/getWebpackConfig.js)

[cqrs (an idea that flux is built on/inspired by)](http://martinfowler.com/bliki/CQRS.html)
  - more detailed [overview](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)

## CJS and angular

https://blog.codecentric.de/en/2014/08/angularjs-browserify/#integrating

## Tutorials
   - https://egghead.io/series/react-flux-architecture
