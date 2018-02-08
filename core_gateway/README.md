# Core Gateway

### What is this?

This is essentially the api layer for all of our micro-services. It contains a GraphQL service that
exposes an api that connects to various micro-services through gRPC. This allows us some flexibility
with what our services are built in while providing some sort of standard for API integration between
them.

This basically mimics functionality from something like API Gateway in AWS. It allows us to proxy
requests from any client to the appropriate micro-service, lambda, etc. What makes it different is the
Graph layer on top that allows us to get a rich data-driven api experience and not have to document all services
on a route to route basis.

---

### Made with :heartpulse: using:

| Name             | Info                                                                |
| ---------------- | ------------------------------------------------------------------- |
| Node 8.9+        | [Node.js Website](https://nodejs.org)                               |
| Typescript 2.6+  | [TypeScript Website](https://www.typescriptlang.org/)               |
| GraphQL          | [GraphQL Website](http://graphql.org/)                              |
| graphcool/yoga   | [Graphcool Yoga Github](https://github.com/graphcool/graphql-yoga)  |

---

### Getting Started

(COMING SOON)
