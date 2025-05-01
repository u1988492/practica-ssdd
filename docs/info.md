# Research Document: Web Services & REST Architecture

## Introduction to Web Services

Web services are application components that communicate using open protocols, enabling different applications to work together regardless of language, platform, or operating system. They provide a standardized way for software applications to interact over a network.

## Types of Web Services

This project focuses on RESTful services, but it's important to understand the broader context of web service types:

1. **XML-RPC (XML Remote Procedure Call)**

   - Uses XML for message encoding
   - Simple protocol with limited data types
   - HTTP as the transport protocol
   - Precursor to SOAP

2. **SOAP (Simple Object Access Protocol)**

   - XML-based messaging protocol
   - Transport-neutral (HTTP, SMTP, etc.)
   - Has built-in error handling
   - Supports various security extensions
   - Highly structured and formal

3. **REST (Representational State Transfer)**

   - Architectural style rather than a protocol
   - Uses standard HTTP methods
   - Typically uses JSON for data interchange
   - Stateless client-server communication
   - Easier to implement than SOAP

4. **JSON-RPC**
   - Similar to XML-RPC but uses JSON instead of XML
   - Lightweight alternative to SOAP
   - Simple request-response model

## REST Architecture

REST (Representational State Transfer) is an architectural style introduced by Roy Fielding in his 2000 doctoral dissertation. It is not a protocol but a set of constraints that, when applied as a whole, emphasizes scalability, interface uniformity, independent deployment of components, and creating a layered architecture to help reduce latency, enforce security, and encapsulate legacy systems.

### Key Principles of REST

1. **Client-Server Architecture**

   - Separation of concerns between user interface and data storage
   - Improves portability of user interfaces and scalability of server components

2. **Statelessness**

   - Each request from client to server contains all information needed to understand and complete the request
   - No client context is stored on the server between requests
   - Makes systems more reliable and easier to scale

3. **Cacheability**

   - Responses must define themselves as cacheable or non-cacheable
   - Improves efficiency, scalability, and performance by reducing client-server interactions

4. **Uniform Interface**

   - Simplifies and decouples the architecture
   - Four interface constraints:
     - Resource identification in requests
     - Resource manipulation through representations
     - Self-descriptive messages
     - Hypermedia as the engine of application state (HATEOAS)

5. **Layered System**

   - Hierarchical layers, each with specific functionality
   - Promotes independence between components

6. **Code on Demand (optional)**
   - Servers can temporarily extend client functionality by transferring executable code

### REST Resources

In REST, everything is considered a resource, which can be:

- A document or image
- A temporal service
- A collection of other resources
- A non-virtual object (e.g., a person)

Each resource is identified by a URI (Uniform Resource Identifier).

### HTTP Methods in REST

REST leverages standard HTTP methods to perform operations on resources:

| Method  | Purpose                     | Safe | Idempotent |
| ------- | --------------------------- | ---- | ---------- |
| GET     | Retrieve data               | Yes  | Yes        |
| POST    | Create a new resource       | No   | No         |
| PUT     | Update an existing resource | No   | Yes        |
| DELETE  | Remove a resource           | No   | Yes        |
| PATCH   | Partially update a resource | No   | No         |
| HEAD    | Retrieve headers only       | Yes  | Yes        |
| OPTIONS | Discover available methods  | Yes  | Yes        |

- **Safe**: Operation does not alter the server state
- **Idempotent**: Multiple identical requests have the same effect as a single request

### JSON as Data Format

JavaScript Object Notation (JSON) has become the preferred data format for REST APIs due to:

- Lightweight compared to XML
- Easy to read and write
- Language-independent
- Easy parsing in JavaScript and most programming languages

Example JSON structure:

```json
{
  "id": 1,
  "name": "User1",
  "roles": ["admin", "user"],
  "active": true,
  "contact": {
    "email": "user1@example.com",
    "phone": "123-456-7890"
  }
}
```

## REST API Design Best Practices

1. **Use Nouns, Not Verbs in Endpoints**

   - Good: `/users`, `/users/123`
   - Avoid: `/getUsers`, `/createUser`

2. **Use Plural Nouns for Collections**

   - `/users` instead of `/user`
   - `/products` instead of `/product`

