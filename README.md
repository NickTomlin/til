Building attainable applications with Flux

---

[FLUX LOGO HERE]

# Summary

Facebook's Flux architecture is designed to make managing complex and dynamic views simple and maintainable. This talk focuses on how Flux provides a solid base for creating and scaling front-end applications, regardless of framework or size. We will build a small application and gradually scale it out, showing how Flux helps encourage sustainable decisions each step of the way.

# Outline

1. Hello
 - FED at BT
 - interested in architecture
2. Flux
  a. what it is
    - Facebook yadayda
    - Simplify data
    - a philosophy, not a framework
  b. components
    - Stores
    - Dispatcher
    - Actions
    - these are all availble in the `flux` npm module
  c. open ended
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

3. Our example: TIL
  0. Angular
    - popular/ubiquitous
    - not React
      - I <3 React though :)
  1. start simple: (branch 0)
    - quick feedback loop for adding a TIL item
    - basic origanization:
      - non abstracted store
      - dispatcher
      - actions
  2. reorganize (branch 1) (maybe have this later on?)
    - break store into a base store
  3. add complexity (branch 2)
    - add comments?
  3. add state change (branch 3)

## notes
- I don't want to add too much work for myself in backporting stuff because it will be unmaintainable...
- *err* I'm not sure how to do the module thing. Should dispatcher be handled by angular? also base store...



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

## Tutorials
   - https://egghead.io/series/react-flux-architecture
