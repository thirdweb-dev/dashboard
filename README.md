> [!NOTE]  
> This code base has moved and is now read only. You can find the active version [here](https://github.com/thirdweb-dev/js/tree/main/apps/dashboard).

# thirdweb.com

This repo contains the full source for all of thirdweb.com and the thirdweb dashboard.

## Building

### Install dependencies

We use `pnpm`.

```sh
pnpm install
```

### Generate graphql types

```sh
pnpm apollo-codegen
```

### Starting local dev server.

```sh
pnpm dev
```

### Building for production

```sh
pnpm build
```

### Environment Variables

Some env vars can be overridden that are required for some external services to work. You can find them in the `.env.example` file at the root level of the project including some descriptions of what they are used for.

To define env vars please create a `.env` file based on the `.env.example` template at the root level of the project. This file is ignored by git so you can safely add it to your local copy of the project.

**Add your thirdweb clientID and secret key to build a basic functioning version of the site.**
