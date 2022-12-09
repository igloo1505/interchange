# Notes

## Models, requirements and what-not:

### Schedule:
- The only thing that's required is a closing time for all days with an opening time. Day's without any hours can be left empty.
- The schedule is maintained as a model consisting of all seven days, so if a change is made to Tuesday alone, and Monday is not a part of the new model Monday's schedule will be lost. 
- The most recent schedule is what will be displayed. Currently all of the other models will be maintained in the database, because I wasn't sure if you'd want to approach this another way, but as they're essentially pointless after the updated weekly schedule is posted I can handle deleting those automatically in the future.

### Patrons and Volunteers:
- I included these models to allow you to post similar stories to the "Volunteer Spotlight" sections on your current website. Both models are almost identical apart from a phone number field for volunteers, and apart from a name and a 'description' or some sort of story content can be left off. Their phone number and email are only for you and won't be visible to anyone without access to your admin page.
- Currently each person is limited to onen photo, but I can change this to allow for a slide-show sort of component on these pages if you'd like.
- Dates are collected for these automatically, and they will be sorted by default by this date. Although this date is created automatically, it can be edited in the admin page once the model is created.

 
