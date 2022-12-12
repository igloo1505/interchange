import Patron, { PatronInterface } from "../models/Patron";

const patrons: PatronInterface[] = [
	{
		name: { first: "Clyde" },
		description:
			'<p>Pantry guest Clyde has been coming to the Interchange Food Pantry for a few years now.</p><p style="text-align: start">“Someone told me the pantry was here,” he said. “It saves me time instead of going to the south side, since I live close by and take the bus.”</p><p style="text-align: start">He encourages others to visit the pantry if they need some extra help.</p><p style="text-align: start">“Come on down. The pantry is here, it’s here for everybody. That’s how I look at it,” he said.</p><p style="text-align: start">Clyde comes to the pantry regularly but there are times he doesn’t need the extra help, and he hopes that ends up helping others in need.</p><p style="text-align: start">“When I have money in my pocket, I don’t want to be taking food from somebody else,” Clyde explained.</p><p style="text-align: start">Of course, Interchange Food Pantry helps anyone in need and strives to have enough supplies to go around for all the guests who come to our doors..</p><p style="text-align: start">Although hunger relief is serious business, Clyde joked and laughed to lighten the mood as he waited in line for his groceries. He hopes that his positivity is contagious.</p><p style="text-align: start">“We’ve gotta help each other,” he said.</p><p style="text-align: start">Thank you, Clyde, for coming to the pantry today! Do you know someone who could use help with groceries? Send them our way, since Interchange Food Pantry serves guests regardless of zip code.</p>',
	},
	{
		name: { first: "Pamela" },
		description:
			'<p>Pamela is a regular guest who has been coming to the pantry for the past few years.</p><p style="text-align: start">“It’s been so many years since I first learned about the pantry. I was out somewhere and heard someone say there’s a food pantry between Knapp and Juneau. And that was almost 3 years ago.”</p><p style="text-align: start">She’s been coming regularly since and enjoys the connections she’s made here during a difficult few years, including with pantry director George.</p><p style="text-align: start">“George is my best friend! I adore him. I’ve come to the pantry pretty regularly since then these past few years.”</p><p style="text-align: start">She shared one of her favorite memories from the pantry involved receiving a Thanksgiving ham.</p><p style="text-align: start">“One Thanksgiving, I didn’t have a ham. I had already gotten my food from the pantry, but George hollered, ‘Hey, I’ve got something for you.’ And he gave me a ham. It was a big ham—it looked like the size of a cow!”</p><p style="text-align: start">Pamela expressed gratitude for the food pantry’s support as she navigated the COVID-19 pandemic, including two times she came down with COVID herself.</p><p style="text-align: start">“The first time I had COVID, I went to the hospital for four weeks. It was just that bad. I couldn’t do anything. I’ve been really afraid of that COVID. I haven’t had an outing or family over because of it.”</p><p style="text-align: start">The food pantry has been a bright spot for Pamela in these trying times, with volunteers able to bring her groceries to the car for her to be safe.</p><p style="text-align: start">“I always make my way to this pantry because I don’t get out that much. I’m so grateful the pantry is here. I feel safe here. As long as we keep masking up and social distancing! So, I’d ask people, ‘Please, mask up!’ And go get tested if you have a cough or feel sick.”</p><p style="text-align: start">Thanks for coming to the pantry, Pamela! We appreciate you!</p><p style="text-align: start">Interchange Food Pantry continues to ask guests and volunteers to wear masks, practice social distancing, and get vaccinated against COVID-19 when possible, for the continued safety of everyone we serve. We appreciate your cooperation!</p>',
	},
	{
		name: {
			first: "James",
		},
		description:
			'<p>Meet James, a recent guest at the pantry during a busy Saturday morning.</p><p style="text-align: start">“The pantry loads me up and feeds me like a king,” James said, about Interchange. He has been coming here regularly for groceries ever since learning about the pantry from a friend.</p><p style="text-align: start">“A friend of mine knew one of the volunteers, and so they started coming to get food. I then started coming with this friend to get groceries. And I’ve been coming ever since.”</p><p style="text-align: start">“The service here is excellent,” James said. “ The people are really, really nice. And the pantry gives me more food than I know what to do with. It’s also handy because it’s not very far from my house.”</p><p style="text-align: start">“My only complaint is that I have to carry my groceries uphill to get home,” he joked, pointing up Juneau Avenue.</p><p style="text-align: start">Leaving with a full load of groceries, we hope James enjoys the food and comes back again soon!</p>',
	},
	{
		name: {
			first: "Gary",
		},
		description:
			'<p>On a busy Saturday morning with fifteen to twenty guests waiting in line to be served, we chatted with Gary, a returning guest of the pantry.</p><p style="text-align: start">“I heard about the pantry from a friend,” Gary said, when asked how he first learned about the pantry. Since discovering the pantry, Gary has come twice to get groceries.</p><p style="text-align: start">“There’s very good service here,” Gary said. “I appreciate the food quality too.”</p><p style="text-align: start">“God bless,” Gary added, in appreciation. Shortly after our interview, Gary’s cart of groceries were ready for pick-up.</p><p style="text-align: start"><span style="color: rgb(112, 112, 112)">Thank you for coming to the pantry, Gary! We’re glad we can be of service to you and our other guests.</span></p>',
	},
	{
		name: {
			first: "Kristie And Steven",
		},
		description:
			'<p>Kristie and Stephen are neighbors who were picking up groceries for their families today. We included vegetarian options in their order for those in their households that don’t eat meat. Big thanks to them and our other guests for brightening our day on this rainy, spring morning!</p><p style="text-align: start">Want to help provide fresh, healthy food to guests like Kristie and Stephen? Support the pantry with a donation today: <a target="_blank" rel="noopener noreferrer nofollow" href="https://gofund.me/f827bfe0">https://gofund.me/f827bfe0</a></p>',
	},
	{
		name: {
			first: "Isaac",
		},
		description:
			'<p>Meet regular pantry guest Isaac Snell! Isaac first learned about the pantry after meeting Interchange Food Pantry Director George. He has become a regular guest ever since. “I come and get food for me and my daughter, and then give anything that’s left over to the people in my apartment building who’ve got kids,” he said.</p><p style="text-align: start">“The pantry helps people in need of food, helping as much as they can,” Isaac said.</p><p style="text-align: start">When asked about what the pantry means to him, Isaac responded, “The pantry is helping feed America, and taking care of kids. This right here is what it’s all about.”</p><p style="text-align: start">Want to help provide fresh, healthy food to guests like Isaac? Support the pantry with a donation today: <a target="_blank" rel="noopener noreferrer nofollow" href="https://gofund.me/f827bfe0">https://gofund.me/f827bfe0</a></p>',
	},
];

export const seedPatrons = async () => {
	let savedPatrons = [];
	for (let i = 0; i < patrons.length; i++) {
		const _patron = patrons[i];
		let newPatron = new Patron(_patron);
		let savedPatron = await newPatron.save();
		console.log(`Seeded ${_patron.name.first}, but not in a weird way`);
		savedPatrons.push(savedPatron);
	}
	return savedPatrons;
};
