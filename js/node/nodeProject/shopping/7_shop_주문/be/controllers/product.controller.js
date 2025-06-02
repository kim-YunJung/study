
const Product = require("../models/Product");

const productController = {};

const PAGE_SIZE = 5;

productController.createProduct = async (req, res) => {
    try {
        const { sku, name, size, image, category, description, price, stock, status } = req.body;
        const product = new Product({sku, name, size, image, category, description, price, stock, status});

        await product.save();

        res.status(200).json({status : "create product success", product});

    } catch (error) {
        res.status(400).json({status : "create product fail", message : error.message});
    }
}

productController.getListProduct = async (req, res) => {
    try {
        const {page, name} = req.query;
                                    //$regex 포함된 내용을 검색
                                                //i 대소문자 구분하지 않는다.
        const cond = name ? {name : {$regex:name, $options:"i"}} : {} ;

        let query = Product.find(cond);

        let response = {status : "product list success"};

        if(page){
            //page 파라미터의 값이 있을 경우
            //skip - 몽구스의 함수, 넘기고 싶은 숫자를 입력한다.
            //limit - 몽구스의 함수, 보여줄 수를 제한       
            query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);

            //전체 페이지 수 - 데이터 총 수 / PAGE_SIZE
            //const totalItemNum = await Product.find(cond).count(); - count() 동작하지 않아 아래와 같이 수정했음
            const totalItemNum = await Product.find(cond);
            const total = Object.keys(totalItemNum).length;

            const totalPageNum = Math.ceil(total / PAGE_SIZE);
    
            response.totalPageNum = totalPageNum;                            
        }
                
        //실행과 선언을 따로 분리가 가능하며, 아래의 내용은 실행을 요청한다.
        const productList = await query.exec();
    
        //응답으로 보낼 객체를 상황에 따라 데이터를 추가해서 보낸다.
        response.data = productList;
                
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({status : "product list fail", message : error.message});
    }
}

productController.updaterProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        const { sku, name, size, image, category, description, price, stock, status } = req.body;

        const product = await Product.findByIdAndUpdate(
            {_id : productId}
            , { sku, name, size, image, category, description, price, stock, status }
            , {new : true}//새로운 값을 받고 싶을 경우
        );

        if(!product)
            throw new Error('상품이 존재하지 않습니다.');

        res.status(200).json({status : "update product success", data : product});
    } catch (error) {
        res.status(400).json({status : "product update fail", message : error.message});
    }
}

productController.getProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById({_id : productId});

        if(!product)
            throw new Error('상품이 존재하지 않습니다.');

        res.status(200).json({status : "select product success", data : product});
    } catch (error) {
        res.status(400).json({status : "select product fail", message : error.message});
    }
}

productController.checkItemListStock = async (itemList) => {
    const insufficientStockItems = [];

    /*
    itemList.map(async (item) => {
        const stockCheck = await productController.checkItemListStock(item);

        if(!stockCheck.isVerify){
            insufficientStockItems.push({
                item
                , message : stockCheck.isVerify.message
            });
        }

        return stockCheck;
    })
    */
   /* 비동기를 한번에 처리 Promise 
   Promise - 쓰레드 처럼 여러일을 동시에 처리한다. */
   await Promise.all(
    itemList.map(async (item) => {
        const stockCheck = await productController.checkStock(item);

        if(!stockCheck.isVerify){
            insufficientStockItems.push({
                item
                , message : stockCheck.isVerify.message
            });
        }

        return stockCheck;
    })
   );

    return insufficientStockItems;
}

productController.checkStock = async (item) => {
    //구매하려는 아이템 재고 정보
    const product = await Product.findById(item.productId);

    //구매하려는 아이템 qty와 재고 비교
    if(product.stock[item.size] < item.qty){
        //재고가 불충분할 시, 메시지와 함께 데이터 반환
        return {isVerify : false
            , message : `${product.name}의 ${item.size} 재고가 부족합니다.`};
    }

                    //기존의 정보를 가져온다.
    const newStock = {...product.stock};
    newStock[item.size] -= item.qty;

    //정보를 업데이트 해준다.
    product.stock = newStock;

    //충분할 경우, 재고에서 qty를 뺀후 메시지 반환
    await product.save();

    return {isVerify : true};
}

module.exports = productController;