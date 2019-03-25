# alchemy-backend
Alchemy backend apis using REST and GraphQL

## Available scripts

Starting dev server 

### ` npm run start ` creates a GQL playground at ` 4000 ` which is configured in .env file

Starting API mock

### ` npm run mock ` starts the mock server at ` 3003 ` which is configured in package.json scripts

## Sample GQL query

```javascript
{
  mediaplan(id:["MediaPlan D", "MediaPlan F"]){
    campaigns{
      adsets{
        ads{
          ad_name
        }
      }
    }
  }
}
```