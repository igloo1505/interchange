# Interchange

## Features
- [ ] custom CMS
- [ ] Create *easily* removable stripe donation portal. _Not sure if they will want this, so make sure it's easy to remove_
- [ ] Make sure **all** features of main site are maintained


### UI
- [ ] _condtionally_ display special events
- [ ] sort volunteers by date added
- [ ] sort patrons by date added



## CMS Features

- [x] Add & Remove volunteers
  - [x] Update volunteers
- [x] Add & Remove patrons
  - [x] Update patrons
- [x] Contact submission form
- [x] View and manage contact submissions in React-admin
- [ ] Fix map pop-up in both locations. Current modal is random, and maybe unneeded.
- [ ] Edit text on main page
- [ ] Edit image(s) on main page
- [x] Edit hours
- [ ] Create Special events
  - [ ] Time automated special events
- [ ] 'Featured' events that display in banner on main page
  - [ ] Featured events editable.
- [ ] 'Admin' user's with access to admin panel.
    - [ ] Make one model inable of being deleted.

### V2 - Demo only for now.
  - [ ] Donation tracker, at least with those obtained through website, if payment portal is something that they like.




## Dates and To-dos:
### 12-03-22
- Started today around 1pm. Took a while to get comfortable with React-Admin but now things are going smoothly.
#### Resume by:
1. Check to make sure date is editable in all models. Change section in notes appropriately.
1. Fix issue with all volunteers returning same id as displayed in show component.
1. Change other async loops to use for in instead of map. I just got lucky with it until now.
1. Image Feature for Volunteer.
2. Update routes working for volunteer.
3. Image key added to volunteer and all related routes
    - Remove image on model delete
    - Remove old image on update
4. Essentially copy over everything to patron model, with only minor differences, then begin UI.
