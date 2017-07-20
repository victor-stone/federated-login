## A workbench for testing Cognito Federated Idenities

The thinking as of this writing:
  - Mainting your own user database and all the interactions (lost password, email confirmation, etc.) is a huge pain
  - AWS is currently in beta with a service that encapsulates 100% of that (including UI)
  - BUT.... that module is not ready and won't be stable until (at least) early 2018 by my guess
  - So for now, we just allow log ins from social media sites

SO - there is NO Cognito User Pools used here. AT ALL. This is strictly for apps that are totally cool with social media (and other 3rd party identity providers) being the way to log in.

## Note

As of this writing the client IDs of my apps (aws, google and facebook) are all hard wired into this code. I'll pull them out and put them in config files but for now please don't hammer on my apps.

### SDK

The SDK file in public/js was created using the [SDK Builder](https://sdk.amazonaws.com/builder/js/) tool. It has a tiny subset of the full aws-sdk. That will get added to as the functionality expands

## Releases

I'm experimenting with using tags (aka releases) as a tutorial mechanism. Each 'release' will add a little more functionality so you can easily isolate the functionality. See the current releases [here](https://github.com/victor-stone/federated-login/releases)

