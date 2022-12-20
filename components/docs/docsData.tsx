import Link from "next/link";
const subSectionContentContainer = "subsection-content-container";
const sectionContentContainer = "section-content-container";

const PriceContainer = ({ value }: { value: number | string }) => {
	return (
		<div className="flex ml-6 flex-row text-lg gap-1 bg-primary-800 w-fit px-2 py-1 rounded-lg">
			<div className="text-white font-bold indent-0">Price:</div>
			<div className="text-primary-100 indent-0">{value}</div>
		</div>
	);
};

const ReadMore = ({
	values,
}: {
	values: { label: string; href: string }[];
}) => {
	return (
		<div className="ml-6 flex flex-col justify-start items-start">
			<div className="text-lg font-bold text-primary-800">Links:</div>
			<div className="flex ml-4 flex-row gap-1">
				{values.map((v) => {
					return (
						<a
							href={v.href}
							className="indent-0 text-white bg-violet-500 w-fit border border-transparent px-2 py-1 rounded-lg hover:bg-violet-200 hover:border-violet-500 transition-all duration-300"
							style={{
								textDecoration: "none",
							}}
						>
							{v.label}
						</a>
					);
				})}
			</div>
		</div>
	);
};

const handleScrollTo = (id: string) => {
	if (typeof window === "undefined") {
		return;
	}
	let em = document.getElementById(id);
	if (!em) return;
	em.scrollIntoView();
};

export interface subSection {
	title: string;
	id: string;
	content?: string | string[] | JSX.Element | JSX.Element[];
	subSections?: subSection[];
}
export interface section {
	title: string;
	id: string;
	subSections?: subSection[];
	content?: string | string[] | JSX.Element | JSX.Element[];
}

