# Example queries for example database
# Show everything from each table.
SELECT * FROM storages;
SELECT * FROM products;
SELECT * FROM app_users;

# Show food in fridgerator, sorted by expiring soon.
SELECT products.product_name,
    products.quantity,
    products.category,
    products.best_by_date
FROM storages, products
WHERE storages.storage_id = 1
AND products.storage_id = 1
ORDER BY best_by_date;
