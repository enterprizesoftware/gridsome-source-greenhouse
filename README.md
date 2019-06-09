# gridsome-source-greenhouse
> Greenhouse Source for Gridsome <img src="https://developers.greenhouse.io/images/logo-green.png" height="35" />

Retrieves all of your Greenhouse jobs and details so you can present them in your Gridsome site.

## Install

- `npm install gridsome-source-greenhouse`

## Usage
Add the plugin to `gridsome.config.js`

``` javascript
export default {
  plugins: [
    {
      use: 'gridsome-source-greenhouse',
      options: {
        boardToken: 'companyname', // Greenhouse board token 
      }
    }
  ]
}
```

### Content Type Names

- `GreenhouseJobs` - Content from the list jobs API
- `GreenhouseJobDetails` - Content from the retrieve job API

### Example query
``` graphql
<static-query>
  query GreenhouseJobDetails {
    jobDetails: allGreenhouseJobDetails {
      edges {
        node {
          title
          content
        }
      }
    }
  }
</static query> 
```

### Example usage
``` html
<div class="jobs" v-for="edge in $static.jobDetails.edges" :key="edge.node.id">
  <h2>
    {{ edge.node.title }}
  </h2>
  <div class="content">
    {{ edge.node.content }}
  </div>
</div>
```
