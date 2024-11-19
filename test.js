const cheerio = require('cheerio');
const axios = require('axios');

//download website 
async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.google.com/search?q=define+preposterous&oq=define+&gs_lcrp=EgZjaHJvbWUqDAgBECMYJxiABBiKBTIOCAAQRRgnGDsYgAQYigUyDAgBECMYJxiABBiKBTIGCAIQRRg5MgYIAxBFGDsyDAgEEAAYQxiABBiKBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDI5NjdqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8",
        headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    // parsing the HTML source of the target web page with Cheerio
    const $ = cheerio.load(axiosResponse.data);

    // const htmlElement = $(".UQt4rd");
    // const $w = htmlElement.children("img").attr("alt");

    // const temp = $(".vk_bk.TylWce.SGNhVe");
    // const $temp = temp.children(".wob_t.q8U8x");

    //<div class="NZKOFkdkcvYgD3lqOIJw"><div> <!-- -->completely contrary to nature, reason, or common sense; utterly foolish; <a href="/browse/absurd">absurd</a>;<!-- --> <a href="/browse/senseless">senseless</a>:</div></div>

    //<span class="HGU9YJqWX_GVHkeeJhSH">

    //<div class="S3nX0leWTGgcyInfTEbW" id="american-preposterous-adjective"><h2>adjective</h2></div>

    // Kv0dYe8q8iym0BWHAdO3

    const htmlElement = $(".wHYlTd.sY7ric");//wHYlTd sY7ric//.PZPZlf
    
    // weather.push(String($w).toLowerCase());
    // tempMaxMin.push($temp.text())

    // console.log(`w: ${weather}`);
    // console.log(`t: ${tempMaxMin}`);

    //console.log(`${htmlElement.contents().first().text()}`);
    // console.log(`${htmlElement.find(".PZPZlf").text()}`);
    htmlElement.each(function(i, elm) {
        console.log($(this).text());
    });
};

performScraping().catch((err) => {
    console.log(err);
});