3. **Use HTTP Methods Appropriately**

   - GET for retrieving resources
   - POST for creating resources
   - PUT for replacing resources
   - PATCH for updating parts of resources
   - DELETE for removing resources

4. **Use Proper HTTP Status Codes**

   - 200: OK
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 404: Not Found
   - 500: Internal Server Error

5. **Version Your API**

   - Include version in URL: `/api/v1/users`
   - Or use HTTP headers: `Accept: application/vnd.example.v1+json`

6. **Implement Filtering, Sorting, and Pagination**

   - Filtering: `/users?role=admin`
   - Sorting: `/users?sort=name:asc`
   - Pagination: `/users?page=2&limit=10`

7. **Use HATEOAS (Hypermedia as the Engine of Application State)**
   - Include links in responses to guide clients on possible next actions
   - Example:
     ```json
     {
       "id": 1,
       "name": "User1",
       "links": [
         { "rel": "self", "href": "/users/1" },
         { "rel": "edit", "href": "/users/1/edit" }
       ]
     }
     ```

## Standards Related to REST

1. **HTTP/1.1 (RFC 7230-7235)**

   - Defines the protocol used by REST services
   - Specifies methods, headers, status codes, etc.

2. **URI (RFC 3986)**

   - Defines the syntax for resource identifiers

3. **JSON (RFC 8259)**

   - Defines the data format commonly used in REST

4. **CORS (Cross-Origin Resource Sharing)**

   - Enables secure cross-domain requests
   - Critical for web applications calling external APIs

5. **OAuth 2.0 (RFC 6749)**

   - Authorization framework frequently used with REST APIs
   - Allows secured delegated access

6. **OpenAPI Specification (formerly Swagger)**

   - Standard for describing REST APIs
   - Facilitates documentation and client code generation

7. **JSON API**
   - Specification for building APIs in JSON
   - Defines client-server interactions

## Remote Procedure Calls in Web Services

While REST is not technically an RPC mechanism (it's resource-focused rather than procedure-focused), it does enable remote operations through HTTP methods. Here's how REST compares to traditional RPC approaches:

### REST vs. RPC

| Aspect          | REST                          | Traditional RPC (SOAP, XML-RPC)               |
| --------------- | ----------------------------- | --------------------------------------------- |
| Focus           | Resources and representations | Procedures/actions                            |
| Interface       | Uniform (HTTP methods)        | Custom methods/operations                     |
| State           | Stateless                     | Can be stateful                               |
| Caching         | Built into HTTP               | Requires custom implementation                |
| Discoverability | HATEOAS can enable it         | Typically requires WSDL/interface description |

### How REST Enables Remote Procedure Calls

1. **Resource Identification**

   - Each resource has a unique URI
   - Example: `/api/users/123`

2. **HTTP Methods as Operations**

   - Instead of method names like `createUser()`, REST uses POST to `/users`
   - Instead of `getUser(123)`, REST uses GET to `/users/123`

3. **Request and Response Formats**

   - Data is exchanged using structured formats (JSON, XML)
   - Example request: `POST /api/calculate` with body `{"operation":"add","x":5,"y":3}`
   - Example response: `{"result":8}`

4. **Status Codes for Results**
   - HTTP status codes indicate success/failure
   - 2xx for success, 4xx for client errors, 5xx for server errors

## Implementation Notes for Our Project

1. **Server Implementation (Node.js + Express)**

   - RESTful routes using Express
   - JSON request/response parsing
   - CORS handling for cross-origin requests
   - Error handling and appropriate status codes

2. **Client Implementation (HTML + JavaScript)**

   - Fetch API for HTTP requests
   - Asynchronous calls with Promise/async-await
   - Structured UI for demonstration
   - Request/response logging

3. **Virtual Machine Communication**
   - Host-only network adapter for VM-host communication
   - CORS enabled on server to allow requests from different origins
   - IP address configuration for proper routing

## Conclusion

REST provides a lightweight, standards-based approach to building distributed systems. Its alignment with HTTP makes it ideal for web applications, while its principles of statelessness and uniform interface make systems more scalable and maintainable. For our demonstration project, REST with JSON offers a straightforward way to showcase remote procedure calls between different machines.
