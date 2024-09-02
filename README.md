This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install the dependencies
Note: This application is using `yarn` as a package manager install that using `npm i -g yarn`

```bash
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Create a build

```bash
yarn build
```

To run test use below command

```bash
# for unit test use
yarn test

# for e2e test
yarn cypress:open
```

## Design Choices

Framework used: `NextJS`

The reason for using `NextJS` for this project is that it supports both frontend and backend, along with that it also comes with a well defined project structure and takes cares of many of stuff for us like Routing and SSR.

Data Fetching: `React Query`

The Reason for using `React Query` is it very good for managing server state in react. It takes care of data fetching, caching and it also re-fetches the data when needed saving redundant requests.

State Management: `React Context`
Here's I'm using `React Context` for state management as the application is small and state is not very complex.

Optimization:

For Optimization i'm relying on `React Query` to cache the API data at application level and Browser for Caching Images and Videos

One optimization that can be done but i've not implemented is using windowing when showing user avatar as the number of user can easily react 200 or even 1000, showing all those users is not a good idea. With windowing we'll only show users that are visible to the user and few on left and right so user has view when scrolling left of right.
