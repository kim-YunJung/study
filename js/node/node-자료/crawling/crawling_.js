//axios - 특정 웹이트 페이지 내용을 가져오기
const axios = require('axios');
//cheerio - HTML 구조를 가지고있는 일반 텍스트를 자바스크립트를통해 html 접근하는 것과 유사함 함수를 제공
const cheerio = require('cheerio');

//특정 사이트에서내용을 가져오기
const getHTML = async(keyword) => {
    try {
        //encodeURI 한글을 인코더해준다.
        const html = (await axios.get(`https://www.inflearn.com/courses?s=${encodeURI(keyword)}`)).data;
        
        return html; 
    } catch (e) {
        console.log(e);
    }
};

//가져온 html에서 정보만 가져온다.
const parsing = async(page) => {
    const $ = cheerio.load(page);
    const courses = [];
    const $couresList = $(".course_card_item");

    $couresList.each((idx, node) => {
        const title = $(node).find(".course_title").text();
        const instructor = $(node).find(".instructor").text();

        let originalPrice = price= $(node).find(".price").text();

        if($(node).find(".pay_price").length > 0){
            originalPrice = $(node).find(".price del").text();
            price = $(node).find(".pay_price").text();
        }

        courses.push({
            title, instructor, originalPrice, price
        })
    });

    return courses;
};

const getCourse = async(keyword) => {
    const html = await getHTML(keyword);
    const courses = await parsing(html);

    return courses;
};

//getCourse("스프링"); - 1페이지의 검색어만 할 경우
const getFullCourse = async () => {
    let courses = [];
    let i = 1;
    while(i <= 5){
        const course = await getCourse(`스프링&order=popular&page=${i}`);
        courses = courses.concat(course);
        i++;
    };
};

getFullCourse();