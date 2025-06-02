
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

module.exports = productController;