# Event3 - ETHOnline 2023 Submission

## Submission link
https://ethglobal.com/showcase/event3-nun3f

## YouTube Video
https://www.youtube.com/watch?v=mAICrO7deUU

## Setup Instructions

1. **Environment Variables**:

   - `SPONSOR`: Sponsor wallet private key.
   - `ALCHEMY_KEY`: Your Alchemy API key.
   - `WEBHOOK`: Discord webhook for notifications.

2. **Installation**:

- `yarn install`

3. **Run**:

- `yarn start`


## Platform Description

I've made a PoC of an event platform friendly for both Web2 and Web3 users. Upon visiting the page, the users are instructed to set up a Backpack for their collectibles. The reason I've chosen this word was not to associate the collectibles with anything of monetary value, and it feels much more user-friendly.

When a user clicks the "Create Backpack" button, a few things happen in the backend:

1. Their EOA (generated by Web3Auth upon login) is funded by a mock on-ramp with an amount required to deploy a Safe.
2. The Safe is deployed with their EOA as a signer.
3. Our platform sponsors a transaction with Gelato Relay which mints a "Welcome Collectible" to introduce the concept to the user straight away.

Upon setting up the Backpack, the user can view their first collectible on the same page.

On the "Epic Web3 Meetup" event page, the user can Sign Up for it - which informs the event organiser about a new signup and mints another collectible (relayed with Gelato as well) which goes straight into the user's backpack.

What's my favorite part about this is at no point the user is exposed to private keys, the concept of gas, and other more complex Web3 aspects. There is just a Social Media/Email login and it just works.

## Tech Stack

It uses Safe's AA stack along with Web3 Auth to handle the onboarding and preparing transactions.

The digital collectible mint transactions are sponsored by the platform through Gelato Relay.

I've also chosen Polygon as the blockchain, thanks to low costs and an easy Safe integration.

The frontend itself is built with NextJS and Mantine UI library.

## Contracts

Inside the "contracts" folder, you'll find two contracts used by the app. However, for reference, the contracts deployed on the Polygon Mainnet are:

- **Welcome NFT**: [0x900422824d71eedfabddce5bf42381ea5641d8ec](https://polygonscan.com/address/0x900422824d71eedfabddce5bf42381ea5641d8ec)
- **Epic Web3 Meetup**: [0xdeba7ccf04c5f5345b51bbb763ef1b6201afd28a](https://polygonscan.com/address/0xdeba7ccf04c5f5345b51bbb763ef1b6201afd28a)


## UX Optimisations

As for the UX optimization strategies, a few notable ones include:

- **Naming Change**: The traditional term "Wallet" has been replaced with "Backpack" to create a more user-friendly association.

- **Instant Feedback**: During the Backpack's first setup, there's no need for users to refresh the page to see the results of their transaction. Once the platform mints a "Welcome" collectible, it's instantly displayed in their Backpack panel without any extra actions.

- **Progress Bar**: I've integrated an animated progress bar. This feature provides users with visual feedback on the current stage of the Backpack (Safe) deployment, enhancing the overall experience.

