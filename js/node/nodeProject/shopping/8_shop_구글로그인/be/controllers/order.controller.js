const orderController = {};

const {randomStringGenerator} = require("../utils/randomStringGenerator");
const productController = require('../controllers/product.controller');
const Order = require('../models/Order');


orderController.createOrder = async (req, res) => {
    try {
        //데이터 받기
        const {userId} = req;
        const {shipTo, contact, totalPrice, orderList} = req.body;

        //재고 확인 및 재고 업데이트
        //재고 불충분한 아이템 가져오기
        const insufficientStockItems = await productController.checkItemListStock(orderList);

        if(insufficientStockItems.length > 0){
            const errorMessage = insufficientStockItems.reduce(
                (total, item) => {
                    //모든 에러 메시지를 합친다.
                    total += item.message
                    , ""//""는 String형으로 반환하는 것을 의미한다.
                }
            );

            throw new Error(errorMessage)
        }

        //order생성
        const newOrder = new Order({
            userId
            , shipTo
            , contact
            , totalPrice
            , items : orderList
            , orderNum : randomStringGenerator()
        });

        await newOrder.save();

        res.status(200).json({status : "create order success", data : newOrder.orderNum});
    } catch (error) {
        res.status(400).json({status : "create order fail", message : error.message});
    }
}

module.exports = orderController;