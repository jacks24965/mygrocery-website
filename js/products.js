// MYGrocery - Central Product Catalog
// All prices in RM (MYR)
// baseUnit: "kg" | "pcs" | "egg" | "L"
// quantityType: "item" | "egg-package" | "size-qty" | "fixed-package"
// searchTerms: array of searchable aliases for each product

var DEFAULT_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=75";

var PRODUCT_CATALOG = [
    // FRUITS (all sold by kg)
    { id: 1, name: "Apple", category: "Fruits", price: 6.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=75", alt: "Fresh red apples", searchTerms: ["apple","fuji","red apple","fruit","buah epal"] },
    { id: 2, name: "Banana", category: "Fruits", price: 4.50, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=75", alt: "Fresh yellow bananas", searchTerms: ["banana","pisang","berangan","fruit"] },
    { id: 3, name: "Orange", category: "Fruits", price: 8.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=75", alt: "Fresh oranges", searchTerms: ["orange","navel","citrus","fruit","limau"] },
    { id: 4, name: "Mango", category: "Fruits", price: 12.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=75", alt: "Ripe mangoes", searchTerms: ["mango","mangga","honey mango","fruit"] },
    { id: 5, name: "Watermelon", category: "Fruits", price: 5.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=75", alt: "Fresh watermelon", searchTerms: ["watermelon","tembikai","fruit"] },
    { id: 6, name: "Lemon", category: "Fruits", price: 5.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=75", alt: "Fresh lemons", searchTerms: ["lemon","limau nipis","citrus","fruit"] },
    { id: 7, name: "Pear", category: "Fruits", price: 9.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400&q=75", alt: "Fresh pears", searchTerms: ["pear","asian pear","buah pir","fruit"] },
    { id: 8, name: "Avocado", category: "Fruits", price: 12.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=75", alt: "Ripe avocados", searchTerms: ["avocado","alpukat","fruit"] },
    { id: 9, name: "Grapes", category: "Fruits", price: 11.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=75", alt: "Fresh grapes", searchTerms: ["grapes","anggur","red grapes","fruit"] },
    { id: 10, name: "Blueberry", category: "Fruits", price: 35.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.25, image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=75", alt: "Fresh blueberries", searchTerms: ["blueberry","blueberries","fruit"] },

    // VEGETABLES (all sold by kg)
    { id: 11, name: "Carrot", category: "Vegetables", price: 3.50, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=75", alt: "Fresh orange carrots", searchTerms: ["carrot","carrots","lobak merah","sayur"] },
    { id: 12, name: "Potato", category: "Vegetables", price: 4.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 1, image: "https://th.bing.com/th/id/OIP.Evz-JO1JkjhdaOQwDIYNQAHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Fresh potatoes", searchTerms: ["potato","potatoes","kentang","ubi kentang","sayur"] },
    { id: 13, name: "Tomato", category: "Vegetables", price: 5.50, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=75", alt: "Fresh red tomatoes", searchTerms: ["tomato","tomatoes","tomato merah","sayur"] },
    { id: 14, name: "Onion", category: "Vegetables", price: 4.20, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 1, image: "https://shopatcloves.com/wp-content/uploads/2022/01/Red-Onion.jpg", alt: "Fresh onions", searchTerms: ["onion","red onion","bawang","bawang merah","sayur"] },
    { id: 15, name: "Garlic", category: "Vegetables", price: 7.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://healthjade.com/wp-content/uploads/2017/02/Garlic.jpg", alt: "Fresh garlic", searchTerms: ["garlic","bawang putih","sayur"] },
    { id: 16, name: "Broccoli", category: "Vegetables", price: 5.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Broccoli-78ec54e.jpg", alt: "Fresh broccoli", searchTerms: ["broccoli","bunga kobis","sayur"] },
    { id: 17, name: "Cabbage", category: "Vegetables", price: 3.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&q=75", alt: "Fresh cabbage", searchTerms: ["cabbage","kobis","sayur"] },
    { id: 18, name: "Cucumber", category: "Vegetables", price: 3.50, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=75", alt: "Fresh cucumber", searchTerms: ["cucumber","timun","sayur"] },
    { id: 19, name: "Spinach", category: "Vegetables", price: 4.50, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=75", alt: "Fresh spinach", searchTerms: ["spinach","bayam","sayur"] },
    { id: 20, name: "Lettuce", category: "Vegetables", price: 4.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&q=75", alt: "Fresh lettuce", searchTerms: ["lettuce","salad","sayur"] },

    // MEAT & SEAFOOD (all sold by kg)
    { id: 21, name: "Chicken Breast", category: "Meat & Seafood", price: 14.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://tse4.mm.bing.net/th/id/OIP.A7eR1_1OoDOrhuc5sc8J3gHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Fresh chicken breast", searchTerms: ["chicken breast","dada ayam","ayam","meat"] },
    { id: 22, name: "Chicken Thigh", category: "Meat & Seafood", price: 12.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://static.vecteezy.com/system/resources/previews/005/563/063/large_2x/raw-chicken-thigh-piece-of-poultry-meat-fresh-portion-dietary-photo.jpg", alt: "Fresh chicken thigh", searchTerms: ["chicken thigh","paha ayam","ayam","meat"] },
    { id: 23, name: "Whole Chicken", category: "Meat & Seafood", price: 11.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=75", alt: "Whole chicken", searchTerms: ["whole chicken","ayam keseluruhan","ayam","meat"] },
    { id: 24, name: "Beef", category: "Meat & Seafood", price: 35.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&q=75", alt: "Fresh beef", searchTerms: ["beef","daging","daging lembu","meat"] },
    { id: 26, name: "Salmon", category: "Meat & Seafood", price: 45.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://img.freepik.com/premium-photo/whole-salmon-isolated-white-atlantic-salmon-gutted-salmon-carcass-eviscerated-carcass-salmon-fish-market-showcase_256259-3053.jpg?w=2000", alt: "Fresh salmon", searchTerms: ["salmon","ikan salmon","seafood"] },
    { id: 27, name: "Prawns", category: "Meat & Seafood", price: 32.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=75", alt: "Fresh prawns", searchTerms: ["prawns","udang","seafood"] },
    { id: 28, name: "Fish (Mackerel)", category: "Meat & Seafood", price: 15.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://static.syndew.store/storeuploads/0002661_mackerel-fish_600.jpeg", alt: "Fresh mackerel", searchTerms: ["mackerel","ikan kembung","ikan","seafood"] },
    { id: 29, name: "Squid", category: "Meat & Seafood", price: 22.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://media02.stockfood.com/largepreviews/MjE4NDgwMjg0MQ==/70477511--Underwater-view-of-an-oval-squid-Sepioteuthis-lessoniana-Maui-Hawaii-United-States-of-America.jpg", alt: "Fresh squid", searchTerms: ["squid","sotong","seafood"] },
    { id: 30, name: "Crab", category: "Meat & Seafood", price: 28.90, unit: "per kg", baseUnit: "kg", quantityType: "item", defaultQty: 0.5, image: "https://insanelygoodrecipes.com/wp-content/uploads/2022/11/Maryland-Steamed-Blue-Crabs-with-Lemons.jpg", alt: "Fresh crab", searchTerms: ["crab","ketam","seafood"] },

    // DAIRY & EGGS
    { id: 31, name: "Milk (Full Cream)", category: "Dairy & Eggs", price: 6.90, unit: "1L", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=75", alt: "Full cream milk", searchTerms: ["milk","full cream","susu","dairy"] },
    { id: 32, name: "Milk (Low Fat)", category: "Dairy & Eggs", price: 7.50, unit: "1L", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=75", alt: "Low fat milk", searchTerms: ["milk","low fat","susu","dairy"] },
    { id: 33, name: "Yogurt", category: "Dairy & Eggs", price: 5.90, unit: "500g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75", alt: "Yogurt", searchTerms: ["yogurt","yoghurt","dairy"] },
    { id: 34, name: "Butter", category: "Dairy & Eggs", price: 8.90, unit: "250g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=75", alt: "Butter", searchTerms: ["butter","mentega","dairy"] },
    { id: 35, name: "Cheese (Slice)", category: "Dairy & Eggs", price: 9.90, unit: "16 slices", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=75", alt: "Sliced cheese", searchTerms: ["cheese","keju","dairy"] },
    { id: 36, name: "Cream Cheese", category: "Dairy & Eggs", price: 10.90, unit: "250g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://i5.walmartimages.com/asr/71a19f25-cb2c-4b6c-9c1f-6e113cbff929_1.5660dee4ec16917284838fed94cd0beb.jpeg", alt: "Cream cheese", searchTerms: ["cream cheese","keju krim","dairy"] },
    { id: 37, name: "Eggs (Regular)", category: "Dairy & Eggs", price: 11.90, unit: "per tray", baseUnit: "egg", quantityType: "egg-package", defaultQty: 1, purchaseOptions: [{ label: "Single", multiplier: 1 }, { label: "Case (15)", multiplier: 15 }], defaultPurchaseType: "Single", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=75", alt: "Regular eggs", searchTerms: ["eggs","telur","tray","dairy"] },
    { id: 38, name: "Eggs (Omega)", category: "Dairy & Eggs", price: 16.90, unit: "per tray", baseUnit: "egg", quantityType: "egg-package", defaultQty: 1, purchaseOptions: [{ label: "Single", multiplier: 1 }, { label: "Case (15)", multiplier: 15 }], defaultPurchaseType: "Single", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=75", alt: "Omega eggs", searchTerms: ["omega eggs","telur omega","dairy"] },

    // GRAINS & STAPLES
    { id: 39, name: "Rice (Jasmine)", category: "Pantry & Grains", price: 15.90, unit: "5kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=75", alt: "Jasmine rice", searchTerms: ["rice","jasmine","beras","nasi","staple"] },
    { id: 40, name: "Rice (Basmati)", category: "Pantry & Grains", price: 22.90, unit: "5kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/be8b2e152187419.63197dd794369.png", alt: "Basmati rice", searchTerms: ["basmati","rice","staple"] },
    { id: 41, name: "Noodles (Mee)", category: "Pantry & Grains", price: 3.50, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=75", alt: "Yellow noodles", searchTerms: ["noodles","mee","mi","staple"] },
    { id: 42, name: "Rice Vermicelli", category: "Pantry & Grains", price: 3.90, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://thumbs.dreamstime.com/b/thai-died-rice-vermicelli-wood-board-uncooked-218141777.jpg", alt: "Rice vermicelli", searchTerms: ["vermicelli","bihun","staple"] },
    { id: 43, name: "Spaghetti", category: "Pantry & Grains", price: 4.90, unit: "500g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=75", alt: "Spaghetti pasta", searchTerms: ["spaghetti","pasta","mi","staple"] },
    { id: 44, name: "Bread (White)", category: "Pantry & Grains", price: 3.50, unit: "per loaf", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.cookingclassy.com/wp-content/uploads/2020/04/bread-recipe-1.jpg", alt: "White bread", searchTerms: ["bread","roti","white bread","staple"] },
    { id: 45, name: "Bread (Wholemeal)", category: "Pantry & Grains", price: 5.50, unit: "per loaf", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=75", alt: "Wholemeal bread", searchTerms: ["wholemeal","roti wholemeal","staple"] },
    { id: 46, name: "Flour (Wheat)", category: "Pantry & Grains", price: 4.90, unit: "1kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.bitemybun.com/wp-content/uploads/2022/06/What-is-wheat-flour.jpg", alt: "Wheat flour", searchTerms: ["flour","wheat","tepung","staple"] },
    { id: 47, name: "Oats", category: "Pantry & Grains", price: 8.90, unit: "500g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1598048851887-0263d4f43e73?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Oat flakes", searchTerms: ["oats","oat","staple"] },
    { id: 48, name: "Cornflakes", category: "Pantry & Grains", price: 9.90, unit: "500g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1574157654834-4028181ccaa5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Cornflakes cereal", searchTerms: ["cornflakes","cereal","staple"] },

    // CONDIMENTS & SAUCES
    { id: 49, name: "Cooking Oil", category: "Condiments & Sauces", price: 12.90, unit: "5L", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://thumbs.dreamstime.com/b/vegetable-oil-cooking-bottle-isolated-white-63612117.jpg", alt: "Cooking oil", searchTerms: ["cooking oil","minyak","condiment"] },
    { id: 50, name: "Soy Sauce", category: "Condiments & Sauces", price: 4.90, unit: "500ml", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1638324396179-61035bc1e645?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c295JTIwc2F1Y2V8ZW58MHx8MHx8fDA%3D", alt: "Soy sauce", searchTerms: ["soy sauce","kicap","condiment"] },
    { id: 51, name: "Chilli Sauce", category: "Condiments & Sauces", price: 5.90, unit: "500ml", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1694370477525-bfb30bb061c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Chilli sauce", searchTerms: ["chilli sauce","sos cili","condiment"] },
    { id: 52, name: "Tomato Sauce", category: "Condiments & Sauces", price: 5.50, unit: "500ml", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://img.freepik.com/premium-photo/bottle-tomato-sauce-tomato-sauce_956920-249166.jpg", alt: "Tomato sauce", searchTerms: ["tomato sauce","ketchup","condiment"] },
    { id: 53, name: "Oyster Sauce", category: "Condiments & Sauces", price: 6.90, unit: "500ml", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.savorysweetspoon.com/wp-content/uploads/2024/01/Oyster-Sauce.jpg", alt: "Oyster sauce", searchTerms: ["oyster sauce","sos tiram","condiment"] },
    { id: 54, name: "Fish Sauce", category: "Condiments & Sauces", price: 5.90, unit: "500ml", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://th.bing.com/th/id/OIP.0UoxuGjBU7-eNilDSPvEoAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Fish sauce", searchTerms: ["fish sauce","sos ikan","condiment"] },
    { id: 55, name: "Salt", category: "Condiments & Sauces", price: 2.90, unit: "1kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVi-d1w7uwU6VqxQZokwidA5-5Ud5dSsWd0cZrXuo1wd3Oft_DWZZRsLA-&s=10", alt: "Table salt", searchTerms: ["salt","garam","condiment"] },
    { id: 56, name: "Sugar", category: "Condiments & Sauces", price: 3.50, unit: "1kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1673791031093-eb8eefa60083?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "White sugar", searchTerms: ["sugar","gula","condiment"] },
    { id: 57, name: "Pepper (White)", category: "Condiments & Sauces", price: 6.90, unit: "per bottle", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.gosupps.com/media/catalog/product/8/1/81ZLW2A7uWL.jpg", alt: "White pepper", searchTerms: ["pepper","white pepper","lada","condiment"] },
    { id: 58, name: "Curry Powder", category: "Condiments & Sauces", price: 5.90, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://plus.unsplash.com/premium_photo-1726862790171-0d6208559224?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Curry powder", searchTerms: ["curry","kari","serbuk kari","condiment"] },

    // BEVERAGES
    { id: 59, name: "Mineral Water", category: "Beverages", price: 4.90, unit: "6 x 1.5L", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Mineral water", searchTerms: ["water","mineral","air","beverage"] },
    { id: 60, name: "Green Tea", category: "Beverages", price: 5.90, unit: "per box", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Green tea", searchTerms: ["green tea","teh hijau","beverage"] },
    { id: 61, name: "Coffee (Instant)", category: "Beverages", price: 14.90, unit: "per jar", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=75", alt: "Instant coffee", searchTerms: ["coffee","kopi","nescafe","beverage"] },
    { id: 62, name: "Orange Juice", category: "Beverages", price: 6.90, unit: "1L", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=75", alt: "Orange juice", searchTerms: ["orange juice","jus oren","beverage"] },
    { id: 63, name: "Milo", category: "Beverages", price: 12.90, unit: "1kg", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://i5.walmartimages.com/seo/Nestle-Milo-Malt-Beverage-Mix-Chocolate-14-1-Ounce_3c035129-6bd7-4d5b-99a3-f2a53430a7eb.c90840c4a3287a5ab90e7e7bcb1917c4.jpeg", alt: "Milo chocolate malt", searchTerms: ["milo","chocolate drink","beverage"] },
    { id: 64, name: "Teh Tarik Mix", category: "Beverages", price: 8.90, unit: "per box", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://down-my.img.susercontent.com/file/my-11134207-7rase-m7c1rifbuc7c43", alt: "Teh tarik mix", searchTerms: ["teh tarik","tea mix","teh","beverage"] },

    // SNACKS
    { id: 65, name: "Potato Chips", category: "Snacks", price: 4.90, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=75", alt: "Potato chips", searchTerms: ["chips","crisps","kerepek","snack"] },
    { id: 66, name: "Biscuits (Marie)", category: "Snacks", price: 3.90, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.biscuitpeople.com/media/cache/platform_full/430671b10edbce04b3614e7c905d4a428e0a8d5a.png", alt: "Marie biscuits", searchTerms: ["biscuit","marie","biskut","snack"] },
    { id: 67, name: "Crackers", category: "Snacks", price: 5.90, unit: "per pack", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://www.recipetineats.com/tachyon/2024/08/Crackers_2.jpg", alt: "Crackers", searchTerms: ["crackers","keropok","snack"] },
    { id: 68, name: "Peanuts", category: "Snacks", price: 7.90, unit: "500g", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://plus.unsplash.com/premium_photo-1726072356924-e29e8999df09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Roasted peanuts", searchTerms: ["peanuts","kacang tanah","snack"] },

    // HOUSEHOLD
    { id: 69, name: "Dishwashing Liquid", category: "Household", price: 5.90, unit: "1L", baseUnit: "pcs", quantityType: "size-qty", sizeOptions: ["0.5L","1L","1.5L","2L"], sizeMultipliers: { "0.5L": 0.6, "1L": 1.0, "1.5L": 1.4, "2L": 1.8 }, defaultSize: "1L", defaultQty: 1, image: "https://i5.walmartimages.com/seo/Great-Value-Ultra-Dish-Liquid-Original-28-fl-oz_69b6d19d-bc0e-44d9-a1d1-a65fd809f708.ae55eb53d53da466e676634746a801ff.jpeg", alt: "Dishwashing liquid", searchTerms: ["dishwashing","dish soap","sabun pinggan","mama lime","household"] },
    { id: 70, name: "Laundry Detergent", category: "Household", price: 5.633, unit: "per L", baseUnit: "L", quantityType: "fixed-package", packageSize: 3, packageUnit: "L", defaultQty: 1, image: "https://i5.walmartimages.com/seo/Tide-Liquid-Laundry-Detergent-Original-64-Loads-92-fl-oz-HE-Compatible_f946cf37-7bb9-4b11-af74-355ead2084c0.edbd9b8b8ef5bb0940bf43e269d5c759.jpeg", alt: "Laundry detergent", searchTerms: ["detergent","laundry","sabun basuh","breeze","household"] },
    { id: 71, name: "Kitchen Towels", category: "Household", price: 6.90, unit: "2 rolls", baseUnit: "pcs", quantityType: "fixed-package", packageSize: 2, packageUnit: "rolls", defaultQty: 1, image: "https://m.media-amazon.com/images/I/71zFwpJBClL._SL1500_.jpg", alt: "Kitchen paper towels", searchTerms: ["kitchen towel","paper towel","tisu dapur","household"] },
    { id: 72, name: "Sponges", category: "Household", price: 4.50, unit: "3pcs", baseUnit: "pcs", quantityType: "fixed-package", packageSize: 3, packageUnit: "pcs", defaultQty: 1, image: "https://ph-test-11.slatic.net/p/5c769ec3996f04d0a8fa532466c13d69.jpg", alt: "Cleaning sponges", searchTerms: ["sponge","sponges","scotch brite","household","dapur"] },
    { id: 73, name: "Tissue", category: "Household", price: 8.90, unit: "150 sheets", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://i5.walmartimages.com/asr/2bfad3f6-3263-4e24-8bce-4450284d1bb7_1.2093d24bbddcbe0d5b5031c0974bb0f4.jpeg", alt: "Facial tissue", searchTerms: ["tissue","facial tissue","kleenex","tisu","household"] },
    { id: 74, name: "Garbage Bags", category: "Household", price: 5.50, unit: "30pcs", baseUnit: "pcs", quantityType: "item", defaultQty: 1, image: "https://m.media-amazon.com/images/I/81VyN5HuZAL.jpg", alt: "Garbage bags", searchTerms: ["garbage bag","trash bag","sampah","household","beg sampah"] }
];

var currencyFormatter = new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 2, maximumFractionDigits: 2 });

function formatPrice(amount) {
    var n = parseFloat(amount);
    if (isNaN(n) || n === null || n === undefined) n = 0;
    return currencyFormatter.format(n);
}

function getCategories() {
    var cats = {};
    PRODUCT_CATALOG.forEach(function(p) { cats[p.category] = true; });
    var mainCats = ['All', 'Fruits', 'Vegetables', 'Meat & Seafood', 'Dairy & Eggs', 'Pantry & Grains', 'Snacks', 'Household'];
    var pantrySubCats = ['Condiments & Sauces', 'Beverages'];
    var otherCats = Object.keys(cats).filter(function(c) { return mainCats.indexOf(c) === -1 && pantrySubCats.indexOf(c) === -1; });
    return mainCats.concat(pantrySubCats).concat(otherCats);
}

function searchProducts(query) {
    var q = String(query || '').toLowerCase().trim();
    if (!q) return PRODUCT_CATALOG.slice();

    // Score each product for relevance ranking
    var scored = PRODUCT_CATALOG.map(function(p) {
        var name = p.name.toLowerCase();
        var cat = p.category.toLowerCase();
        var terms = (p.searchTerms || []).map(function(t) { return t.toLowerCase(); });
        var score = 0;

        // 1. Exact product-name match (highest priority)
        if (name === q) score += 1000;

        // 2. Product name starts with the typed text
        else if (name.indexOf(q) === 0) score += 500;

        // 3. Product name contains the typed text as a word boundary (e.g., 'Ch' in 'Chicken Breast')
        else if (name.indexOf(' ' + q) !== -1) score += 200;

        // 4. Product name contains the typed text anywhere
        else if (name.indexOf(q) !== -1) score += 100;

        // 5. Category match
        if (cat.indexOf(q) !== -1) score += 50;

        // 6. Search terms match
        for (var i = 0; i < terms.length; i++) {
            if (terms[i] === q) score += 200;
            else if (terms[i].indexOf(q) === 0) score += 100;
            else if (terms[i].indexOf(q) !== -1) score += 50;
        }

        return { product: p, score: score };
    });

    // Filter out products with score 0, sort by score descending
    return scored
        .filter(function(item) { return item.score > 0; })
        .sort(function(a, b) { return b.score - a.score; })
        .map(function(item) { return item.product; });
}

function filterByCategory(products, category) {
    if (!category || category === 'All') return products;
    
    // Pantry & Grains merged category
    if (category === 'Pantry & Grains') {
        return products.filter(function(p) { return p.category === 'Pantry & Grains'; });
    }
    
    // Default: exact category match
    return products.filter(function(p) { return p.category === category; });
}

function sortProducts(products, sortBy) {
    var sorted = products.slice();
    switch (sortBy) {
        case 'name-asc': return sorted.sort(function(a, b) { return a.name.localeCompare(b.name); });
        case 'name-desc': return sorted.sort(function(a, b) { return b.name.localeCompare(a.name); });
        case 'price-asc': return sorted.sort(function(a, b) { return a.price - b.price; });
        case 'price-desc': return sorted.sort(function(a, b) { return b.price - a.price; });
        default: return sorted;
    }
}

function getWeightOptions(baseUnit) {
    if (baseUnit === 'kg') return [0.5, 1, 1.5, 2, 2.5, 3];
    return null;
}

function formatWeight(qty, baseUnit) {
    if (baseUnit === 'kg') {
        var q = parseFloat(qty);
        if (isNaN(q) || q <= 0) return '0.00 kg';
        return q.toFixed(2) + ' kg';
    }
    if (baseUnit === 'L') {
        var q = parseFloat(qty);
        if (isNaN(q) || q <= 0) return '0.00 L';
        return q.toFixed(2) + ' L';
    }
    return qty + ' pcs';
}

function calcItemPrice(product, qty) {
    if (product.quantityType === 'egg-package') {
        var purchaseType = product.defaultPurchaseType || 'single';
        var multiplier = 1;
        if (product.purchaseOptions) {
            for (var i = 0; i < product.purchaseOptions.length; i++) {
                if (product.purchaseOptions[i].label === purchaseType) {
                    multiplier = product.purchaseOptions[i].multiplier;
                    break;
                }
            }
        }
        return Math.round(product.price * qty * multiplier * 100) / 100;
    }
    return Math.round(product.price * qty * 100) / 100;
}

