# databases

## master data
- ### categories
  - id (pk,int)
  - name (varchar, 200)
  - slug (varchar, 200)
  - thumbnail (varchar, 200)
  - active (bool)

- ### certificates
  - id (pk,int)
  - name (varchar, 200)

- ### products
  - id (int)
  - name (varchar, 200)
  - slug (varchar, 255)
  - sku (varchar, 100)
  - price (float)
  - category_id (int)
  - thumbnail (varchar,100)
  - certificate_id (int)
  - subtitle (varchar, 200)
  - description (text)
  - total_garage (int)
  - total_bathroom (int)
  - total_floor (int)
  - total_bedroom (int)
  - land_length (int)
  - land_width (int)
  - province_id (int)
  - city_id (int)
  - district_id (int)
  - full_address (text)
  - latitude (decimal(8,6))
  - longitude (decimal(9,6))
  - active (bool, true)

- ### product_images
  - id (int)
  - product_id (int)
  - name (varchar, 100)

### users
  - id(int)
  - email (varchar, 100)
  - password (varchar, 255)
  - name (varchar,100)
  - phone (varchar, 20)
  - avatar (varchar, 255)
  - refresh_token (text)
  - type (varchar) enum['admin','normal']
  - created_at (numeric)
  - last_login_at (numeric)

### orders
  - id (int)
  - order_code (varchar,200)
  - product_id (int)
  - grand_total (int)
  - user_id (int)
  - payment_status (varchar, 100) enum['unpaid', 'waiting_confirmation', 'paid']
  - payment_confirmed_at (numeric)
  - order_status (varchar, 100) enum['new', 'done', 'canceled']
  - payment_receipt (varchar, 100)
  - created_at (numeric)