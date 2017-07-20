## A workbench for testing Cognito Federated Idenities

The thinking as of this writing:
  - Mainting your own user database and all the interactions (lost password, email confirmation, etc.) is a huge pain
  - AWS is currently in beta with a service that encapsulates 100% of that (including UI)
  - BUT.... that module is not ready and won't be stable until (at least) early 2018 by my guess
  - So for now, we just allow log ins from social media sites

## Initial version

All you can do is log in and log out.

