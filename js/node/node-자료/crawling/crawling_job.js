const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config({path:"nodemailer/.env"});
const nodemailer = require('./mail_');
const cron = require('node-cron');

const senderInfo = require('./config/senderInfo.json');

const getHTML = async(keyword) => {
    try {
        const html = (await axios.get(`https://www.jobkorea.co.kr/Search/?local=${encodeURI(keyword)}`)).data;
        return html; 
    } catch (e) {
        console.log(e);
    }
};

//가져온 html에서 정보만 가져온다.
const parsing = async(page) => {
    const $ = cheerio.load(page);
    const jobs = [];
    const $jobList = $(".post");

    $jobList.each((idx, node) => {
        const title = $(node).find(".title").text().trim();
        const company = $(node).find(".neme").text().trim();
        const experience = $(node).find(".exp)").text().trim();
        const education = $(node).find(".edu").text().trim();
        const regularYN = $(node).find(".option > sqpn:eq(2)").text().trim();
        const region = $(node).find(".long").text().trim();
        const dueDate = $(node).find(".date").text().trim();
        const etc = $(node).find(".etc").text().trim();

        jobs.push({
            title, company, experience, education, regularYN, region, dueDate, etc
        })
    });

    return jobs;
};

const getJob = async(keyword) => {
    const html = await getHTML(keyword);
    const jobs = await parsing(html);

    return jobs;
};

const getFullJobs = async () => {
    let jobs = [];
    let i = 1;
    while(i <= 5){
        const job = await getJob(`검색 키워드`);
        jobs = jobs.concat(job);
        i++;
    };

    const table = [];
    table.push(`<table stype = "border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th>구인 제목</th>
                            <th>회사명</th>
                            <th>경력</th>
                            <th>학력</th>
                            <th>정규직여부</th>
                            <th>지역</th>
                            <th>마감일</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>`);

    jobs.forEach(job => {
        table.push(`<tr>`);

        table.push(`<td>${job.title}</td>`);
        table.push(`<td>${job.company}</td>`);
        table.push(`<td>${job.experience}</td>`);
        table.push(`<td>${job.education}</td>`);
        table.push(`<td>${job.regularYN}</td>`);
        table.push(`<td>${job.region}</td>`);
        table.push(`<td>${job.dueDate}</td>`);
        table.push(`<td>${job.etc}</td>`);

        table.push(`</td>`);
    });                
                    
    table.push(`</tbody>
            </table>`);

    const emailData = {
        from: senderInfo.user,
        to: senderInfo.user,
        subject: "구인 정보___",
        html: table.join(""),
    };

    await nodemailer.send(emailData);
};

getFullJobs();

//매일 아침 10시에 전송
/*
cron.schedule("0 10 * * *", async () => {
    getFullJobs();
});
*/