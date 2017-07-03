# cache-simplified
Create and use a simple javascript cache.

## Installation

```
npm install cache-simplified --save
```

## API

#### `makeCache: (cacheDefinition: Map<string, ValueDefinition>): Map<string, Handler>`

Returns a cache object build based on provided cache definition.

## Usage

```js

import makeCache from 'cache-simplified';
 
import api from 'some-api';
 
//----------------------------------------------------------------------------------------
// Definition - Cache handler using longer verbose form
//----------------------------------------------------------------------------------------
 
const cache = makeCache({
 
  getCustomer: {
    getPath:    ({ customerId }) => customerId,             // value is cached in data.getCustomer[customerId]
    fetchValue: ({ customerId }) => api.fetchCustomer(customerId),
  },
     
  getPartner: {
    getPath:    ({ partnerId }) => partnerId,               // value is cached in data.getCustomer[partnerId]
    fetchValue: ({ partnerId }) => api.fetchCustomer(partnerId),
  },
 
  getCategories: {
    getPath:    () => [],                                   // value is cached in data.getCategories
    fetchValue: () => api.fetchCategories(),
  }
 
});
 
//----------------------------------------------------------------------------------------
// Definition - Cache handler using shorter form - SIMILAR FUNCTIONALITY TO PREVIOUS
//----------------------------------------------------------------------------------------
 
const cache = makeCache({
 
  getCustomer: [
    ({ customerId }) => customerId,                      // When using short form first element in array is
    ({ customerId }) => api.fetchCustomer(customerId),   // mapped to getPath, second to fetchValue
  ],
 
  getPartner: [
    ({ partnerId }) => partnerId,
    ({ partnerId }) => api.fetchCustomer(partnerId),
  ],
 
  getCategories: api.fetchCategories,                    // getPath can be omitted when not needed
 
});
 
//----------------------------------------------------------------------------------------
// Cache usage
//----------------------------------------------------------------------------------------
 
 // API fetch is executed 
 const customer_from_api = cache.getCustomer({ customerId: 123 });
 
 // no API calls this time
 const customer_from_cache = cache.getCustomer({ customerId: 123 });
 
  // API fetch is executed
  const customer_from_api = cache.getCustomer({ customerId: 123 }, { forceRefresh: true });
 
 // API fetch is executed 
 const categories_from_api = cache.getCategories();
 
 // no API calls this time
 const categories_from_cache = cache.getCategories();

```

## License

MIT
