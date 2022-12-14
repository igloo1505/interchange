import Featured from "../models/Featured";

const posts = [
	{
		title: "Support Interchange Food Pantry with a Donation Today",
		url: "https://interchangefoodpantry.org/donate/",
		description:
			'<h2 style="text-align: center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://interchangefoodpantry.org/donate/"><u>Help support the Interchange Food Pantry!</u></a></h2><p><span style="color: rgb(112, 112, 112)">On average, IFP helps about 30,000 Milwaukee individuals struggling with food insecurity each year. These guests are the beneficiaries of your contributions and our commitment to provide nutritious food with a strong emphasis on fresh fruits and vegetables.</span></p><p><span style="color: rgb(112, 112, 112)">Children represent 47% of those we serve, and we are committed to offering nutritious food which impact a young person’s health, growth, and ability to learn. IFP’s food program also helps adults and seniors focus their limited resources on other basic needs including rent, utilities, and medication.</span></p><p><span style="color: rgb(112, 112, 112)">We believe our guests deserve the very best. Many live in food deserts where needs are greatest, and there is limited access to fresh produce.</span></p><p><span style="color: rgb(112, 112, 112)">Your gift is extremely important because it provides resources that make an immediate impact and help our neighbors.</span></p>',
	},
	{
		title: "Interchange Food Pantry featured in Spectrum News 1 story",
		url: "https://spectrumnews1.com/wi/milwaukee/news/2022/03/04/local-food-pantry-fundraising-to-keep-up-with-rising-food-prices?utm_source=Spectrum+News+1",
		description:
			'<p>Spectrum News 1 Reporter Katarina Velazquez recently reported on the food pantry and our efforts to provide fresh fruits and vegetables to our guests.</p><p>Interchange Food Pantry and our dedicated volunteers were recently featured in a story from Spectrum News 1 Milwaukee on the impact of rising food prices.</p><p>“A Milwaukee food pantry that serves high-quality food to its guests asking for community help. The Interchange Food Pantry is fundraising, hoping to keep up with the rising prices of fresh foods and the demand from the community.</p><p>‘With the food prices going up it’s really affecting our guests to not be able to afford what they really need,’ said pantry director George Neureuther.“</p><p>Watch and share the full story here: <a target="_blank" rel="noopener noreferrer nofollow" href="https://bit.ly/3KuqO63">https://bit.ly/3KuqO63</a></p><p>And if able, support our efforts with a donation: <a target="_blank" rel="noopener noreferrer nofollow" href="https://gofund.me/f827bfe0">https://gofund.me/f827bfe0</a></p>',
	},
	{
		title: "The Interchange Food Pantry is open!",
		url: "https://interchangefoodpantry.org",
		description:
			'<p><strong>The</strong><span style="color: rgb(112, 112, 112)"> </span><strong>Interchange Food Pantry remains open and has changed our procedures in order for our guests to receive food in a safe manner. Effective immediately:</strong></p><ul><li><p>Guests line up outside the pantry entrance and keep six feet apart from each other.</p></li><li><p>We will come outside, record your name, and the number of people in your household.</p></li><li><p>Guests will stay outside while our volunteers pack your order.</p></li><li><p>We will bring your food out to you.</p></li></ul>',
	},
];

export const seedFeaturedPosts = async () => {
	let saved = [];
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		let newFeaturedPost = new Featured(post);
		let savedFeaturedPost = await newFeaturedPost.save();
		console.log(`Seeded general post ${post.title}`);
		saved.push(savedFeaturedPost);
	}
	return saved;
};
