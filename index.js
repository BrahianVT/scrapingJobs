
const axios = require('axios');
const cheerio = require('cheerio');


const { html } = require('cheerio/lib/static');




linkedinJobs = [];
// Java Jobs within 24 hours

let  keywords = 'Java';
for(let pageNumber = 0; pageNumber < 100; pageNumber +=25){
	let url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${keywords}%2B&location=M%C3%A9xico&geoId=103323778&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&f_TPR=r86400&f_WT=2&start=${pageNumber}`;
			   
	axios(url)
	.then(response => {
		const html = response.data;
		const $ = cheerio.load(html);
		
		const jobs = $('li');
		jobs.each((index, element) => {
			const jobTitle = $(element).find('h3.base-search-card__title').text().trim();
			const company = $(element).find('h4.base-search-card__subtitle').text().trim();
			const location = $(element).find('span.job-search-card__location').text().trim();
			const link = $(element).find('a.base-card__full-link').attr('href');
	
			//const timeAgo = $(element).find('time.job-search-card__listdate').text().trim();
			console.log(jobTitle);
			//console.log(timeAgo + "------");
			
			
			linkedinJobs.push({
				'Title': jobTitle,
				'Company': company,
				'Location': location,
				'Link': link,
			});
			
			
		});
		
	}).catch(console.error);
	//(async () => {
		//setTimeout(() => {  console.log("World!"); }, 5000);
	//})();
	
	setTimeout(() => {  console.log(""); }, 5000);
}



