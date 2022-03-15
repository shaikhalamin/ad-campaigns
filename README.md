# Ad Campaign build with Laravel and React
    ```php
        #Basic Feature

        1. User can create and edit ad-campaign with  name, date, daily budget, total budget and images.
        3. User can see the list and preview the campaign images from the list.
    ```
## Project Run Instruction

```php

Step 1: git clone https://github.com/shaikhalamin/ad-campaigns.git

Step 2: cd ad-campaigns

Step 3: sudo chmod +x run.sh

Step 4: ./run.sh

Step 5: docker exec -it backend-container php artisan migrate:fresh

```

## React Frontend will be running on http://localhost:3007/ 

```javascript

To Open the frontend link please click the link http://localhost:3007/ to see the result

```
# To Run Test

docker exec -it backend-container php artisan test --filter AdvertisementTest

```