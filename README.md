Building attainable applications with Flux

---

# Summary

Facebook's Flux architecture is designed to make managing complex and dynamic views simple and maintainable. This talk focuses on how Flux provides a solid base for creating and scaling front-end applications, regardless of framework or size. We will build a small application and gradually scale it out, showing how Flux helps encourage sustainable decisions each step of the way.

# Outline

1. Hello
 - FED at BT
 - interested in architecture
2. Flux
 - Facebook yadayda
 - Stores
 - Dispatcher
 - Actions

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