export const sections: section[] = [
	{
		title: "Login And Security",
		id: "loginAndSecurity",
		subSections: [
			{
				title: "Authenticating yourself",
				id: "authenticatingYourself",
				content: (
					<div className={sectionContentContainer}>
						When I send this over to you at Interchange I will include a Google
						based email account. While that account has a name that implies some
						association with the Interchange Food Pantry, none of this will be
						able to be found publicly unless you decide that you want to use
						this app. Right now the email is associated with the storage
						accounts I've listed below, all of which are in either{" "}
						<span className="italic">testing</span> or free accounts and apart
						from the name association aren't linked to your organization in any
						official way that would make them discoverable. If you choose to not
						use this app, some of the accounts will automatically expire due to
						lack of use and the others will just sit in limbo, and none of them
						will be discoverable by any search engines.
						<div className="my-1 indent-3">
							Authentication for the{" "}
							<Link href="/admin" className="text-primary-800 font-bold">
								Admin
							</Link>{" "}
							half of this app is controlled through the same email associated
							with the databases accounts and the analytics account listed
							below. While I originally tried to associate the two directly,
							Google set's unreasonable requirements for a project of this scale
							and the time frame for a project I wasn't sure would even be used
							seemed prohibitive, so for right now the password here is not
							directly associated with your google email. You can however change
							your password to the admin portion of this app from within the
							admin portion of the app, at which point even I couldn't access
							that portion of the app without your password.
						</div>
					</div>
				),
			},
			{
				title: "Granting access to others",
				id: "authenticatingOthers",
				content: (
					<div className={subSectionContentContainer}>
						While the email I will send to you has ownership of everything
						related to this app, both directly and through third-party
						databases, you can also grant other employees or volunteers the
						ability to edit things within this application without granting them
						access to more personal and critical accounts.
						<div className="my-1 indent-3">
							The only way for another person to access the admin portion of
							this app is through an email and password, and only if that email
							is allowed by you in the admin portion of this app.
						</div>
					</div>
				),
			},
			{
				title: "Databases & Other Related Logins",
				id: "otherRelatedLogins",
				content: (
					<div className={subSectionContentContainer}>
						<span>
							Right now their are a few associated accounts linked to this
							project:
						</span>
						<ul>
							<li>MongoDB - Document Database</li>
							<li>Google Cloud Storage - Blob (file) Database</li>
							<li>
								Google Analytics - Provides a picture of how the app is being
								used
							</li>
						</ul>
						<div className="text-primary-700 text-lg mt-2">MongoDB</div>
						<PriceContainer value="free, with an asterisk" />
						<ReadMore
							values={[
								{
									label: "Pricing Model ~ Free is likely good enough",
									href: "https://www.mongodb.com/pricing?utm_content=rlsapostreg&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_retarget-brand-postreg_gic-null_amers-us-ca_ps-all_desktop_eng_lead&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14383025495&adgroup=129270225274&gclid=CjwKCAiAy_CcBhBeEiwAcoMRHNMMgK5yZyey9ESax7tHzinKOE3VqDXfoW4jEdxhZjlGuYvtB2ZJYRoC9pEQAvD_BwE",
								},
							]}
						/>
						<div className={subSectionContentContainer}>
							<span className="text-primary-600">MongoDB</span> is a really
							cheap & affordable <span className="italic">document</span> based
							database. This is what I used to store all of the data apart from
							actual files. The schedule, volunteers, 'patrons' or guests,
							contact submissions, and both 'Featured' posts and 'General' posts
							are all stored in MongoDB while the accompanying images are stored
							in <span className="text-primary-600">Google Cloud Storage.</span>
							<div className="my-1 indent-3">
								This app can run entirely for free, including hosting it using
								my account on a really modern, performant platform{" "}
								<span className="italic text-cyan-600">potentially</span> apart
								from MongoDB. Right now MongoDB is running on a free-tier, which
								will supply more than enough storage for an App of this scale,
								however the drawback to this is that if the app is not used
								often enough the database will be frozen automatically. Because
								the entire user-facing portion of this app uses this database on
								every nearly every page load, this isn't likely to happen but if
								it did data would randomly go missing until I got back into
								Mongo to reactivate it.
							</div>
							<div className="my-1 indent-3">
								If you decide that you do want to use this app, it's up to you
								whether or not you want to stay on this free tier of MongoDB. I
								can very easily switch this to working with a 'serverless'
								instance of MongoDB where the account would only be charged for
								the resources used. These databases are portioned on a scale
								comparable to apps like Amazon and Netflix, so for an app of
								this scale that would likely be less than a few dollars per
								month. My advice would be to just wait until it freezes, and
								I'll keep my eye on it as well to make sure it doesn't. An app
								of this scale is kind of in the sweet spot where it will get
								used enough to likely not freeze, but not so much that it will
								outgrow the free tier. This is really easy to change in the
								future if you need me to. For now, this account is associated
								with my own account but I can easily change things over to an
								account associated with your email if you'd like. I wanted to
								see if you're even interested in using this app at all, and how
								you'd like MongoDB to be set up before I deviated from how I
								usually build projects of this scale.
							</div>
						</div>
						<div className="text-primary-700 text-lg mt-2">
							Firebase & Google Cloud Storage
						</div>
						<PriceContainer value="free" />
						<ReadMore
							values={[
								{
									label: "Database Portal",
									href: "https://console.firebase.google.com/u/2/project/interchange-4d029/overview",
								},
							]}
						/>
						<div className={subSectionContentContainer}>
							This account is really the only thing that I would be weary about
							changing. While all of the actual 'data'... words, the schedule,
							posts, and to a certain extent the styles are stored in MongoDB,
							the images are all stored here in Google Cloud Storage. Be very
							careful change images directly in the database though. The admin
							portion of the app will (hopefully) handle everything as it needs
							to be handled in order for MongoDB and Google to remain synced up,
							but when the app loads a page it requests the information from
							Mongo which then points it to a location inside of Google's Cloud
							Storage. Changing something directly inside of Google could result
							in Mongo telling the user's phone or computer to try and load
							something that isn't in the same location anymore and all sorts of
							chaos might ensue... or the image just won't render, probably just
							the latter. This account is associated with the primary email I
							will send when I send over this app, and access to the admin panel
							of this app won't automatically grant access directly to Google's
							database directly, but the admin portion of this page is
							essentially a bridge equally divided between Mongo and Google. If
							you do want to use this app, you should definitely bookmark the
							link at the beginning of this section.
						</div>

						<div className="text-primary-700 text-lg mt-2">
							Google Analytics
						</div>
						<PriceContainer value="free" />
						<ReadMore
							values={[
								{
									label: "Analytics Dashboard",
									href: "https://analytics.google.com/analytics/web/?authuser=2&hl=en#/p346066721/reports/dashboard?r=firebase-overview",
								},
							]}
						/>
						<div className={subSectionContentContainer}>
							As is the case with Google's Cloud Storage, this account is also
							associated with the primary email that I will send when sending
							over this app. Analytics tags are really how Google makes their
							money, so it's free no matter how much we use it. Google provides
							nearly everything for free... Google Cloud Storage with a really
							robust free tier, Gmail, Chrome, and this Analytics platform all
							because if they can convince enough people to embed these tags in
							their websites and mobile apps they can make the money back
							ten-fold by selling targeted ad space. Right now this is set up to
							track individual page views, contact submissions, and resources
							that are clicked. I know this isn't likely a large concern for a
							non-profit, but it's really simple to set up and costs nothing.
						</div>
					</div>
				),
			},
			{
				title: "Vercel",
				id: "vercel",
				content: (
					<div className={subSectionContentContainer}>
						<PriceContainer value="Free" />
						Before I wound up homeless I was a fairly successful, although often
						quite mediocre React and Node.js developer. Without boring you with
						too much of the technical details, React is a framework built by
						Facebook and later the NY Times to break websites into much smaller
						pieces. This makes websites not only more performant, but also more
						efficient and in many cases reusable. Next.js is a framework
						developed by this company, Vercel as a way to promote their hosting
						platform. The framework is built to run inside of Node.js, and
						allows me as a developer to dictate how and where portions of the
						app are rendered. This allows me to increase performance
						dramatically while making way for more 'native-ish' features like
						push notifications and geo-location. This app can actually be
						installed to a user's home screen using Safari on an Apple device or
						Chrome on an Android device, but more importantly this cache's
						images so the load on the server will be significantly reduced.
						<div className="my-1 indent-3">
							'Hosting' for a service of this scale will be 100% free, and will
							perform significantly better than Wordpress while working with a
							code-based framework like React as opposed to a 'low-code'
							platform like wordpress will allow me to change and create
							anything you'd like this app to be.
						</div>
					</div>
				),
			},
		],
	},
	{
		title: "Admin",
		id: "admin",
		subSections: [
			{
				title: "Volunteer",
				id: "volunteer",
				content: (
					<div className={subSectionContentContainer}>
						This model is nearly identical to the 'patron' model listed below. I
						did my best to create a data model that would allow you to edit
						everything you can with your current setup on Wordpress, while maybe
						leaving room for some additional content that I can style to
						demonstrate just how big of a difference Interchange makes for
						people in our situation.
						<div className="my-1 indent-3">
							The fields currently being used to populate publicly viewable data
							are:
							<ul>
								<li>First Name</li>
								<li>Last Name</li>
								<li>Description</li>
								<li>Images</li>
								<li>Primary Image</li>
							</ul>
							While the fields not being displayed publicly are:
							<ul>
								<li>Phone</li>
								<li>Regular Job</li>
								<li>Date Posted, although this affects the order returned</li>
								<li>Email</li>
								<li>Meaningful Quote</li>
							</ul>
						</div>
						<div className="my-1 indent-3">
							I added the email and phone number fields for your own records if
							you choose to keep them here, while the 'quote' field could be
							used to demonstrate just how impactful Interchange is. The only
							fields required to make a model functional are a first name and a
							description. The 'date-posted' is required and will affect the
							sort order, but is populated automatically. You can however change
							it after the model is created if you want to manually move a post
							either forward or backward in the sort order.
						</div>
					</div>
				),
			},
			{
				title: "Patron / Guest",
				id: "patron",
				content: (
					<div className={subSectionContentContainer}>
						This model is fundamentally the same as the Volunteer model. They
						get sorted separately and displayed in either a 'Volunteer
						Spotlight' post or a 'Guest Spotlight' post accordingly, but the
						fields and the required fields are nearly identical.
					</div>
				),
			},
			{
				title: "Contact Submissions",
				id: "contactSubmissions",
				content: (
					<div className={subSectionContentContainer}>
						This field is what is populated by the 'Contact' form on the user
						facing portion of the app. It collects the same data you are
						currently grabbing from your contact form, and for obvious reason's
						there's no 'Create' or 'Edit' option apart from marking a contact as
						read or unread.
					</div>
				),
			},
			{
				title: "Schedules",
				id: "schedules",
				content: (
					<div className={subSectionContentContainer}>
						This model is what populates the 'hours' portion of the user facing
						part of this app. While you can technically add more than one model,
						the most recent model is what will always be used to populate the
						UI. There's no need to fill out days that you aren't open, just
						leaving them blank will accomplish the same thing.
					</div>
				),
			},
			{
				title: "Featured Events",
				id: "featuredEvents",
				content: (
					<div className={subSectionContentContainer}>
						These are the posts that populate the main slider on the landing
						page. They aren't fundamentally different from the 'general post'
						described below apart from where they are displayed, but these will
						be highlighted on the landing page in that primary slider and won't
						be hidden by user's search filters.
						<div className="my-1 indent-3">
							{" "}
							The fields used in this model are:
							<ul>
								<li>Title</li>
								<li>Location (as any string)</li>
								<li>Description</li>
								<li>Url</li>
								<li>Images</li>
								<li>Primary Image</li>
								<li>Auto Expire</li>
							</ul>
							<div className="my-1 indent-3">
								The Title, Description, and at least one image are required for
								the model to function, but the URL, location, and an auto-expire
								date are optional. The URL will wrap the title in a link if it
								is supplied, and the auto-expire date will automatically delete
								the model from the database on a certain date.
							</div>
						</div>
					</div>
				),
			},
			{
				title: "General Post",
				id: "generalPost",
				content: (
					<div className={subSectionContentContainer}>
						This is essentially the same as a 'Featured Post', apart from where
						it is displayed. This will appear in the main feed as opposed to the
						slider on the top of the landing page, but both will link to very
						similar primary pages.
					</div>
				),
			},
			{
				title: "Permissions Granted",
				id: "permissionsGranted",
				content: (
					<div className={subSectionContentContainer}>
						Here you can create a list of emails to grant access to the admin
						portion of this app. Unless you prefer another method, all
						authentication is handled by Google so the emails will either need
						to be associated with a gmail or a Google Work account. Nothing you
						do within this app will affect their Google account in anyway, and
						they won't have access to your google account but they can make
						changes to the admin portion of this app.
					</div>
				),
			},
		],
	},
	{
		title: "Summary",
		id: "summary",
		content: (
			<div className={sectionContentContainer}>
				I quit my job almost a year ago now to focus on something that could be
				more beneficial to society than building endless e-commerce platforms
				selling things that people don't actually need. Since I began looking
				for work again these past 4-6 weeks, I've only been able to scrounge up
				a couple of tiny freelance projects, and building demo after demo that
				will never be seen by anyone apart from recruiters gets old in a hurry.
				Just before I wound up in my current situation I was in a really dark
				place mentally, and it wouldn't have taken many hungry nights for me to
				decide this wasn't worth it. Not only does Interchange help with the
				obvious needs of people in similar situations to my own, the people
				there are some of the nicest I've ever met. I know a more modern web
				presence isn't likely high on your list of priorities, but Interchange
				and the people there have such a huge impact on the community I wanted
				to help in whatever way I can, and I'm not good at a whole lot.
				<div className="my-1 indent-3">
					Poke around in the app and decide whether or not you'd like to use it.
					Like I said, it's built directly from code so everything is changeable
					down to the pixel. If you decide you don't want to use it, just ignore
					this and it will sit around unused and completely undiscoverable by
					anyone without the link I will send. If you do like it, just let me
					know what changes you'd like to make and I can adjust things
					accordingly... It's not like I have a whole lot else going on right
					now. To make is official and replace your current site I would just
					need to know some information regarding your DNS (The place where you
					bought interchangefoodpantry.org), and the service you use to collect
					donations online. I can create a demo Stripe account which won't
					require any real financial details to get things working before I hand
					that over to you as well, or I can use a different service if you're
					already invested somewhere else.
				</div>
				<div className="my-4 mx-4 font-bold text-primary-800">
					There's no button for the admin page. 'Security through obscurity...',
					so you'll have to just add the '/admin' to the end of the route. This
					will work the same now and if it moves to your permanent site.
					<div className="flex flex-col justify-start items-start my-3">
						<div className="flex flex-row gap-1">
							Home:
							<a href="https://interchange.vercel.app/">
								https://interchange.vercel.app
							</a>
						</div>
						<div className="flex flex-row gap-1">
							Admin:
							<a href="https://interchange.vercel.app/admin">
								https://interchange.vercel.app/admin
							</a>
						</div>
						<div className="flex flex-row gap-1">
							Firebase:
							<a href="https://console.firebase.google.com/u/2/project/interchange-4d029/overview">
								https://console.firebase.google.com/u/2/project/interchange-4d029/overview
							</a>
						</div>
					</div>
				</div>
			</div>
		),
	},
];
