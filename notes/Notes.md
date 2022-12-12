# Notes

## Access
Databases are associated with _MongoDB_ and Google's _Firestore_. Both are associated with the email below.

> **Email**: InterchangeFP@gmail.com  
> **Password**: 130.E.Juneau.Ave

Changing the password for this account will automatically change the password in Firebase (Google's database framework which Firestore is a part of). The password in MongoDB can then be updated, but if you want this project to replace your current site and remain active it would be best if you create a _'serverless'_ instance first.  
Currently this is set up running a regular, 'shared' database which is usually only for demo purposes. Taking this same type of database to a production level is usually pretty costly, but a 'serverless' instance on MongoDB would require just a few minutes of work on my end and can run endlessly for just about nothing. These databases are provisioned on a scale of apps like Amazon and Xbox Live, so the scale required for a site of this scale would likely be rounded down to $0. You can see the details [here](https://www.mongodb.com/pricing)[^1]

## Models, requirements and what-not:

### Schedule:
- The only thing that's required is a closing time for all days with an opening time. Day's without any hours can be left empty.
- The schedule is maintained as a model consisting of all seven days, so if a change is made to Tuesday alone, and Monday is not a part of the new model Monday's schedule will be lost. 
- The most recent schedule is what will be displayed. Currently all of the other models will be maintained in the database, because I wasn't sure if you'd want to approach this another way, but as they're essentially pointless after the updated weekly schedule is posted I can handle deleting those automatically in the future.

### Patrons and Volunteers:
- I included these models to allow you to post similar stories to the "Volunteer Spotlight" sections on your current website. Both models are almost identical apart from a phone number field for volunteers, and apart from a name and a 'description' or some sort of story content can be left off. Their phone number and email are only for you and won't be visible to anyone without access to your admin page.
- Currently each person is limited to onen photo, but I can change this to allow for a slide-show sort of component on these pages if you'd like.
- Dates are collected for these automatically, and they will be sorted by default by this date. Although this date is created automatically, it can be edited in the admin page once the model is created.
 
[1]: https://www.mongodb.com/pricing