# Chatbot Minimester Project

This project is part of a high school minimester course, introducing students to the development of a chatbot using modern web technologies. It utilizes Turborepo and pnpm for efficient management of the project's monorepo structure.

## Using this Repository

To set up the project, clone the repository and install dependencies using pnpm:

```sh
git clone git@github.com:doctor-ew/chatbot_minimester.git
or
git clone https://github.com/doctor-ew/chatbot_minimester.git
cd chatbot_minimester
pnpm install
```

## Querying Data

The project includes a GraphQL server that provides an API to fetch data. To query this data:

1. **Start the GraphQL server** by running the appropriate development command (e.g., `pnpm dev`).

2. **Use `curl` to make a POST request**. This is akin to asking a specific question to the server and getting a response. Here's what each part of the command does:

    - `curl`: A command-line tool used for sending requests and receiving responses over the network.

    - `-X POST`: Specifies that this is a POST request, a common HTTP method used for sending data to a server.

    - `-H "Content-Type: application/json"`: Sets a header indicating the type of content being sent, in this case, JSON (JavaScript Object Notation).

    - `-d '{"query": "..."}'`: The data being sent in the request. Here, it's a GraphQL query formatted as JSON. The query asks for specific fields of `pocketMorties`.

    - `http://localhost:4000/rickmorty`: The URL where the request is sent, pointing to the local GraphQL server and the specific endpoint.

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"query": "{ pocketMorties { id name type image evolution evolutions rarity hp atk def spd } }"}' \
     http://localhost:4000/rickmorty
```

## Apps and Packages

This repository includes the following:

- `graphql`: A GraphQL API server providing endpoints for chatbot data.
- `docs`: a [Next.js](https://nextjs.org/) app for documentation.
- `web`: another [Next.js](https://nextjs.org/) app, serving as the main frontend.

